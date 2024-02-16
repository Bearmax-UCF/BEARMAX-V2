# API endpoints involving notes

## Getting All Notes For a User

Gets all User Notes

**URL** : `/api/note`

**Method** : `GET`

**Auth Required** : YES

**Data Constraints** : None

You send this request with an empty body but the token must be in the header

### Success Response

**Code** `200 OK`

**Content Example**

```json
{
    "allNotes": [
        {
            "_id": "65cf996f7b350c846bc5f22e",
            "title": "test title",
            "date": "2024-01-29T23:31:15.859Z",
            "note": "test note",
            "userID": "65cf9767ea1b7b49cba0ca98",
            "__v": 0
        },
        {
            "_id": "65cf99f054480495867e82b6",
            "title": "test title",
            "date": "2024-01-29T23:31:15.859Z",
            "note": "test note",
            "userID": "65cf9767ea1b7b49cba0ca98",
            "__v": 0
        },
        {
            "_id": "65cf9c4e54480495867e82bd",
            "title": "test title",
            "date": "2024-01-29T23:31:15.859Z",
            "note": "test note",
            "userID": "65cf9767ea1b7b49cba0ca98",
            "__v": 0
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

## Creating notes for a user

**URL** : `/api/note`

**Method** : `POST`

**Auth Required**: YES

**Data Constraints**

```json
{
    "title": "test title",
    "date": "2024-01-29T23:31:15.859Z", // Using the JavaScript new Date() object
    "note": "test note"
}
```

### Success Response

**Code** : `200 OK`

**Content Example**

```json
{
    "newNote": {
        "title": "test title",
        "date": "2024-01-29T23:31:15.859Z",
        "note": "test note",
        "userID": "65cf9767ea1b7b49cba0ca98",
        "_id": "65cf9c4e54480495867e82bd"
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

### Or

**Condition** : User tries to POST new note with missing field

**Code** : `400 BAD REQUEST`

**Content Example**

```json
{
    "message": "Missing one or more fields."
}
```