import mongoose from "mongoose";

const UserFiles = new mongoose.Schema(
    {
        UserID: { type: String, required: true },
        AudioFileLink: { type: String},
        VideoFileLink: { type: String},
    }
);

const model = mongoose.model("UserFiles", UserFiles);

export default model;