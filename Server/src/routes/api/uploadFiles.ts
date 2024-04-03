import { BlockBlobClient, StorageSharedKeyCredential, BlobServiceClient, generateBlobSASQueryParameters, BlobSASPermissions, RestError, BlockBlobUploadOptions } from "@azure/storage-blob";
import { Router } from "express";
import multer from "multer";
import User from "../../models/User";
import constants from "../../utils/constants";
import requireJwtAuth from "../../middleware/requireJwtAuth";


const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 10000000000 }});

const cutStringQuote = (rawConnectionString: string) => {
    return (rawConnectionString.charAt(0) === '"' && rawConnectionString.charAt(rawConnectionString.length - 1)) ? 
    rawConnectionString.substring(1, rawConnectionString.length - 1) : 
    rawConnectionString;
}

const connectionString = cutStringQuote(constants.azure_connection_string);

router.post("/uploadAudio/:id", requireJwtAuth, upload.single('file'), async (req, res, next) => {
    // empty file check first
    const file = req.file;
    if (!file) {
        return res.status(400).send({ message: "No file has been provided" });
    }
    // check if file is audio
    if (file.mimetype !== "audio/mpeg") {
        return res.status(400).send({ message: "File type must be an audio mp3 file" });
    }
    // check file size
    const fileSizeInMB = (file.size / (1024 * 1024));
    // Wanted a max of 1 GB, but Cloudflare free tier only allows 100 MB
    // if (fileSizeInMB > 1000) {
    if (fileSizeInMB > 100) {
        // return res.status(400).send({ message: "File size must be 1 GB or less" });
        return res.status(400).send({ message: "File size must be 100 MB or less" });
    }
    // check if userid is valid
    const userId = req.user!._id;
    if (!userId) {
        return res.status(400).send({ message: "User id is not present" });
    }
    const user = await User.findById(userId);
    if (!user) {
        return res.status(400).send({ message: "User not found" });
    }

    // create container if not already created
    await createContainer(userId.toString(), res);

    // upload to azure
    const blobName = `${file.originalname}`;

    // create container name based on the user
    const blobContainerName = userId.toString();
    const blockBlobClient = new BlockBlobClient(connectionString, blobContainerName, blobName);

    const boolBlob = await blockBlobClient.exists();

    if(boolBlob) return res.status(400).send({ message: "Blob already exists." });

    try {
        await blockBlobClient.uploadData(file.buffer, {
          blockSize: fileSizeInMB * 1024 * 1024, 
          concurrency: 20, // Maximum concurrent uploads
          blobHTTPHeaders: { blobContentType: file.mimetype }, // Set content type
          maxSingleShotSize: 100 * 1024 * 1024, // Limit single block size to 100 MB
        });
    
        res.status(200).send({ blobName, message: "Audio uploaded successfully" });
    } catch (error) {
        res.status(400).send({ message: "Error uploading audio" });
    }
});


router.post("/uploadVideo/:id", requireJwtAuth, upload.single('file'), async (req, res, next) => {
    // empty file check first
    const file = req.file;
    if (!file) {
        return res.status(400).send({ message: "No file has been provided" });
    }
    // check if file is video
    if (file.mimetype !== "video/mp4") {
        return res.status(400).send({ message: "File type must be a video mp4 file" });
    }
    // check file size
    const fileSizeInMB = (file.size / (1024 * 1024));
    if (fileSizeInMB > 1000) {
        return res.status(400).send({ message: "File size must be 1 GB or less" });
    }
    // check if userid is valid
    const userId = req.user!._id;
    if (!userId) {
        return res.status(400).send({ message: "User id is not present" });
    }
    const user = await User.findById(userId);
    if (!user) {
        return res.status(400).send({ message: "User not found" });
    }

    // create container if not already created
    await createContainer(userId.toString(), res);

    // upload to azure
    const blobName = `${file.originalname}`;

    // create container name based on the user
    const blobContainerName = userId.toString();
    const blockBlobClient = new BlockBlobClient(connectionString, blobContainerName, blobName);

    const boolBlob = await blockBlobClient.exists();

    if(boolBlob) return res.status(400).send({ message: "Blob already exists." });

    try {
        await blockBlobClient.uploadData(file.buffer, {
          blockSize: fileSizeInMB * 1024 * 1024, 
          concurrency: 20, // Maximum concurrent uploads
          blobHTTPHeaders: { blobContentType: file.mimetype }, // Set content type
          maxSingleShotSize: 100 * 1024 * 1024, // Limit single block size to 100 MB
        });
    
        res.status(200).send({ blobName, message: "Video uploaded successfully" });
    } catch (error) {
        res.status(400).send({ message: "Error uploading video" });
    }
});

async function createContainer(blobContainerName: string, res: any) {
    try {
        const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

        const containerClient = blobServiceClient.getContainerClient(blobContainerName);

        const boolContainer = await containerClient.exists();

        if(boolContainer) return;

        const response = await containerClient.create();
        
        if(response.errorCode) {
            return res.status(400).send({ message: "Error creating container" });
        } else {
            return console.log({ message: "Container created successfully" });
        }
    } catch (error) {
    
        if ((error as RestError).code === "ContainerBeingDeleted") {
            await waitWithBackoff(blobContainerName);
            return console.log({ message: "Container created successfully" });
        } else {
            console.log(error);
        }
    }
}

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

export const basePath = "/uploadFiles";
export default router;
