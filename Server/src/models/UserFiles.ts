import mongoose from "mongoose";
mongoose.set('strictQuery', false);

const UserFiles = new mongoose.Schema(
    {
        UserID: { type: String, required: true },
        AudioFileLink: { type: String},
        VideoFileLink: { type: String},
    },
    {
        collection: "UserFiles"
    }
);

const model = mongoose.model("UserFiles", UserFiles);

export default model;