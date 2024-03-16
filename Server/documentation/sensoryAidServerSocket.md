# Server-side websocket events for sensory overload aid

## Playing sensory overload aid media

Sending user-selected Azure blob media to the Raspberry Pi to be played to the child. 

**URL** : `localhost:8080`

**Auth Required** : YES

**Params Required** : YES

**Event Name** : playMedia

**Data Constraints** : 

```json
{
    "mediaURL": "Metal pipe falling sound effect but it’s more violent.mp4"
}
```

### Success Response

**Content Example** (in console)

```
Blob received successfully
```

### Error Responses

**Condition** : User id is not present in the API URL

**Content Example** (in console)

```
User id is not present
```
**Condition** : User with provided id from the API URL does not exist

**Content Example** (in console)

```
User not found
```

**Condition** : Container to put blob in doesn't exist

**Content Example** (in console)

```
Container does not exist.
```
**Condition** : Cannot access blob

**Content Example** (in console)

```
Error getting blob
```

**Condition** : Blob not found or isn't accessible

**Content Example** (in console)

```
Blob not found
```