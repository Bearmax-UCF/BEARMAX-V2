import { BlockBlobClient, StorageSharedKeyCredential, BlobServiceClient } from "@azure/storage-blob";
import { Router } from "express";
import User from "../../models/User";
import constants from "../../utils/constants";
import requireJwtAuth from "../../middleware/requireJwtAuth";


const router = Router();

const cutStringQuote = (rawConnectionString: string) => {
    return (rawConnectionString.charAt(0) === '"' && rawConnectionString.charAt(rawConnectionString.length - 1)) ? 
    rawConnectionString.substring(1, rawConnectionString.length - 1) : 
    rawConnectionString;
}

const connectionString = cutStringQuote(constants.azure_connection_string);

router.post("/:id", requireJwtAuth, async (req, res, next) => {
    // check if userid is valid
    const userId = req.params.id;
    if (!userId) {
        return res.status(400).send({ message: "User id is not present" });
    }
    const user = await User.findById(userId);
    if (!user) {
        return res.status(400).send({ message: "User not found" });
    }

    // create container name based on the user
    const blobContainerName = userId;
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

    const containerClient = blobServiceClient.getContainerClient(blobContainerName);
    const response = await containerClient.create();
    
    if(response.errorCode) {
        return res.status(400).send({ message: "Error creating container" });
    } else {
        return res.status(201).send({ message: "Container created successfully" });
    }

});


router.delete("/:id", requireJwtAuth, async (req, res, next) => {
    // check if userid is valid
    const userId = req.params.id;
    if (!userId) {
        return res.status(400).send({ message: "User id is not present" });
    }
    const user = await User.findById(userId);
    if (!user) {
        return res.status(400).send({ message: "User not found" });
    }

    // create container name based on the user
    const blobContainerName = userId;
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

    const containerClient = blobServiceClient.getContainerClient(blobContainerName);
    const response = await containerClient.delete();
    
    if(response.errorCode) {
        return res.status(400).send({ message: "Error deleting container" });
    } else {
        return res.status(200).send({ message: "Container deleted successfully" });
    }

});

export const basePath = "/azureContainer";
export default router;