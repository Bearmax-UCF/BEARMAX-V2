# API endpoints involving the user

## Getting user info

Gets user info

**URL** : `/api/users/me`

**Method** : `GET`

**Auth Required** : YES

**Data Constraints** : None

You send this request with an empty body but the token must be in the header

### Success Response

**Code** : `200 OK`

**Content Example**

```json
{
    "me":
        {
            "_id":"658de6de66246cdf2100e3d3",
            "firstName":"Test",
            "lastName":"User",
            "email":"testemail@email.com",
            "password":"somepassword",
            "isVerified":true,
            "oldPasswords":[],
            "hashToken":"",
            "__v":0
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

## Deleting user from database

**URL** : `/api/users/:id`

**Method** : `DELETE`

**Auth Required** : YES

**Data Constraints** 

```json
{

}
```

As you can see the body is empty but you must include a user id in the url such as calling http://bearmaxcare.com:8080/api/users/658de6de66246cdf2100e3d3

### Success Response

**Code** : `200 OK`

**Content Example** 

```json
{
    "user": {
        "_id":"658de6de66246cdf2100e3d3",
        "firstName":"Test",
        "lastName":"User",
        "email":"testemail@email.com",
        "password":"somepassword",
        "isVerified":true,
        "oldPasswords":[],
        "hashToken":"",
        "__v":0
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