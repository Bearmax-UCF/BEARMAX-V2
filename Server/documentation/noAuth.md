# Registration and logging into accounts

## Registration

Create an account for the User if the user email does not already exist

**URL** : `/api/auth/register`

**Method** : `POST`

**Auth required** : NO

**Data Constraints**

```json
{
    "email": "example@example.com",
    "firstName": "example",
    "lastName": "user",
    "password": "plaintextpass"
}
```

All of the above fields are required

### Success Response

**Code** : `201 CREATED`

**Content example**

```json
{
    "message": "User created successfully!"
}
```

### Error Responses

**Condition** : If email already is being used by another user

**Code** : `422 Unprocessable Entity`

**Content example**

```json
{
    "message": "Another User with this email already exists!"
}
```
### Or

**Condition** : Missing one or more required fields

**Code** : `400 BAD REQUEST`

**Content example**

```json
{
    "message": "Missing one or more fields."
}
```

## Login

Logging into the User's account

**URL** : `/api/auth/login`

**Method** : `POST`

**Auth required** : NO

**Data Constraints**

Provide email and password to log in

```json
{
    "email": "example@example.com",
    "password": "password123"
}
```

### Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTY4JDFiZTQ4M2YzYzFkNDgwNDRlOTQiLCJqdGkiOiJhYzAwYjM2My1hZmI2LTQ4MTUtOWNlOC03YTg4Y2YzOWQ4YTUiLCJpYXQiOjE3MDM2OTk0MDMsImV4cCI6MTcwMzc0MjYwM30.8Yb3cU122LnWoK8Js1_6aqJPFwnKqJYqcrrBlkjiSzY",
    "id": "656801be483f3d1d48044e94",
    "message": "Logged in!"
}
```

### Error Responses

**Condition** : If username and password combination is wrong

**Code** : `422 Unprocessable Entity`

**Content** :

```json
{
    "message": "Incorrect username or password."
}
```

### Or

**Condition** : If username or password is missing

**Code** : `422 Unprocessable Entity`

**Content** :

```json
{
    "message": "Missing credentials"
}
```

### Or

**Condition** : If user logging in has not verified email

**Code** : `422 Unprocessable Entity`

**Content** :

```json
{
    "message": "Account not verified."
}
```

# Email verification and recovery

## Email Verification

Once an account is created, the user will receive a link they can click on to verify their email in their email inbox

**URL** : `/api/auth/verify?token=&id=`

**Method** : `GET`

**Auth Required** : NO

**Data Constraints**

```json
{

}
```

There is no data that needs to be sent in the body. However, the URL includes 2 parameters that are both required
an example would be calling http://bearmaxcare.com:8080/api/auth/verify?token=4a680e7aa9a4bbe981a9a9de2b6272b7fc43c8e3043d85cb4aad2c3834e5d11d&id=658de22d66246cdf5100e3c8


### Success Response

**Code** : `200 OK`

**Content Example**

```json
{
    "message": "User verified!"
}
```

### Error Responses

**Condition** : If user is already verified and they click the link again

**Code** : `422 Unprocessable Entity`

**Content example**

```json
{
    "message": "User already verified."
}
```

### Or

**Condition** : If user id from parameter does not correspond to a user in the database

**Code** : `422 Unprocessable Entity`

**Content Example**

```json
{
    "message": "User not found."
}
```

### Or

**Condition** : If user id from parameter corresponds to a user in the database but there is an invalid token in the parameter AND user is not verified yet

**Code** : `422 Unprocessable Entity`

**Content Example**

```json
{ 
    "message": "Invalid token." 
}
```

### Or

**Condition** : If user id from parameter provided is valid but the token is missing from the parameter

**Code** : `400 BAD REQUEST`

**Content Example**
```json
{ 
    "message": "Missing token." 
}
```

## Password Recovery request

If a user needs to reset or change their password, they send a request using this endpoint

**URL** : `/api/auth/forgotPasswordRequest`

**Method** : `POST`

**Auth Required** : NO

**Data Constraints** 

```json
{
    "email": "user@user.com"
}
```

All of the above fields are required

### Success Response

**Code** : `201 CREATED`

**Content Example**

```json
{ 
    "message": "Password Reset Request Sent Successfully!" 
}
```

### Error Responses

**Condition** : Email is not included in the body

**Code** : `400 BAD REQUEST`

**Content Example**

```json
{ 
    "message": "Missing email field." 
}
```

### Or

**Condition** : Email is provided in the body but does not exist in the database

**Code**: `422 Unprocessable Entity`

**Content Example**

```json
{ 
    "message": "User not found." 
}
```

## Password reset

If a user sends a password reset request and then a password reset gets sent the frontend will then call this link to reset the password 

**URL** : `/api/auth/resetPassword`

**Method** : `POST`

**Auth required** : NO

**Data Constraints**

```json
{
    "token": "a14940217b411ee5211f6a454d383b4423f9ffe9841d175250afdbdc7a4b69b0",
    "id": "656801be483f3d1d48044e94",
    "password": "123456"
}
```

All of the above fields are required but the elements listed such as 123456 for the password are just examples

### Success Response

**Code** : `201 CREATED`

**Content Example**

```json
{ 
    "message": "Password Reset Successfully!"
}
```

### Error Responses

**Condition** : userID does not exist in reset token database

**Code** : `422 Unprocessable Entity`

**Content Example**

```json
{ 
    "message": "Reset token not found." 
}
```

### Or

**Condition** : one of the required fields are missing

**Code** : `400 BAD REQUEST`

**Content Example**

```json
{ 
    "message": "Missing one or more fields." 
}
```

### Or

**Condition** : New password is the same as previous forgotten password

**Code** : `422 Unprocessable Entity`

**Content Example**

```json
{ 
    "message": "New password cannot be the same as the old password." 
}
```

### Or

**Condition** : Token provided is invalid or expired

**Code** : `422 Unprocessable Entity`

**Content Example**

```json
{ 
    "message": "Invalid token." 
}
```
