# Server-side websocket events for emotion game

## Starting or stopping the game

Starting or stopping the emotion game.

**URL** : `localhost:8080`

**Auth Required** : YES

**Params Required** : YES

**Event Name** : emotionGame

**Data Constraints** : In the body, put 'start' to start the emotion game or 'stop' to stop the game.

### Success Response

**Content Example** (in console)

```
Fri Mar 15 2024 22:38:24 GMT-0400 (Eastern Daylight Time) || Received emotionGame event with action 'start'
```

### Error Responses

**Condition** : Missing userID query parameter.

**Content Example** (in console)

```
Error: Game started by a socket without a userID query parameter.
```

## Saving emotion game stats

Saving emotion game statistics to MongoDB. 

**URL** : `localhost:8080`

**Auth Required** : YES

**Params Required** : YES

**Event Name** : emotionGameStats

**Data Constraints** : 

```text / stringified json
{
    "Correct": [1, 1, 1, 1],
    "Wrong": [0, 0, 0, 0],
    "GameFin": "2024-03-16T22:38:24.000Z",
    "UserID": "65c109110cbf9a30562f70fc",
    "NumPlays": 2
}
```

### Success Response

**Content Example** (in console)

```
Fri Mar 15 2024 22:38:24 GMT-0400 (Eastern Daylight Time) || Received emotionGameStats event
{
    Correct: [ 1, 1, 1, 1 ],
    Wrong: [ 0, 0, 0, 0 ],
    GameFin: '2024-03-16T22:38:24.000Z',
    UserID: '65c109110cbf9a30562f70fc',
    NumPlays: 2
}
string
Successfully saved event!
```

### Error Responses

**Condition** : Missing userID query parameter.

**Content Example** (in console)

```
Error: Game started by a socket without a userID query parameter.
```
