# API endpoints involving the MongoDB user media files

## Creating user media file

Initially creates user's managed media file(s) in MongoDB. 
Needs to be called after uploading the media and then getting the Azure media URL.

Upload media:
 * [Upload Files](documentation/uploadFiles.md)

Get Azure media URL:
 * [Blobs](documentation/azureBlob.md)

**URL** : `/api/userFiles/:id`

**Method** : `POST`

**Auth Required** : YES

**Data Constraints** : ":id" is filled with the same id from the API URL and the name of the media and it's URL, blobName and blobURL, are found after getting a single blob from Azure. Each media inputted into the user media file needs to have both the its respective blobName and the blobURL. You can either upload an audio file, a video file, or both. If not uploading an audio or video, input "" for the name and link such as with videoName and videoLink below.

```json
{
    "userId": ":id", 
    "audioName": "blobName", 
    "audioLink": "blobUrl", 
    "videoName": "", 
    "videoLink": ""
}
```

### Success Response

**Code** : `201 Created`

**Content Example**

```json
// response is based on the above Data Constraints example; inserting no data for video or audio upon user file creation will create an empty list to be potentially filled later

{
    "data": {
        "userId": "65c109110cbf9a30562f70fc",
        "audioFileList": [
            {
                "audioName": "Metal pipe falling sound effect but its more violent.mp3",
                "audioLink": "https://bearmaxstorage.blob.core.windows.net/65c109110cbf9a30562f70fc/Metal%20pipe%20falling%20sound%20effect%20but%20its%20more%20violent.mp3?sv=2023-11-03&st=2024-02-17T02%3A58%3A33Z&se=2024-02-17T04%3A13%3A33Z&sr=b&sp=r&sig=izEj23g4Q6fkZd8YqSfZeqD9xVQSWyHzdDD%2F2KNHkVc%3D",
                "_id": "65d2ebdc822594a2541b7e3f"
            }
        ],
        "videoFileList": [],
        "_id": "65d2ebdc822594a2541b7e3e",
        "__v": 0
    },
    "message": "User files successfully created."
}
```

### Error Responses

**Condition** : Authorization token sent by user is invalid or no token is present

**Code** : `401 Unauthorized`

**Content Example**

```
Unauthorized
```

**Condition** : User file already exists.

**Code** : `400 Bad Request`

**Content Example**

```json
{
    "message": "User file already exists."
}
```

**Condition** : User id in API URL does not match the userId in the JSON body

**Code** : `400 Bad Request`

**Content Example**

```json
{
    "message": "User id doesn't equal the API URL id."
}
```

**Condition** : User file was not successfully created

**Code** : `400 Bad Request`

**Content Example**

```json
{ 
    "error": "err", // "err" is replaced by error message provided by MongoDB
    "message": "User files not successfully created."
}
```

## Getting user preferences from database

Gets a file in MongoDB that stores the user's media files. 

**URL** : ``/api/userFiles/:id``

**Method** : `GET`

**Auth Required** : YES

**Data Constraints** 

The body is empty but you must include a user id in the url such as calling https://bearmaxcare.com/api/users/658de6de66246cdf2100e3d3

### Success Response

**Code** : `200 OK`

**Content Example** 

```json
{
    "boolSetup": true,
    "data": {
        "_id": "65d2ebdc822594a2541b7e3e",
        "userId": "65c109110cbf9a30562f70fc",
        "audioFileList": [
            {
                "audioName": "Metal pipe falling sound effect but its more violent.mp3",
                "audioLink": "https://bearmaxstorage.blob.core.windows.net/65c109110cbf9a30562f70fc/Metal%20pipe%20falling%20sound%20effect%20but%20its%20more%20violent.mp3?sv=2023-11-03&st=2024-02-17T02%3A58%3A33Z&se=2024-02-17T04%3A13%3A33Z&sr=b&sp=r&sig=izEj23g4Q6fkZd8YqSfZeqD9xVQSWyHzdDD%2F2KNHkVc%3D",
                "_id": "65d2ebdc822594a2541b7e3f"
            }
        ],
        "videoFileList": [],
        "__v": 0
    },
    "message": "User files successfully retrieved."
}
```

### Error Responses

**Condition** : Authorization token sent by user is invalid or no token is present

**Code** : `401 Unauthorized`

**Content Example**

```
Unauthorized
```

**Condition** : User file not found or aren't accessible

**Code** : `400 Bad Request`

**Content Example**

```json
{ 
    "boolSetup": false,
    "message": "User files do not exist yet."
}
```

## Updating user files from database

Updates user's managed media files in MongoDB. 

**URL** : ``/api/userFiles/:id``

**Method** : `PATCH`

**Auth Required** : YES

**Data Constraints** : Refer to the Create API for User Files for more detail about the data constraints.

```json
{
    "userId": ":id", 
    "audioName": "", 
    "audioLink": "", 
    "videoName": "blobName", 
    "videoLink": "blobUrl"
}
```

### Success Response

**Code** : `200 OK`

**Content Example** 

```json
{
    "data": {
        "_id": "65d2ebdc822594a2541b7e3e",
        "userId": "65c109110cbf9a30562f70fc",
        "audioFileList": [
            {
                "audioName": "Metal pipe falling sound effect but its more violent.mp3",
                "audioLink": "https://bearmaxstorage.blob.core.windows.net/65c109110cbf9a30562f70fc/Metal%20pipe%20falling%20sound%20effect%20but%20its%20more%20violent.mp3?sv=2023-11-03&st=2024-02-17T02%3A58%3A33Z&se=2024-02-17T04%3A13%3A33Z&sr=b&sp=r&sig=izEj23g4Q6fkZd8YqSfZeqD9xVQSWyHzdDD%2F2KNHkVc%3D",
                "_id": "65d2ebdc822594a2541b7e3f"
            }
        ],
        "videoFileList": [
            {
                "videoName": "Metal pipe falling sound effect but it's more violent.mp4",
                "videoLink": "https://bearmaxstorage.blob.core.windows.net/65c109110cbf9a30562f70fc/Metal%20pipe%20falling%20sound%20effect%20but%20it%E2%80%99s%20more%20violent.mp4?sv=2023-11-03&st=2024-02-17T02%3A58%3A33Z&se=2024-02-17T04%3A13%3A33Z&sr=b&sp=r&sig=MxPoK8i%2Fq6SUZ%2FujY6NRD8gqvJht%2BEwgj9%2BAvp9h8ns%3D",
                "_id": "65d2ef39822594a2541b7e4b"
            }
        ],
        "__v": 1
    },
    "message": "User files successfully updated."
}
```

### Error Responses

**Condition** : Authorization token sent by user is invalid or no token is present

**Code** : `401 Unauthorized`

**Content Example**

```
Unauthorized
```

**Condition** : User files not found update

**Code** : `400 Bad Request`

**Content Example**

```json
{ 
    "message": "User files not found."
}
```

**Condition** : User files aren't accessible to update

**Code** : `400 Bad Request`

**Content Example**

```json
{ 
    "boolSetup": false,
    "message": "User files could not be accessed."
}
```

**Condition** : API body incorrectly formatted

**Code** : `400 Bad Request`

**Content Example**

```json
{ 
    "message": "No audio or video file was provided or incorrect API body format."
}
```

**Condition** : User files was not successfully updated

**Code** : `400 Bad Request`

**Content Example**

```json
{ 
    "error": "err", // "err" is replaced by error message provided by MongoDB
    "message": "User files not successfully updated." 
}
```

## Deleting user files from database

Deletes user's managed media files from MongoDB.

**URL** : `/api/userFiles/deleteUserFile/:id`

**Method** : `DELETE`

**Auth Required** : YES

**Data Constraints** 

The body is empty but you must include a user id in the url such as calling https://bearmaxcare.com/api/users/658de6de66246cdf2100e3d3

### Success Response

**Code** : `200 OK`

**Content Example** 

```json
{
    "message": "User files successfully deleted."
}
```

### Error Responses

**Condition** : Authorization token sent by user is invalid or no token is present

**Code** : `401 Unauthorized`

**Content Example**

```
Unauthorized
```

**Condition** : User files not found or aren't accessible

**Code** : `400 Bad Request`

**Content Example**

```json
{ 
    "message": "User files not found." 
}
```

**Condition** : User files was not successfully deleted

**Code** : `400 Bad Request`

**Content Example**

```json
{ 
    "error": "err", // "err" is replaced by error message provided by MongoDB
    "message": "User files not successfully deleted." 
}
```

## Deleting a specific media file from the user files from database

Deletes a user's specified media file from MongoDB.

**URL** : `/api/userFiles/deleteFileEntry/:id`

**Method** : `DELETE`

**Auth Required** : YES

**Data Constraints** : blobName should be retrieved from the frontend as the user selects which blob to delete from their list

```json
{
    "blobName": "blobName"
}
```

### Success Response

**Code** : `200 OK`

**Content Example** 

```json
{
    "message": "File successfully deleted from user's file list."
}
```

### Error Responses

**Condition** : Authorization token sent by user is invalid or no token is present

**Code** : `401 Unauthorized`

**Content Example**

```
Unauthorized
```

**Condition** : User files not found or aren't accessible

**Code** : `400 Bad Request`

**Content Example**

```json
{ 
    "message": "User files not found." 
}
```

**Condition** : Specific media file not found or aren't accessible

**Code** : `400 Bad Request`

**Content Example**

```json
{ 
    "message": "File not found in user's file list."
}
```

**Condition** : User files was not successfully deleted

**Code** : `400 Bad Request`

**Content Example**

```json
{ 
    "error": "err", // "err" is replaced by error message provided by MongoDB
    "message": "File not successfully deleted from user's file list." 
}
```
