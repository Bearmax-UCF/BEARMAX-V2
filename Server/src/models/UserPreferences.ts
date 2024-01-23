import mongoose from "mongoose";

const UserPreferences = new mongoose.Schema(
    {
        UserID: { type: String, required: true },
        Video: { type: Boolean, required: true },
        Audio: { type: Boolean, required: true },
    }
);

const model = mongoose.model("UserPreferences", UserPreferences);

export default model;