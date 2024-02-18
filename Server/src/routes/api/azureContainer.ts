import { BlockBlobClient, StorageSharedKeyCredential, BlobServiceClient, RestError } from "@azure/storage-blob";
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

// Individual API for creation and deletion of Azure Blob Storage containers

router.post("/:id", requireJwtAuth, async (req, res, next) => {
    
    try {
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

        if(boolContainer) return res.status(400).send({ message: "Container already exists." });

        const response = await containerClient.create();
        
        if(response.errorCode) {
            return res.status(400).send({ message: "Error creating container" });
        } else {
            return res.status(201).send({ message: "Container created successfully" });
        }

    } catch (error) {

        if ((error as RestError).code === "ContainerBeingDeleted") {
            await waitWithBackoff(req.user!._id.toString());
            return res.status(201).send({ message: "Container created successfully" });
        } else {
            console.log(error);
        }
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

    const response = await containerClient.delete();
    
    if(response.errorCode) {
        return res.status(400).send({ message: "Error deleting container" });
    } else {
        return res.status(200).send({ message: "Container deleted successfully" });
    }
});

async function waitWithBackoff(blobContainerName: string) {
      await new Promise((resolve) => setTimeout(resolve, 30005));

      try {
        // retry container creation

        // create container name based on the user
        const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
        const containerClient = blobServiceClient.getContainerClient(blobContainerName);
        await containerClient.create();

        return; // Success, exit the wait loop

      } catch (error) {
        console.log(error);
    }
}

export const basePath = "/azureContainer";
export default router;