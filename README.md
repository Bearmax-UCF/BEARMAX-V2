# BEARMAX-V2
To access the API documentation, go here https://github.com/Bearmax-UCF/BEARMAX-V2/tree/main/Server#backend-api-documentation

## How to set up server locally

- To set up server locally, make sure you have Docker installed via https://docs.docker.com/engine/install/
- Once that is installed, make sure it is running
- Next step is to create a file named docker-compose.yml in the Server folder

- Ask your team about the contents needed in docker-compose.yml

- Once contents are in, run the following script below while you are in the Server folder
- NOTE: before running the script below, make sure your node_modules folders are deleted in both the Server folder and root directory of this project if you ran npm install at any point

```bash
docker compose up
```
- To test locally, use http://localhost:8080/api

- To stop the server from running, you can either use CTRL + C in the same terminal you ran the command above, or you can run the following list of commands below (you can also open up the docker desktop application and manually stop them from running in there):

- This command will list the currently running containers make sure to copy the container ids
```bash
docker ps
```

- Then run on the containers that are running
```bash
docker stop <CONTAINER_ID>
```

## Unit Tests

- To run unit tests, make sure your backend volume is up to date before proceeding, so you can open up the docker desktop, go to images, and then delete the one that says bearmax/backend

- Next, make sure you are in the Server folder,

- then run the following script below

```bash
docker-compose run -e PORT=0 backend test
```

- NOTE: If you have a bash (Linux or MacOS) based terminal, you can run the script below in the Server folder for simpler testing

```bash
./scripts/test.sh
```