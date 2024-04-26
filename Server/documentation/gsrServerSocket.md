# Server-side websocket events for emotion game

## Recalibrate

Recalibrate the wearable device.

**URL** : `localhost:8080`

**Auth Required** : YES

**Params Required** : YES

**Event Name** : recalibrate

**Data Constraints** : Empty body

### Success Response

**Content Example** (in console)

```
Fri Mar 15 2024 22:38:24 GMT-0400 (Eastern Daylight Time) || Received recalibrate event
```

## Send GSR to robot

Send child's GSR to client.

**URL** : `localhost:8080`

**Auth Required** : YES

**Params Required** : YES

**Event Name** : GSR

**Data Constraints** : 

```text / stringified json
{
    "value": 3,
    "ts": "2024-03-16T22:38:24.000Z"
}
```

### Success Response

**Content Example** (in console)

```
GSR data sent to client
```
