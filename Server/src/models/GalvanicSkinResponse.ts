import mongoose from "mongoose";
mongoose.set('strictQuery', false);

const GalvanicSkinResponse = new mongoose.Schema(
	{
		GSRData: { type: Array },
		GSRTime: { type: Array },
		RecordingDate: { type: Date },
		UserID: { type: String },
	},
	{
		collection: "GalvanicSkinResponse",
	}
);

const model = mongoose.model("GalvanicSkinResponse", GalvanicSkinResponse);

export default model;
