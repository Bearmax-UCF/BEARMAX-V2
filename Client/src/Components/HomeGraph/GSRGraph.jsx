import { useContext, useEffect, useRef, useMemo } from "react";
import * as d3 from "d3";
import useWindowDimensions from "../WindowDimensions";
import { buildPath } from "../BuildPath";
import { io } from "socket.io-client";
import { AuthContext } from "../../AuthContext";
import { getFormattedTime } from "../../Utils/dates";

export const GSRGraph = ({ recording, recordingPointRefs, dataRef }) => {
	const { windowHeight, windowWidth } = useWindowDimensions();
	const { user } = useContext(AuthContext);

	const svgRef = useRef();
	const allTimesRef = useRef([]); // [Date]
	const maxValRef = useRef(0);
	const lastMouseCoordsRef = useRef(null);

	// Recalculate dimensions when the window is resized so svg can redraw to new size
	// This looks dump and unnecessary, but because we repaint on an interval this is required
	// For the repaint to be able to get the current dimensions if the window has been resized since it started.
	const dimensionsRef = useRef(null);
	dimensionsRef.current = useMemo(
		() => ({
			width: windowWidth * 0.6,
			height: Math.max(300, windowHeight * 0.5),
			margin: {
				top: 60,
				right: 60,
				bottom: 60,
				left: 60,
			},
		}),
		[windowHeight, windowWidth]
	);

	useEffect(() => {
		// If we're NOW recording, start listening for GSR data
		if (recording) {
			const newSocket = io(buildPath("/"), {
				query: {
					userID: user.id,
				},
				extraHeaders: {
					Authorization: "Bearer " + user.token,
				},
			});

			newSocket.on("connect", () => {
				console.log("Successfully connected to the server!");

				// Remove data from previous recording so SVG clears lines
				dataRef.current = [];
				allTimesRef.current = [];
				maxValRef.current = 0;

				newSocket.on("GSR", (value, ts) => {
					const tsMilli = ts / 1000000;
					dataRef.current.push({
						value,
						ts: new Date(tsMilli),
					});
					if (value > maxValRef.current) maxValRef.current = value;
					allTimesRef.current.push(new Date(tsMilli));
				});
			});

			newSocket.on("disconnect", () =>
				console.log("Disconnected from server.")
			);

			const redrawInt = setInterval(redraw, 100);

			return () => {
				newSocket.close();
				clearInterval(redrawInt);
			};
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [recording]);

	const redraw = () => {
		// Get up-to-date data and svg dimensions
		const data = dataRef.current;
		const { width, height, margin } = dimensionsRef.current;

		/* Make the actual graph */

		const xScale = d3
			.scaleTime()
			.nice()
			.domain([
				recordingPointRefs.current.start,
				recordingPointRefs.current.end ?? new Date(),
			])
			.range([0, width]);

		const yScale = d3
			.scaleLinear()
			.domain([0, maxValRef.current + 50])
			.range([height, 0]);

		// Create root container where we will append all other chart elements
		const svgEl = d3.select(svgRef.current);
		svgEl.selectAll("*").remove();
		svgEl
			.style("background", "#ffff")
			.style("overflow", "visible")
			.attr("class", "gsrSvgBase");

		const svg = svgEl
			.append("g")
			.attr("class", "emotionGraphContent")
			.attr("transform", `translate(${margin.left},${margin.top})`);

		// Add X grid lines with labels
		const xAxis = d3
			.axisBottom(xScale)
			.ticks(3)
			.tickSize(-height)
			.tickFormat((date) => getFormattedTime(date))
			.tickPadding(10);
		const xAxisGroup = svg
			.append("g")
			.attr("transform", `translate(0, ${height})`)
			.call(xAxis);
		xAxisGroup.select(".domain").remove();
		xAxisGroup.selectAll("line").attr("stroke", "none");
		xAxisGroup
			.selectAll("text")
			.attr("opacity", 1)
			.attr("color", "black")
			.attr("font-size", "0.75rem");

		// Add Y grid lines with labels
		const yAxis = d3
			.axisLeft(yScale)
			.ticks(4)
			.tickSize(-width)
			.tickFormat((val) => val)
			.tickPadding(10);
		const yAxisGroup = svg.append("g").call(yAxis);
		yAxisGroup.select(".domain").remove();
		yAxisGroup.selectAll("line").attr("stroke", "rgba(0, 0, 0, 0.2)");
		yAxisGroup
			.selectAll("text")
			.attr("opacity", 1)
			.attr("color", "black")
			.attr("font-size", "0.75rem");

		// Add axis labels
		svg.append("text")
			.attr("class", "stats-graph")
			.attr("text-anchor", "end")
			.attr("x", width + 25)
			.attr("y", height + 45)
			.text("Timestamp");

		svg.append("text")
			.attr("class", "stats-graph")
			.attr("text-anchor", "start")
			.attr("x", -45)
			.attr("y", -30)
			.text("GSR Reading");

		// Draw the line
		const line = d3
			.line()
			.x((d) => xScale(d.ts))
			.y((d) => yScale(d.value));

		svg.append("path")
			.datum(data)
			.attr("fill", "none")
			.attr("stroke", "#FF0000")
			.attr("stroke-width", 1.5)
			.attr("d", (d) => line(d));

		/* Manage tooltip and mouse events */

		// Draw invisible overlay to handle mouse events
		const rectOverlay = svg
			.append("rect")
			.attr("cursor", "move")
			.attr("fill", "none")
			.attr("pointer-events", "all")
			.attr("width", width)
			.attr("height", height)
			.on("mousemove", paintInspectElements)
			.on("mouseover", onMouseOver)
			.on("mouseout", onMouseOut);

		// Set up tooltip
		const tooltip = svg
			.append("g")
			.attr("class", "tooltip-wrapper")
			.attr("display", "none")
			.attr("pointer-events", "none");

		const tooltipBackground = tooltip
			.append("rect")
			.attr("fill", "#e8e8e8");
		const tooltipText = tooltip.append("text");

		// If we the mouse is on the page, repaint the tooltip (regardless of whether mousemove triggers)
		if (lastMouseCoordsRef.current) paintInspectElements();

		function paintInspectElements(event) {
			if (data.length === 0) return;
			const allTimes = allTimesRef.current;

			tooltip.attr("display", null);

			// If triggered by mousemove, get mouse coordinates
			// If triggered by standard repaint, use the coords where the mouse was and still is
			let mouseCoords = [];
			if (event) mouseCoords = d3.pointer(event);
			else mouseCoords = lastMouseCoordsRef.current;

			lastMouseCoordsRef.current = mouseCoords;

			const timeOnMouse = xScale.invert(mouseCoords[0]);
			const nearestTimeIndex = d3.bisect(allTimes, timeOnMouse);

			const d0 = allTimes[nearestTimeIndex - 1];
			const d1 = allTimes[nearestTimeIndex];

			// Find the closest actual time with a data point to the mouse
			let closestTime;
			if (!d0 || d0 < xScale.domain()[0]) {
				closestTime = d1;
			} else if (d1 > xScale.domain()[1]) {
				closestTime = d0;
			} else {
				closestTime = timeOnMouse - d0 > d1 - timeOnMouse ? d1 : d0;
			}

			// Get data about the closest data point
			const closestTimeXCoord = xScale(closestTime);
			const closestTimeIndex = allTimes.indexOf(closestTime);
			const closestTimeVal = data[closestTimeIndex].value;

			tooltipText.selectAll(".tooltip-text-line").remove();
			svg.selectAll(".tooltip-line-circles").remove();

			// Draw dot on the line at the data point
			svg.append("circle")
				.attr("class", "tooltip-line-circles")
				.attr("r", 5)
				.attr("fill", "#000000")
				.attr("cx", xScale(closestTime))
				.attr("cy", yScale(closestTimeVal));

			// Create tooltip showing timestamp and value of data point
			tooltipText
				.append("tspan")
				.attr("class", "tooltip-text-line")
				.attr("x", "5")
				.attr("dy", "20px")
				.attr("fill", "#000000")
				.text(`Time Stamp: ${getFormattedTime(closestTime)}`);

			tooltipText
				.append("tspan")
				.attr("class", "tooltip-text-line")
				.attr("x", "5")
				.attr("dy", "20px")
				.attr("fill", "#000000")
				.text(`Value: ${closestTimeVal.toFixed(2)}`);

			// Move tooltip to mouse location
			const tooltipWidth = tooltipText.node().getBBox().width;
			const tooltipHeight = tooltipText.node().getBBox().height;
			const rectOverlayWidth = rectOverlay.node().getBBox().width;
			tooltipBackground
				.attr("width", tooltipWidth + 10)
				.attr("height", tooltipHeight + 10);

			if (closestTimeXCoord + tooltipWidth >= rectOverlayWidth) {
				tooltip.attr(
					"transform",
					"translate(" +
						(closestTimeXCoord - tooltipWidth - 20) +
						"," +
						mouseCoords[1] +
						")"
				);
			} else {
				tooltip.attr(
					"transform",
					"translate(" +
						(closestTimeXCoord + 10) +
						"," +
						mouseCoords[1] +
						")"
				);
			}
		}

		// Enable or disable inspect elements if mouse is on/off the graph
		function onMouseOver() {
			tooltip.attr("display", null);
		}

		function onMouseOut() {
			tooltip.attr("display", "none");
			svg.selectAll(".tooltip-line-circles").remove();
			lastMouseCoordsRef.current = null;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(redraw, [windowHeight, windowWidth]);

	const { width, height, margin } = dimensionsRef.current;
	const svgWidth = width + margin.left + margin.right;
	const svgHeight = height + margin.top + margin.bottom;

	return <svg ref={svgRef} width={svgWidth} height={svgHeight} />;
};
