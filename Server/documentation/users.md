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

## Updating user info

updates user information

**URL** : `/api/users/:id`

**Method** : `PATCH`

**Auth Required** : YES

**Data Constraints**: must include user id in the parameter as well as the fields you want to update in the body

```json
{
    "email" : "test@test.com", // each field is optional but you must include at least one field
    "password" : "123456",
    "firstName" : "bleh",
    "lastName" : "bleh"
}
```

In addition to the body, you want to include the url in the body http://bearmaxcare.com:8080/api/users/658de6de66246cdf2100e3d3
each field is optional, but you must include at least one in the body. The body is shown above

### Success Response

**Code** : `200 OK`

**Content Example**

```json
{
    "user": {
        "_id": "65a9a218309ad9ecbd00970c",
        "firstName": "test",
        "lastName": "user",
        "email": "test@test.com",
        "password": "some password",
        "isVerified": true, // could also be false depending on if user changed email
        "oldPasswords": [],
        "hashToken": "",
        "__v": 0
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

**Condition** : User tries to update their email to an account already in the database

**Code** : `400 BAD REQUEST`

**Content Example**

```json
{
    "message": "Email already taken"
}
```

### Or 

**Condition** : api is provided with invalid user id in parameter of url

**Code** : `404 Not Found`

**Content Example**

```json
{
    "message": "User not found"
}
```

### Or

**Condition** : API is provided with jwt token and valid user id but no fields to update

**Code** : `400 BAD REQUEST`

**Content Example**

```json
{
    "message": "No fields provided to update"
}
```
