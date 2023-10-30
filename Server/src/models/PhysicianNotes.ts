import mongoose from "mongoose";

const PhysicianNotes = new mongoose.Schema(
	{
		title: { type: String },
		date: { type: Date },
		note: { type: String },
		userID: { type: String },
	},
	{
		collection: "PhysicianNotes",
	}
);

const model = mongoose.model("PhysicianNotes", PhysicianNotes);

export default model;
