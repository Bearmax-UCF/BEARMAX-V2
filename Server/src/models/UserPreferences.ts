import mongoose from "mongoose";
mongoose.set('strictQuery', false);

const UserPreferences = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        boolVideo: { type: Boolean, required: true },
        boolAudio: { type: Boolean, required: true },
        boolTaste: { type: Boolean, required: true },
        boolSmell: { type: Boolean, required: true },
        boolTouch: { type: Boolean, required: true },
    },
    {
        collection: "UserPreferences"
    }
);

const model = mongoose.model("UserPreferences", UserPreferences);

export default model;