# API endpoints involving the uploading of user-selected media

## Uploading audio files

Creates a container if it doesn't already exist and inputs the audio file into the container

**URL** : `/api/uploadFiles/uploadAudio/:id`

**Method** : `POST`

**Auth Required** : YES

**Data Constraints** : Body type is form-data with the Key being "file" and the Value being the selected file from device

### Success Response

**Code** : `200 OK`

**Content Example**

```json
{
    "blobName": "Metal pipe falling sound effect but its more violent.mp3", // blobName contains the original name of file
    "message": "Audio uploaded successfully"
}
```

If the container is successfully created, you can check the console for the following message: 
```json
{ 
    "message": "Container created successfully" 
}
```

### Error Responses

**Condition** : Authorization token sent by user is invalid or no token is present

**Code** : `401 Unauthorized`

**Content Example**

```
Unauthorized
```

**Condition** : Object selected to upload is not a file

**Code** : `400 Bad Request`

**Content Example**

```json
{
    "message": "No file has been provided"
}
```

**Condition** : File type is not mp3 / audio

**Code** : `400 Bad Request`

**Content Example**

```json
{
    "message": "File type must be an audio mp3 file"
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

**Condition** : The audio file being uploaded already is in the user's Azure container

**Code** : `400 Bad Request`

**Content Example**

```json
{
    "message": "Blob already exists."
}
```

**Condition** : MongoDB had a problem uploading the audio file

**Code** : `400 Bad Request`

**Content Example**

```json
{
    "message": "Error uploading audio"
}
```

**Condition** : MongoDB had a problem creating the user's container

**Code** : `400 Bad Request`

**Content Example**

```json
{
    "message": "Error creating container"
}
```

## Uploading video files

Creates a container if it doesn't already exist and inputs the video file into the container

**URL** : `/api/uploadFiles/uploadVideo/:id`

**Method** : `POST`

**Auth Required** : YES

**Data Constraints** : Body type is form-data with the Key being "file" and the Value being the selected file from device

### Success Response

**Code** : `200 OK`

**Content Example**

```json
{
    "blobName": "Metal pipe falling sound effect but it's more violent.mp4", // blobName contains the original name of file
    "message": "Video uploaded successfully"
}
```

If the container is successfully created, you can check the console for the following message: 
```json
{ 
    "message": "Container created successfully" 
}
```

### Error Responses

**Condition** : Authorization token sent by user is invalid or no token is present

**Code** : `401 Unauthorized`

**Content Example**

```
Unauthorized
```

**Condition** : Object selected to upload is not a file

**Code** : `400 Bad Request`

**Content Example**

```json
{
    "message": "No file has been provided"
}
```

**Condition** : File type is not mp4 / video

**Code** : `400 Bad Request`

**Content Example**

```json
{
    "message": "File type must be an video mp4 file"
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

**Condition** : The video file being uploaded already is in the user's Azure container

**Code** : `400 Bad Request`

**Content Example**

```json
{
    "message": "Blob already exists."
}
```

**Condition** : MongoDB had a problem uploading the video file

**Code** : `400 Bad Request`

**Content Example**

```json
{
    "message": "Error uploading video"
}
```

**Condition** : MongoDB had a problem creating the user's container

**Code** : `400 Bad Request`

**Content Example**

```json
{
    "message": "Error creating container"
}
```