# Emotion Recognition API Endpoints

## Getting Emotion Recognition Data From a Specific User

Gets all User Emotion Recognition Data

**URL** : `/api/emotionRecognition`

**Method** : `GET`

**Auth Required** : YES

**Data Constraints** : None

You send this request with an empty body but the token must be in the header

### Success Response

**Code** : `200 OK`

**Content Example**

```json
{
    "allGames": [
        {
            "_id": "65d41e8ae012d1273cae9c04",
            "Correct": [
                0,
                0,
                0,
                0
            ],
            "Wrong": [
                0,
                0,
                0,
                0
            ],
            "GameFin": "2024-02-20T03:37:46.621Z",
            "UserID": "65d41babe012d1273cae9bf9",
            "NumPlays": 4,
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

## Deleting Emotion Recognition Data

Deletes all Emotion Recognition Data for a specific user

**URL** : `/api/emotionRecognition/:id`

**Method** : `DELETE`

**Auth Required** : YES

**Data Constraints** : Must include the emotion recognition id in the URL like https://bearmaxcare.com/api/emotionRecognition/658de6de66246cdf2100e3d3

You send this request with an empty body but the token must be in the header If the emotion recognition data is not found, an null object will be returned

### Success Response

**Code** : `200 OK`

**Content Example**

```json
{
    "deleted": {
        "_id": "65d42018c8306a05b9d8d268",
        "Correct": [
            0,
            0,
            0,
            0
        ],
        "Wrong": [
            0,
            0,
            0,
            0
        ],
        "GameFin": "2024-02-20T03:44:24.877Z",
        "UserID": "65d41babe012d1273cae9bf9",
        "NumPlays": 4,
        "__v": 0
    }
}
```

### Error Response

**Condition** : Authorization token sent by user is invalid or no token is present

**Code** : `401 Unauthorized`

**Content Example**

```
Unauthorized
```