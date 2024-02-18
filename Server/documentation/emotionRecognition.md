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
            "_id": "65d0eade46cebb74255e16fb",
            Correct: [Array],
            Wrong: [Array],
            GameFin: '2024-02-17T17:20:30.944Z',
            UserID: '65d0eade46cebb74255e16f0',
            NumPlays: 3,
            __v: 0
        }
    ]
}
```