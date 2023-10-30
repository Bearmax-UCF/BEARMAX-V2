import mongoose from "mongoose";

/*
Correct/Wrong Index Correlations:
0: Happy
1: Sad
2: Angry
3: Neutral
*/

const EmotionRecognition = new mongoose.Schema(
	{
		Correct: Array,
		Wrong: Array,
		GameFin: Date,
		UserID: String,
		NumPlays: Number,
	},
	{
		collection: "EmotionRecognition",
	}
);

const model = mongoose.model("EmotionRecognition", EmotionRecognition);

export default model;
