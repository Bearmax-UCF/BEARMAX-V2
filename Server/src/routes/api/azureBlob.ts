import { BlockBlobClient, StorageSharedKeyCredential, BlobServiceClient, generateBlobSASQueryParameters, BlobSASPermissions } from "@azure/storage-blob";
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
    const userId = req.user!._id;
    if (!userId) {
        return res.status(400).send({ message: "User id is not present" });
    }
    const user = await User.findById(userId);
    if (!user) {
        return res.status(400).send({ message: "User not found" });
    }

    // create container name based on the user
    const blobContainerName = userId.toString();
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

    const containerClient = blobServiceClient.getContainerClient(blobContainerName);

    const boolContainer = await containerClient.exists();
    if(!boolContainer) return res.status(400).send({ message: "Container does not exists." });

    const blobName = req.body.blobName;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    const blobExists = await blockBlobClient.exists();
    if (!blobExists) {
        return res.status(400).send({ message: "Blob not found" });
    }

    const response = await blockBlobClient.getProperties();

    const blobSasUrl = await getBlobSasURL(blobContainerName, blobName, blockBlobClient);

    const blobJSON = {
        blobName: blobName,
        blobUrl: blobSasUrl
    };

    if(response.errorCode) {
        return res.status(400).send({ message: "Error getting blob" });
    } else {
        return res.status(200).send({ message: "Blob received successfully", blob: blobJSON});
    }

});


router.delete("/:id", requireJwtAuth, async (req, res, next) => {
    // check if userid is valid
    const userId = req.user!._id;
    if (!userId) {
        return res.status(400).send({ message: "User id is not present" });
    }
    const user = await User.findById(userId);
    if (!user) {
        return res.status(400).send({ message: "User not found" });
    }

    // create container name based on the user
    const blobContainerName = userId.toString();
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

    const containerClient = blobServiceClient.getContainerClient(blobContainerName);

    const boolContainer = await containerClient.exists();
    if(!boolContainer) return res.status(400).send({ message: "Container does not exists." });

    const blobName = req.body.blobName;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    const blobExists = await blockBlobClient.exists();
    if (!blobExists) {
        return res.status(400).send({ message: "Blob not found" });
    }

    const response = await blockBlobClient.deleteIfExists();

    if(response.errorCode) {
        return res.status(400).send({ message: "Error deleting blob" });
    } else {
        return res.status(200).send({ message: "Blob deleted successfully" });
    }

});


router.get("/listBlobs/:id", requireJwtAuth, async (req, res, next) => {
    // check if userid is valid
    const userId = req.user!._id;
    if (!userId) {
        return res.status(400).send({ message: "User id is not present" });
    }
    const user = await User.findById(userId);
    if (!user) {
        return res.status(400).send({ message: "User not found" });
    }

    // create container name based on the user
    const blobContainerName = userId.toString();
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

    const containerClient = blobServiceClient.getContainerClient(blobContainerName);
    const blobs = containerClient.listBlobsFlat();
    const blobsList = [];

    for await (const blob of blobs) {
        const blockBlobClient = containerClient.getBlockBlobClient(blob.name);
        const blobSasUrl = await getBlobSasURL(blobContainerName, blob.name, blockBlobClient);
        const response = await blockBlobClient.getProperties();

        if(response.errorCode) {
            return res.status(400).send({ message: "Error listing blobs" });
        } else {

            const blobJSON = {
                blobName: blob.name,
                blobUrl: blobSasUrl
            };

            blobsList.push(blobJSON);
        }
    }

    return res.status(200).send({ message: "Blobs received successfully", blobsList: blobsList });

});

async function getBlobSasURL(containerName: string, blobName: string, blockBlobClient: BlockBlobClient): Promise<string> {
    const sharedKeyCredential = new StorageSharedKeyCredential(constants.azure_storage_account, constants.azure_account_key);
    const startTime = new Date();
    const durationInMinutes = 15;
    startTime.setMinutes(startTime.getMinutes() - durationInMinutes);

    const blobSas = await generateBlobSASQueryParameters({
        containerName, // Required
        blobName, // Required
        permissions: BlobSASPermissions.parse("r"), // Required
        startsOn: startTime, // Optional
        expiresOn: new Date(new Date().valueOf() + 60 * 60 * 1000), // Required. Date type. Set for 1 hours
      },
      sharedKeyCredential // StorageSharedKeyCredential - `new StorageSharedKeyCredential(account, accountKey)`
    )

    const blobSasUrl = blockBlobClient.url + "?" + blobSas.toString();

    return blobSasUrl;
}

export const basePath = "/azureBlob";
export default router;