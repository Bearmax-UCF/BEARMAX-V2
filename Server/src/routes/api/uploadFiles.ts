import { BlockBlobClient, StorageSharedKeyCredential } from "@azure/storage-blob";
import { Router } from "express";
import multer from "multer";
import User from "../../models/User";
import constants from "../../utils/constants";
import requireJwtAuth from "../../middleware/requireJwtAuth";


const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 100000000 }});

const cutStringQuote = (rawConnectionString: string) => {
    return (rawConnectionString.charAt(0) === '"' && rawConnectionString.charAt(rawConnectionString.length - 1)) ? 
    rawConnectionString.substring(1, rawConnectionString.length - 1) : 
    rawConnectionString;
}

const connectionString = cutStringQuote(constants.azure_connection_string);
const blobContainerName = constants.azure_container_name;

router.post("/uploadVideo/:id", requireJwtAuth, upload.single('file'), async (req, res, next) => {
    // empty file check first
    const file = req.file;
    if (!file) {
        return res.status(400).send({ message: "No file has been provided" });
    }
    // check if file is video
    if (file.mimetype !== "video/mp4") {
        return res.status(400).send({ message: "File type must be a video mp4" });
    }
    // check if userid is valid
    const userId = req.params.id;
    if (!userId) {
        return res.status(400).send({ message: "User id is not present" });
    }
    const user = await User.findById(userId);
    if (!user) {
        return res.status(400).send({ message: "User not found" });
    }
    // upload to azure
    const blobName = `${file.originalname}`;

    const blobService = new BlockBlobClient(connectionString, blobContainerName, blobName);
    const response = blobService.uploadData(file.buffer)
    .then((result) => {
        if(result.errorCode) {
            return res.status(400).send({ message: "Error uploading video" });
        } else {
            return res.status(200).send({ message: "Video uploaded successfully" });
        }
    });

    return response;

});

export const basePath = "/uploadFiles";
export default router;