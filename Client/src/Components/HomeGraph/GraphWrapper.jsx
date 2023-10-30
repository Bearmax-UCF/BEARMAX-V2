import { useContext, useRef, useState } from "react";
import { GSRGraph } from "./GSRGraph";
import "./Graph.css";
import { getFileName } from "../../Utils/dates";
import { AuthContext } from "../../AuthContext";
import { buildPath } from "../BuildPath";
import { toast } from "react-toastify";

export const GraphWrapper = () => {
	const [recording, setRecording] = useState(false);
	const [saveOptions, setSaveOptions] = useState({ file: true, db: true });

	const { user } = useContext(AuthContext);
	const dataRef = useRef([]);
	const recordingPointRefs = useRef({
		start: null,
		end: null,
	});

	// Save recorded data to a file
	const downloadGSR = () => {
		const element = document.createElement("a");
		let content = dataRef.current.reduce((prev, curr) => {
			return prev + `${curr.ts},${curr.value}\n`;
		}, "timestamp,value,\n");

		const file = new Blob([content], {
			type: "text/plain",
		});
		element.href = URL.createObjectURL(file);
		element.download = "gsr_" + getFileName(new Date()) + ".csv";
		document.body.appendChild(element); // Required for this to work in FireFox
		element.click();
		element.remove();
	};

	const saveData = () => {
		// Cleanup socket and save data
		if (saveOptions.db) {
			const data = dataRef.current;
			const bodyData = { GSRData: [], GSRTime: [] };
			for (let dataPoint of data) {
				bodyData.GSRData.push(dataPoint.value);
				bodyData.GSRTime.push(dataPoint.ts);
			}

			// Save recording to database
			fetch(buildPath("/api/gsr/"), {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: "Bearer " + user.token,
				},
				body: JSON.stringify(bodyData),
			})
				.then((res) => {
					if (res.status === 200)
						toast.success("Saved to database successfully!");
					else toast.error("Could not save to database!");
				})
				.catch((err) => {
					toast.error("An error occurred while saving recording.", {
						autoClose: 5000,
					});
					console.error(err);
				});
		}

		if (saveOptions.file) downloadGSR();
	};

	return (
		<div id="graphContainer">
			<h3 id="graphTitle">Galvanic Skin Response</h3>
			<div className="graph">
				<GSRGraph
					recording={recording}
					recordingPointRefs={recordingPointRefs}
					dataRef={dataRef}
				/>

				<div id="gsrOptionRow">
					<div id="gsrWrapper">
						<button
							id="saveGSRButton"
							className="dashButton"
							onClick={saveData}
						>
							Save Recording
						</button>
						<div id="gsrCheckContainer">
							<div className="gsrCheck">
								<input
									className="gsrOptionCheck"
									type="checkbox"
									checked={saveOptions.file}
									onChange={() =>
										setSaveOptions({
											...saveOptions,
											file: !saveOptions.file,
										})
									}
								/>
								<span
									className="gsrOptionLabel"
									onClick={() =>
										setSaveOptions({
											...saveOptions,
											file: !saveOptions.file,
										})
									}
								>
									Save to CSV
								</span>
							</div>
							<div className="gsrCheck">
								<input
									className="gsrOptionCheck"
									type="checkbox"
									checked={saveOptions.db}
									onChange={() =>
										setSaveOptions({
											...saveOptions,
											db: !saveOptions.db,
										})
									}
								/>
								<span
									className="gsrOptionLabel"
									onClick={() =>
										setSaveOptions({
											...saveOptions,
											db: !saveOptions.db,
										})
									}
								>
									Save to Database
								</span>
							</div>
						</div>
					</div>
					<button
						id="recordGSRButton"
						className="dashButton"
						onClick={() => {
							if (!recording) {
								recordingPointRefs.current = {
									start: new Date(),
									end: null,
								};
							} else {
								recordingPointRefs.current.end = new Date();
							}
							setRecording(!recording);
						}}
					>
						{recording ? "Stop Recording" : "Start Recording"}
					</button>
				</div>
			</div>
		</div>
	);
};
