# BEARMAX-V2
BEARMAX but version 2

## How to set up backend locally
- First make sure you have docker installed on your machine. A link to get the installation in the following: https://docs.docker.com/engine/install/.
- Then cd to the Server folder for backend.
- Then run the script provided just below in the terminal:
```bash
docker build -t bearmax-backend .
```
NOTE: Do not forget the period in the bash command as it is essential or else you will get a docker buildx build error.

- Once the script is finished building, run the following script:
```bash
docker run -d -p 8080:8080 bearmax-backend
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

- To test locally, use http://localhost:8080/api