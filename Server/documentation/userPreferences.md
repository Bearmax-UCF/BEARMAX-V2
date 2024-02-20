# API endpoints involving the user stimuli preferences

## Creating user preferences

Creates a file in MongoDB that stores the user's stimuli preferences

**URL** : `/api/userPreferences/:id`

**Method** : `POST`

**Auth Required** : YES

**Data Constraints** : Bools for each stimuli are either true or false, and the ":id" is filled with the same id from the API URL

```json
{
    "userId": ":id",
    "boolVideo": true,
    "boolAudio": true,
    "boolTaste": true, 
    "boolSmell": true, 
    "boolTouch": true
}
```

### Success Response

**Code** : `201 Created`

**Content Example**

```json
{
    "data": {
        "userId": "65c109110cbf9a30562f70fc",
        "boolVideo": true,
        "boolAudio": true,
        "boolTaste": false,
        "boolSmell": false,
        "boolTouch": false,
        "_id": "65d2d846265c2f66837ed202",
        "__v": 0
    },
    "message": "User preferences successfully created."
}
```

### Error Responses

**Condition** : Authorization token sent by user is invalid or no token is present

**Code** : `401 Unauthorized`

**Content Example**

```
Unauthorized
```

**Condition** : User id in API URL does not match the userId in the JSON body

**Code** : `400 Bad Request`

**Content Example**

```json
{
    "message": "User id doesn't equal the API URL id."
}
```

**Condition** : User preferences file has already been created

**Code** : `400 Bad Request`

**Content Example**

```json
{
    "message": "User preferences already exists."
}
```

**Condition** : User preferences file was not successfully created

**Code** : `400 Bad Request`

**Content Example**

```json
{ 
    "error": "err", // "err" is replaced by error message provided by MongoDB
    "message": "User preferences not successfully created." 
}
```

## Getting user preferences from database

Gets a file in MongoDB that stores the user's stimuli preferences

**URL** : `/api/userPreferences/:id`

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
        "_id": "65d2d846265c2f66837ed202",
        "userId": "65c109110cbf9a30562f70fc",
        "boolVideo": true,
        "boolAudio": true,
        "boolTaste": false,
        "boolSmell": false,
        "boolTouch": false,
        "__v": 0
    },
    "message": "User preferences successfully retrieved."
}
```

### Error Responses

**Condition** : Authorization token sent by user is invalid or no token is present

**Code** : `401 Unauthorized`

**Content Example**

```
Unauthorized
```

**Condition** : User preferences not found or aren't accessible

**Code** : `400 Bad Request`

**Content Example**

```json
{
    "boolSetup": false,
    "message": "User preferences do not exist yet."
}
```

## Updating user preferences

Updates a file in MongoDB that stores the user's stimuli preferences

**URL** : `/api/userPreferences/:id`

**Method** : `PATCH`

**Auth Required** : YES

**Data Constraints**: Bools for each stimuli are either true or false, and the ":id" is filled with the same id from the API URL

```json
{
    "userId": ":id",
    "boolVideo": true,
    "boolAudio": true,
    "boolTaste": true, 
    "boolSmell": true, 
    "boolTouch": true
}
```

### Success Response

**Code** : `200 OK`

**Content Example**

```json
{
    "data": {
        "userId": "65c109110cbf9a30562f70fc",
        "boolVideo": true,
        "boolAudio": false,
        "boolTaste": false,
        "boolSmell": false,
        "boolTouch": false,
        "_id": "65d2dbd4265c2f66837ed20d"
    },
    "message": "User preferences successfully updated."
}
```

### Error Responses

**Condition** : Authorization token sent by user is invalid or no token is present

**Code** : `401 Unauthorized`

**Content Example**

```
Unauthorized
```

**Condition** : User preferences not found or aren't accessible

**Code** : `400 Bad Request`

**Content Example**

```json
{ 
    "message": "User preferences not found." 
}
```

**Condition** : User preferences file was not successfully updated

**Code** : `400 Bad Request`

**Content Example**

```json
{ 
    "error": "err", // "err" is replaced by error message provided by MongoDB
    "message": "User preferences not successfully updated." 
}
```

## Deleting user preferences from database

Deletes a file in MongoDB that stores the user's stimuli preferences

**URL** : `/api/userPreferences/:id`

**Method** : `DELETE`

**Auth Required** : YES

**Data Constraints** 

The body is empty but you must include a user id in the url such as calling https://bearmaxcare.com/api/users/658de6de66246cdf2100e3d3

### Success Response

**Code** : `200 OK`

**Content Example** 

```json
{
    "message": "User preferences successfully deleted."
}
```

### Error Responses

**Condition** : Authorization token sent by user is invalid or no token is present

**Code** : `401 Unauthorized`

**Content Example**

```
Unauthorized
```

**Condition** : User preferences not found or aren't accessible

**Code** : `400 Bad Request`

**Content Example**

```json
{ 
    "message": "User preferences not found." 
}
```

**Condition** : User preferences file was not successfully deleted

**Code** : `400 Bad Request`

**Content Example**

```json
{ 
    "error": "err", // "err" is replaced by error message provided by MongoDB
    "message": "User preferences not successfully deleted." 
}
```
