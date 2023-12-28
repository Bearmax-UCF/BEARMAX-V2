## How to set up backend for deployment
- First make sure you have docker installed on your machine. A link to get the installation in the following: https://docs.docker.com/engine/install/.
- Then cd to the Server folder for backend.
- create a .env file in the Server folder
- the following variables should be in the file

```
MAILGUN_API_KEY
MAILGUN_DOMAIN
MONGO_URI
SECRET_KEY
BCRYPT_LOG_ROUNDS
TOKEN_EXPIRES_IN
```

- NOTE: before running the docker scripts, make sure to ask the team for the variables
- Then run the script provided just below in the terminal:
```bash
docker build -t bearmax-backend .
```
NOTE: Do not forget the period in the bash command as it is essential or else you will get a docker buildx build error.

- Once the script is finished building, run the following script:
```bash
docker run --rm --env-file .env -p 8080:8080 bearmax-backend
```

- To stop the backend from running use the bottom script to see what containers are currently running
```bash
docker ps
```

- Then copy the container id of the container you want to stop and run the following command:
```bash
docker stop <CONTAINER_ID>
```
NOTE: The container id can either be the long version generated upon running the docker image OR the shortened version provided via 
```bash
docker ps
```

# Backend API documentation

## Registration and logging into accounts

### Registration

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

#### Success Response

**Code** : `201 CREATED`

**Content example**

```json
{
    "message": "User created successfully!"
}
```

#### Error Responses

**Condition** : If email already is being used by another user

**Code** : `422 Unprocessable Entity`

**Content example**

```json
{
    "message": "Another User with this email already exists!"
}
```
#### Or

**Condition** : Missing one or more required fields

**Code** : `400 BAD REQUEST`

**Content example**

```json
{
    "message": "Missing one or more fields."
}
```

### Login

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

#### Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTY4JDFiZTQ4M2YzYzFkNDgwNDRlOTQiLCJqdGkiOiJhYzAwYjM2My1hZmI2LTQ4MTUtOWNlOC03YTg4Y2YzOWQ4YTUiLCJpYXQiOjE3MDM2OTk0MDMsImV4cCI6MTcwMzc0MjYwM30.8Yb3cU122LnWoK8Js1_6aqJPFwnKqJYqcrrBlkjiSzY",
    "id": "656801be483f3d1d48044e94",
    "message": "Logged in!"
}
```

#### Error Responses

**Condition** : If username and password combination is wrong

**Code** : `422 Unprocessable Entity`

**Content** :

```json
{
    "message": "Incorrect username or password."
}
```

#### Or

**Condition** : If username or password is missing

**Code** : `422 Unprocessable Entity`

**Content** :

```json
{
    "message": "Missing credentials"
}
```