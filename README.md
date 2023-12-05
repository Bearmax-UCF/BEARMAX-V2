# BEARMAX-V2
BEARMAX but version 2

## How to set up server locally

- To set up server locally, make sure you have Docker installed via https://docs.docker.com/engine/install/
- Once that is installed, make sure it is running
- Next step is to create a file named docker-compose-dev.yml in the Server folder

- Ask your team about the contents needed in docker-compose-dev.yml

- Once contents are in, run the following script below while you are in the Server folder
- NOTE: before running the script below, make sure your node_modules folders are deleted in both the Server folder and root directory of this project if you ran npm install at any point

```bash
docker compose -f docker-compose-dev.yml up
```
- To test locally, use http://localhost:8080/api

- To stop the server from running, 