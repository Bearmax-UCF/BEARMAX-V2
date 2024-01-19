require("dotenv").config();
import requireJwtAuth from './src/middleware/requireJwtAuth';

const express = require('express');
const app = express();

const AzureStorageBlob = require("@azure/storage-blob");
const { BlobServiceClient } = require("@azure/storage-blob");

const connStr = process.env.AZURE_STORAGE_CONNECTION_STRING;
const blobServiceClient = new BlobServiceClient.fromConnectionString(connStr);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


// Routes here

app.get("/createContainer", requireJwtAuth, async (req, res, next) => {
    try
    {
        const containerName = req.body.userId;
        const containerClient = blobServiceClient.getContainerClient(containerName);
        const createContainerResponse = await containerClient.create();
        res.send(`Created container ${containerName} successfully`, createContainerResponse.requestId);
        return res.status(201).json({
            userId: req.body.userId,
            containerName: containerName
        });
    }
    catch(err)
    {
        next(err);
    }
});

app.get("/getContainer", requireJwtAuth, async (req, res, next) => {
    try
    {
        const userId = req.body.userId;
        const containerClient = blobServiceClient.getContainerClient(userId);
        const getContainerResponse = await containerClient.get(userId);
        res.send(`Got container ${userId} successfully`, getContainerResponse.requestId);
        return res.status(200).json({
            userId: req.body.userId,
            containerName: userId
        });
    }
    catch(err)
    {
        next(err);
    }
});

app.get("/listContainers", requireJwtAuth, async (req, res, next) => {
    try
    {
        let i = 1;
        let containersList = [String];
        let containers = blobServiceClient.listContainers();
        for await (const container of containers) {
            console.log(`Container ${i++}: ${container.name}`);
            containersList.push(container.name);
        }

        res.send(`List of containers successfully acquired`);
        return res.status(200).json({
            userId: req.body.userId,
            containersList: containersList
        });

    }
    catch(err)
    {
        next(err);
    }
});

app.get("/deleteContainer", requireJwtAuth, async (req, res, next) => {
    try
    {
        const containerName = req.body.userId;
        const containerClient = blobServiceClient.getContainerClient(containerName);
        const deleteContainerResponse = await containerClient.deleteContainer(containerName);
        res.send(`Created container ${containerName} successfully`, deleteContainerResponse.requestId);
        return res.status(201).json({
            userId: req.body.userId,
            containerName: containerName
        });
    }
    catch(err)
    {
        next(err);
    }
});

app.get("/createBlob", requireJwtAuth, async (req, res, next) => {
    try
    {
        const containerClient = blobServiceClient.getContainerClient(req.body.userId);
        const content = "Hello world!";
        const blobName = "newblob" + new Date().getTime();
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        const uploadBlobResponse = await blockBlobClient.upload(content, content.length);
        res.send(`Created block blob ${blobName} successfully`, uploadBlobResponse.requestId);
        return res.status(201).json({
            userId: req.body.userId,
            blobName: blobName
        });
    }
    catch(err)
    {
        next(err);
    }
});

app.get("/getBlob", requireJwtAuth, async (req, res, next) => {
    try
    {
        const containerClient = blobServiceClient.getContainerClient(req.body.userId);
        const blobName = req.body.blobName;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        const getBlobResponse = await blockBlobClient.getBlob(blobName);
        res.send(`Got blob ${blobName} successfully`, getBlobResponse.requestId);
        return res.status(200).json({
            userId: req.body.userId,
            blobName: blobName
        });
    }
    catch(err)
    {
        next(err);
    }
});

app.get("/listBlobs", requireJwtAuth, async (req, res, next) => {
    try
    {
        const containerClient = blobServiceClient.getContainerClient(req.body.userId);

        let i = 1;
        let blobsList = [String];
        let blobs = containerClient.listBlobsFlat();
        for await (const blob of blobs) {
          console.log(`Blob ${i++}: ${blob.name}`);
          blobsList.push(blob.name);
        }

        res.send(`List of blobs successfully acquired`);
        return res.status(200).json({
            userId: req.body.userId,
            blobsList: blobsList
        });
    }
    catch(err)
    {
        next(err);
    }
});

app.get("/deleteBlob", requireJwtAuth, async (req, res, next) => {
    try
    {
        const containerClient = blobServiceClient.getContainerClient(req.body.userId);
        const blobName = req.body.blobName;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        const deleteBlobResponse = await blockBlobClient.deleteBlob(blobName);
        res.send(`Deleted block blob ${blobName} successfully`, deleteBlobResponse.requestId);
        return res.status(200).json({
            userId: req.body.userId
        });
    }
    catch(err)
    {
        next(err);
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));