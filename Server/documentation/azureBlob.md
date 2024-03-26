# API endpoints involving the Azure containers

## Creating a blob

This API is already achieved via the API for uploading media files:
 * [Upload Files](documentation/uploadFiles.md)

## Getting a single blob

Gets a user's media file / blob from Azure.

**URL** : `/api/azureBlob/getBlob/:id`

**Method** : `GET`

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
    "message": "Blob received successfully",
    "blob": {
        "blobName": "Metal pipe falling sound effect but it’s more violent.mp4",
        "blobUrl": "https://bearmaxstorage.blob.core.windows.net/65c109110cbf9a30562f70fc/Metal%20pipe%20falling%20sound%20effect%20but%20it%E2%80%99s%20more%20violent.mp4?sv=2023-11-03&st=2024-02-19T07%3A06%3A32Z&se=2024-02-19T08%3A21%3A32Z&sr=b&sp=r&sig=KUgounHKcOUrFxJR%2FDv3e9dzTYkLKhoEQJWDtC2sSB0%3D"
    }
}
```

### Error Responses

**Condition** : Authorization token sent by user is invalid or no token is present

**Code** : `401 Unauthorized`

**Content Example**

```
Unauthorized
```

**Condition** : User id is not present in the API URL

**Code** : `400 Bad Request`

**Content Example**

```json
{
    "message": "User id is not present"
}
```
**Condition** : User with provided id from the API URL does not exist

**Code** : `400 Bad Request`

**Content Example**

```json
{
    "message": "User not found"
}
```

**Condition** : Container to put blob in doesn't exist

**Code** : `400 Bad Request`

**Content Example**

```json
{ 
    "message": "Container does not exist."
}
```
**Condition** : Cannot access blob

**Code** : `400 Bad Request`

**Content Example**

```json
{ 
    "message": "Error getting blob"
}
```

**Condition** : Blob not found or isn't accessible

**Code** : `400 Bad Request`

**Content Example**

```json
{ 
    "message": "Blob not found" 
}
```

## Getting the list of blobs

Gets a list of all the user's media files / blobs from Azure.

**URL** : `/api/azureBlob/listBlobs/:id`

**Method** : `GET`

**Auth Required** : YES

**Data Constraints** 

The body is empty but you must include a user id in the url such as calling https://bearmaxcare.com/api/users/658de6de66246cdf2100e3d3

### Success Response

**Code** : `200 OK`

**Content Example**

```json
{
    "message": "Blobs received successfully",
    "blobsList": [
        {
            "blobName": "Metal pipe falling sound effect but its more violent.mp3",
            "blobUrl": "https://bearmaxstorage.blob.core.windows.net/65c109110cbf9a30562f70fc/Metal%20pipe%20falling%20sound%20effect%20but%20its%20more%20violent.mp3?sv=2023-11-03&st=2024-02-19T07%3A06%3A17Z&se=2024-02-19T08%3A21%3A17Z&sr=b&sp=r&sig=TBQqX%2Bb65ZlpVGZyHv2bkl%2B0aY07IZzFnYvm6rTWbLs%3D"
        },
        {
            "blobName": "Metal pipe falling sound effect but it’s more violent.mp4",
            "blobUrl": "https://bearmaxstorage.blob.core.windows.net/65c109110cbf9a30562f70fc/Metal%20pipe%20falling%20sound%20effect%20but%20it%E2%80%99s%20more%20violent.mp4?sv=2023-11-03&st=2024-02-19T07%3A06%3A17Z&se=2024-02-19T08%3A21%3A17Z&sr=b&sp=r&sig=x8gmKfvy7eNh0AhuPgy4AfS2PIXavnvmV7AG3fko5L0%3D"
        }
    ]
}
```

### Error Responses

**Condition** : Authorization token sent by user is invalid or no token is present

**Code** : `401 Unauthorized`

**Content Example**

```
Unauthorized
```

**Condition** : Container not found or isn't accessible

**Code** : `400 Bad Request`

**Content Example**

```json
{ 
    "message": "Container does not exists." 
}
```

**Condition** : User id is not present in the API URL

**Code** : `400 Bad Request`

**Content Example**

```json
{
    "message": "User id is not present"
}
```

**Condition** : User with provided id from the API URL does not exist

**Code** : `400 Bad Request`

**Content Example**

```json
{
    "message": "User not found"
}
```

**Condition** : Blob not successfully deleted by MongoDB

**Code** : `400 Bad Request`

**Content Example**

```json
{ 
    "message": "Error deleting blob"
}
```

## Deleting a blob

Deletes a user's media file / blob from Azure.
When deleting a file or blob from Azure, make sure to also delete it from MongoDB, which that documentation can be found here:
 * [User Files](documentation/userFiles.md)

**URL** : `/api/azureBlob/:id`

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
    "message": "Blob deleted successfully"
}
```

### Error Responses

**Condition** : Authorization token sent by user is invalid or no token is present

**Code** : `401 Unauthorized`

**Content Example**

```
Unauthorized
```

**Condition** : Container not found or isn't accessible

**Code** : `400 Bad Request`

**Content Example**

```json
{ 
    "message": "Container does not exists." 
}
```

**Condition** : User id is not present in the API URL

**Code** : `400 Bad Request`

**Content Example**

```json
{
    "message": "User id is not present"
}
```

**Condition** : User with provided id from the API URL does not exist

**Code** : `400 Bad Request`

**Content Example**

```json
{
    "message": "User not found"
}
```

**Condition** : Blob not found

**Code** : `400 Bad Request`

**Content Example**

```json
{ 
    "message": "Blob not found"
}
```

**Condition** : Container not successfully deleted by MongoDB

**Code** : `400 Bad Request`

**Content Example**

```json
{ 
    "message": "Error deleting blob"
}
```