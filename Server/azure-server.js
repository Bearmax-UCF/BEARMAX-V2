var azure = require('azure-storage');

var blobSvc = azure.createBlobService();

// Would need to add prefix strings such as "user1/vid_example.mov" to allow for file organization between users
// This will allow for all audio and video files to be stored in one blob storage while having the benefit of user-specific data organization
// Alternative is an individual blob container for each user

blobSvc.createContainerIfNotExists('blob', {publicAccessLevel : 'blob'}, function(error, result, response){
  if(!error){
    // Container exists and is private
  }
});

// To upload data to block blob
blobSvc.createBlockBlobFromLocalFile(bearmaxstorage, 'blob', 'test.txt', function(error, result, response){
  if(!error){
    // file uploaded
  }
});

// To list blobs in container
blobSvc.listBlobsSegmented('blob', null, function(error, result, response){
  if(!error){
    // result.entries contains the entries
    // If not all blobs were returned, result.continuationToken has the continuation token.
  }
});

// To delete a blob
blobSvc.deleteBlob(bearmaxstorage, 'blob', function(error, response){
  if(!error){
	// Blob has been deleted
  }
});