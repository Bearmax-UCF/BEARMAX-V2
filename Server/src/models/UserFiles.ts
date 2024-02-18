import mongoose from "mongoose";
mongoose.set('strictQuery', false);

const UserFiles = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        audioFileList: { type: Array, 
            of: {
                audioName: { type: String },
                audioLink: { type: String }
            }
        },
        videoFileList: { type: Array, 
            of: {
                videoName: { type: String },
                videoLink: { type: String }
            } 
        },
    },
    {
        collection: "UserFiles"
    }
);

const model = mongoose.model("UserFiles", UserFiles);

export default model;