# API endpoints involving the Azure containers

## Creating a container

This API is already handled automatically when calling any of the API for uploading media files:
 * [Upload Files](documentation/uploadFiles.md)

## Deleting a container

Deletes a user's container from Azure.

**URL** : `/api/azureContainer/:id`

**Method** : `DELETE`

**Auth Required** : YES

**Data Constraints** 

The body is empty but you must include a user id in the url such as calling https://bearmaxcare.com/api/users/658de6de66246cdf2100e3d3

### Success Response

**Code** : `200 OK`

**Content Example**

```json
{
    "message": "Container deleted successfully"
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

**Condition** : Container not found or isn't accessible

**Code** : `400 Bad Request`

**Content Example**

```json
{ 
    "message": "Container does not exists." 
}
```

**Condition** : Container not successfully deleted by MongoDB

**Code** : `400 Bad Request`

**Content Example**

```json
{ 
    "message": "Error deleting container"
}
```