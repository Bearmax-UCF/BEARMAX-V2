/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../AuthContext";
import { buildPath } from "../BuildPath";

import Switch from "react-switch";
import { getFormattedDate } from "../../Utils/dates";

export const NotesLayout = () => {
	const [activeNote, setActiveNote] = useState(null);
	const [allNotes, setAllNotes] = useState([]);
	const [saveStatus, setSaveStatus] = useState("Unsaved");
	const [showDates, setShowDates] = useState(false);

	const { user } = useContext(AuthContext);

	const getAllNotes = async () => {
		try {
			const res = await fetch(buildPath("/api/note/"), {
				method: "GET",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: "Bearer " + user.token,
				},
			});
			if (res.status === 200) {
				let notes = await res.json();
				notes = notes.map((note) => ({
					...note,
					date: new Date(note.date),
				}));
				notes.sort((a, b) => {
					return b.date.getTime() - a.date.getTime();
				});

				setAllNotes(notes);
				return notes;
			}
		} catch (err) {
			console.error(err);
		}
		return [];
	};

	const createNote = async () => {
		if (activeNote) await saveNote();

		try {
			const res = await fetch(buildPath("/api/note/"), {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: "Bearer " + user.token,
				},
				body: JSON.stringify({
					title: "Untitled Note",
					date: new Date(),
					note: "",
					userID: user.id,
				}),
			});

			if (res.status === 200) {
				const data = await res.json();
				const retNotes = await getAllNotes();
				retNotes.forEach((note) => {
					if (note._id === data.newNote._id) setActiveNote(note);
				});
			}
		} catch (err) {
			console.error(err);
		}
	};

	const saveNote = async () => {
		try {
			const res = await fetch(buildPath(`/api/note/${activeNote._id}`), {
				method: "PATCH",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: "Bearer " + user.token,
				},
				body: JSON.stringify(activeNote),
			});
			if (res.status === 200) updateActiveNoteInDrawer();
		} catch (err) {
			console.error(err);
		}
	};

	const deleteNote = async () => {
		try {
			const res = await fetch(buildPath(`/api/note/${activeNote._id}`), {
				method: "DELETE",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: "Bearer " + user.token,
				},
			});
			if (res.status === 200) {
				const notes = await getAllNotes();
				setActiveNote(notes[0]);
			}
		} catch (err) {
			console.error(err);
		}
	};

	// Update changes made to active note to the drawer
	const updateActiveNoteInDrawer = () => {
		for (let i = 0; i < allNotes.length; i++) {
			let currentNote = allNotes[i];
			if (currentNote._id === activeNote._id) {
				allNotes[i] = activeNote;
				break;
			}
		}
		setAllNotes([...allNotes]);
	};

	// Saves the active note and swaps another to active
	const changeToNote = async (newNote) => {
		let notes = allNotes;
		if (activeNote && saveStatus !== "Saved!") {
			await saveNote();
			notes = await getAllNotes();
		}
		notes.forEach((note) => {
			if (note._id === newNote._id) setActiveNote(note);
		});
	};

	// If we're refreshed notes from the server, update active note to use server version with any changes pulled
	const updateActiveNote = (providedNotes) => {
		const from = providedNotes ?? allNotes;
		if (!activeNote) {
			setActiveNote(from[0]);
		} else {
			from.forEach((note) => {
				if (note._id === activeNote._id) setActiveNote(note);
			});
		}
	};

    // Grab all notes and select first at page load
	useEffect(() => {
		getAllNotes().then((notes) => updateActiveNote(notes));
	}, []);

    // Save active note after no changes have been made in X seconds
	useEffect(() => {
		if (!activeNote) {
			setSaveStatus("No selection");
			return;
		}

		setSaveStatus("Saving...");
		const updater = setTimeout(async () => {
			await saveNote();
			setSaveStatus("Saved!");
		}, 1000);
		return () => clearTimeout(updater);
	}, [activeNote]);

	return (
		<div id="notesContainer">
			<div id="notesDrawer">
				<h3 id="drawerHeader">Your Notes</h3>
				<div id="drawerContainer">
					{allNotes.map((note) => {
						return (
							<button
								className="noteRow"
								onClick={() => changeToNote(note)}
								key={note._id}
							>
								<p
									className={`noteRowTitle ${
										activeNote._id === note._id
											? "activeNoteRowTitle"
											: ""
									}`}
									placeholder="Note Title"
								>
									{showDates
										? getFormattedDate(note.date)
										: note.title ?? "Untitled Note"}
								</p>
							</button>
						);
					})}
				</div>
				<div id="dateSwitchContainer">
					<Switch
						onChange={(checked) => setShowDates(checked)}
						checked={showDates}
						onColor="#56b19c"
						offColor="#de5c4b"
					/>
					<p id="dateSwitchLabel">Show Dates</p>
				</div>
			</div>
			<div id="activeNoteContainer">
				{activeNote ? (
					<>
						<input
							id="noteTitle"
							onChange={(e) =>
								setActiveNote({
									...activeNote,
									title: e.target.value,
								})
							}
							value={activeNote ? activeNote.title : ""}
						/>
						<h4 id="noteDate">
							{activeNote && activeNote.date
								? getFormattedDate(activeNote.date)
								: "Date N/A"}
						</h4>
					</>
				) : null}

				<textarea
					id="noteNote"
					onChange={(e) => {
						setActiveNote({
							...activeNote,
							note: e.target.value,
						});
					}}
					disabled={!activeNote}
					value={activeNote ? activeNote.note : ""}
				></textarea>

				<div id="saveContainer">
					<button
						id="createNoteButton"
						className="noteButton"
						onClick={createNote}
					>
						New
					</button>
					<p id="saveStatus">{saveStatus}</p>
					<button
						id="deleteNoteButton"
						className="noteButton"
						onClick={deleteNote}
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};

export default NotesLayout;
