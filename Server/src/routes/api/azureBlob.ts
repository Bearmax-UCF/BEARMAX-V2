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

router.get("/getBlob/:id", requireJwtAuth, async (req, res, next) => {
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
    const blobName = req.body.blobName;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const response = await blockBlobClient.getProperties();

    if(response.errorCode) {
        return res.status(400).send({ message: "Error getting blob" });
    } else {
        return res.status(200).send({ message: "Blob received successfully", response: response });
    }

});


router.delete("/deleteBlob/:id", requireJwtAuth, async (req, res, next) => {
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
    const blobName = req.body.blobName;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const response = await blockBlobClient.deleteIfExists();

    if(response.errorCode) {
        return res.status(400).send({ message: "Error deleting blob" });
    } else {
        return res.status(200).send({ message: "Blob deleted successfully" });
    }

});


router.get("/listBlobs/:id", requireJwtAuth, async (req, res, next) => {
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
    const blobs = containerClient.listBlobsFlat();
    const blobsList = [];

    for await (const blob of blobs) {
        const blockBlobClient = containerClient.getBlockBlobClient(blob.name);
        const response = await blockBlobClient.getProperties();
        if(response.errorCode) {
            return res.status(400).send({ message: "Error listing blobs" });
        } else {
            blobsList.push(response);
        }
    }

    return res.status(200).send({ message: "Blob received successfully", blobsList: blobsList });

});

export const basePath = "/azureBlob";
export default router;