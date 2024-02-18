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

## Endpoints without needing Authentication

* [No Auth](documentation/noAuth.md)

## Endpoints that req Authentication

In the header part of the request that require authentication, include the the Authoriation key and then the value "Bearer + key", such an example would be:

```
Authorization: Bearer eyJhbGciOiJIUzI1QiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTUxNDA3OTljZDZiNmYwMGEzZjZlYjciLCJqdGkiOiI1M2I4YzM1NS1lZjRiLTRlOTAtOGRjYi01NmNjNGU2ODc3YzgiLCJpYXQiOjE2OTk5MDIzOTQsImV4cCI6MTY5OTk0NTU5NH0.L8NvN5APFJxMSEGtuHTcSpEWg9iampJkCStR46fsk4l
```

NOTE: the above token is invalid do not try using it

 * [Users](documentation/users.md)
 * [Note](documentation/note.md)
 * [emotionRecognition](documentation/emotionRecognition.md)