import React, { useContext, useState } from "react";
import { AuthContext } from "../../AuthContext";
import { buildPath } from "../../Components/BuildPath";
import { GraphWrapper } from "../../Components/HomeGraph/GraphWrapper";

export const Dashboard = () => {
	const [error, setError] = useState("");
	const [currentNote, setCurrentNote] = useState({
		title: "",
		note: "",
	});

	const { user } = useContext(AuthContext);

	const saveAndClear = async () => {
		try {
			const res = await fetch(buildPath("/api/note/"), {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: "Bearer " + user.token,
				},
				body: JSON.stringify({
					title: currentNote.title
						? currentNote.title
						: "Untitled Note",
					note: currentNote.note ?? "",
					date: new Date(),
					userID: user.id,
				}),
			});

			if (res.status === 200) {
				setCurrentNote({
					title: "",
					note: "",
				});
				return;
			}
		} catch (err) {
			console.error(err);
		}

		setError("Error Saving Note!");
	};

	return (
		<div id="dashContainer">
			<GraphWrapper />

			<div id="dashNoteContainer">
				<input
					id="dashNoteTitle"
					placeholder="Note Title"
					value={currentNote.title}
					onChange={(e) =>
						setCurrentNote({
							...currentNote,
							title: e.target.value,
						})
					}
				/>
				<textarea
					id="dashNoteNote"
					placeholder="Write a note here!"
					value={currentNote.note}
					onChange={(e) =>
						setCurrentNote({
							...currentNote,
							note: e.target.value,
						})
					}
				/>

				<div id="dashNoteFooter">
					<button
						id="dashSaveNoteButton"
						className="dashButton"
						onClick={saveAndClear}
					>
						Save and New Note
					</button>
					{error ? (
						<p id="dashNoteError" class="errorText">
							{error}
						</p>
					) : null}
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
