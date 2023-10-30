import * as d3 from "d3";
import { useState } from "react";
import { useEffect, useRef } from "react";

import { getFormattedDate, getFormattedTime } from "../../Utils/dates";

export const LINE_KEYS = ["Happy", "Sad", "Angry", "Neutral"];
export const LINE_COLORS = ["#56b19c", "#15125c", "#8400b8", "#4d2000"];

const StatsGraph = ({ data = [], dimensions = {}, showingLines = [] }) => {
	const [lastShowing, setLastShowing] = useState([
		false,
		false,
		false,
		false,
	]);
	const lastClosestDate = useRef(new Date().getTime());
	const svgRef = useRef(null);

	const { width, height, margin = {} } = dimensions;
	const svgWidth = width + margin.left + margin.right;
	const svgHeight = height + margin.top + margin.bottom;

	useEffect(() => {
		const allEmotionData = []; // Data for each emotion specifically
		const allDates = []; // The GameFin for the game at each index in data

		// Parse data into separate arrays for each emotion
		for (
			let emotionIndex = 0;
			emotionIndex < LINE_KEYS.length;
			emotionIndex++
		) {
			const emotionData = [];
			allEmotionData[emotionIndex] = emotionData;
			if (!showingLines[emotionIndex]) continue; // Leave empty if line is not to be drawn

			for (let gameIndex = 0; gameIndex < data.length; gameIndex++) {
				const game = data[gameIndex];
				allDates[gameIndex] = game.GameFin;

				// Push data for this emotion at this game instance
				emotionData.push({
					GameFin: game.GameFin,
					CorrectPercent: game.CorrectPercent[emotionIndex],
					WrongPercent: game.WrongPercent[emotionIndex],
					Correct: game.Correct[emotionIndex],
					Wrong: game.Wrong[emotionIndex],
					Total:
						game.Correct[emotionIndex] + game.Wrong[emotionIndex],
				});
			}
		}

		/* Make the actual graph */

		const xScale = d3
			.scaleTime()
			.nice()
			.domain(d3.extent(allDates))
			.range([0, width]);

		const yScale = d3.scaleLinear().domain([0, 100]).range([height, 0]);

		// Create root container where we will append all other chart elements
		const svgEl = d3.select(svgRef.current);
		svgEl.selectAll("*").remove();
		svgEl
			.style("background", "#ffff")
			.style("overflow", "visible")
			.attr("class", "emotionGameSvgBase");

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
		xAxisGroup.selectAll("line").attr("stroke", "rgba(0, 0, 0, 0.2)");
		xAxisGroup
			.selectAll("text")
			.attr("opacity", 1)
			.attr("color", "black")
			.attr("font-size", "0.75rem");

		// Add Y grid lines with labels
		const yAxis = d3
			.axisLeft(yScale)
			.ticks(10)
			.tickSize(-width)
			.tickFormat((val) => `${val}%`)
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
			.attr("x", width / 2 + 55)
			.attr("y", height + 45)
			.text("Game Date");

		svg.append("text")
			.attr("class", "stats-graph")
			.attr("text-anchor", "start")
			.attr("x", -45)
			.attr("y", -30)
			.text("Percent Correct");

		// Draw the lines
		const line = d3
			.line()
			.x((d) => xScale(d.GameFin))
			.y((d) => yScale(d.CorrectPercent));

		const lines = svg
			.selectAll(".line")
			.data(allEmotionData)
			.enter()
			.append("path")
			.attr("fill", "none")
			.attr("stroke", (_, index) => LINE_COLORS[index])
			.attr("stroke-width", 3)
			.attr("d", (d) => line(d));

		// Animate drawing of lines turned on
		lines.each((_, index, nodes) => {
			const element = nodes[index];
			const length = element.getTotalLength();
			// If line wasn't showing last redraw, animate it
			if (!lastShowing[index] && showingLines[index]) {
				d3.select(element)
					.attr("stroke-dasharray", `${length},${length}`)
					.attr("stroke-dashoffset", length)
					.transition()
					.duration(500)
					.ease(d3.easeLinear)
					.attr("stroke-dashoffset", 0);
			}
		});

		setLastShowing([...showingLines]);

		/* Manage tooltip and mouse events */

		// Invisible overlay to handle mouse events
		const rectOverlay = svg
			.append("rect")
			.attr("cursor", "move")
			.attr("fill", "none")
			.attr("pointer-events", "all")
			.attr("width", width)
			.attr("height", height)
			.on("mousemove", onMouseMove)
			.on("mouseover", onMouseOver)
			.on("mouseout", onMouseOut);

		// Line from top to bottom of graph at highlighted X
		const mouseLine = svg
			.append("path")
			.attr("class", "mouse-line")
			.attr("stroke", "#303030")
			.attr("stroke-width", 2)
			.attr("opacity", "0");

		// Popup tooltip base
		const tooltip = svg
			.append("g")
			.attr("class", "tooltip-wrapper")
			.attr("display", "none")
			.attr("pointer-events", "none");

		const tooltipBackground = tooltip
			.append("rect")
			.attr("fill", "#e8e8e8");
		const tooltipText = tooltip.append("text");

		// Redraw inspect elements when we move the mouse on the graph
		function onMouseMove(event) {
			if (data.length === 0) return;

			tooltip.attr("display", null);
			const mouse = d3.pointer(event);
			// Get the date of the x coordinate of the mouse
			const dateOnMouse = xScale.invert(mouse[0]);
			// Figure out where it would fit into array of game dates
			const nearestDateIndex = d3.bisect(allDates, dateOnMouse);

			const d0 = allDates[nearestDateIndex - 1];
			const d1 = allDates[nearestDateIndex];

			// Get closest actual game date to where the mouse is positioned
			let closestDate;
			if (!d0 || d0 < xScale.domain()[0]) {
				closestDate = d1;
			} else if (d1 > xScale.domain()[1]) {
				closestDate = d0;
			} else {
				// decide which date is closest to the mouse
				closestDate = dateOnMouse - d0 > d1 - dateOnMouse ? d1 : d0;
			}

			// Insert the y values for each emotion at every date
			const nearestDateYValues = {};
			for (let i = 0; i < allDates.length; i++) {
				let thisDate = allDates[i];
				const yVals = [];
				nearestDateYValues[thisDate] = yVals;
				for (let j = 0; j < allEmotionData.length; j++)
					yVals.push(
						allEmotionData[j][i]
							? allEmotionData[j][i].CorrectPercent
							: undefined
					);
			}

			// Setup tooltip base
			const nearestDateXCord = xScale(closestDate);
			const closestDateGameIndex = allDates.indexOf(closestDate);

			if (lastClosestDate.current === closestDate.getTime()) return;
			lastClosestDate.current = closestDate.getTime();

			// Draw mouse line
			mouseLine
				.attr("d", `M ${nearestDateXCord} 0 V ${height}`)
				.attr("opacity", "1");

			// Clear last tooltip
			tooltipText.selectAll(".tooltip-text-line").remove();
			svg.selectAll(".tooltip-line-circles").remove();

			// Tooltip header
			tooltipText
				.append("tspan")
				.attr("class", "tooltip-text-line")
				.attr("x", "5")
				.attr("y", "8")
				.attr("dy", "13px")
				.attr("font-weight", "bold")
				.text(`${getFormattedDate(closestDate)}`);

			// Adds space between header and the main content
			tooltipText
				.append("tspan")
				.attr("class", "tooltip-text-line")
				.attr("x", "15")
				.attr("dy", "4px")
				.attr("fill", "#e8e8e8")
				.text("\u00A0");

			for (
				let emotionIndex = 0;
				emotionIndex < LINE_KEYS.length;
				emotionIndex++
			) {
				// Draw a circle at the x coord of each line
				svg.append("circle")
					.attr("class", "tooltip-line-circles")
					.attr("r", 5)
					.attr("fill", LINE_COLORS[emotionIndex])
					.attr("cx", xScale(closestDate))
					.attr(
						"cy",
						yScale(nearestDateYValues[closestDate][emotionIndex])
					);

				// Write a line in the tooltip with stats for this emotion at this date
				const emotionDataForGame =
					allEmotionData[emotionIndex][closestDateGameIndex];
				const amountText = `${emotionDataForGame.CorrectPercent.toFixed(
					2
				)}% (${emotionDataForGame.Correct}/${
					emotionDataForGame.Total
				})`;

				tooltipText
					.append("tspan")
					.attr("class", "tooltip-text-line")
					.attr("x", "5")
					.attr("dy", "20px")
					.attr("fill", LINE_COLORS[emotionIndex])
					.text(`${LINE_KEYS[emotionIndex]}: ${amountText}`);
			}

			// Position tooltip near mouse
			const tooltipWidth = tooltipText.node().getBBox().width;
			const tooltipHeight = tooltipText.node().getBBox().height;
			const rectOverlayWidth = rectOverlay.node().getBBox().width;
			tooltipBackground
				.attr("width", tooltipWidth + 10)
				.attr("height", tooltipHeight + 20);

			// Flip which side of the mouse it appears if it would extend past the svg width
			if (nearestDateXCord + tooltipWidth >= rectOverlayWidth) {
				tooltip.attr(
					"transform",
					"translate(" +
						(nearestDateXCord - tooltipWidth - 20) +
						"," +
						mouse[1] +
						")"
				);
			} else {
				tooltip.attr(
					"transform",
					"translate(" +
						(nearestDateXCord + 10) +
						"," +
						mouse[1] +
						")"
				);
			}
		}

		// Turn tooltip on and off
		function onMouseOver() {
			mouseLine.attr("opacity", "1");
			tooltip.attr("display", null);
		}

		function onMouseOut() {
			mouseLine.attr("opacity", "0");
			tooltip.attr("display", "none");
			svg.selectAll(".tooltip-line-circles").remove();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, dimensions, showingLines]);

	return <svg ref={svgRef} width={svgWidth} height={svgHeight} />;
};

export default StatsGraph;
