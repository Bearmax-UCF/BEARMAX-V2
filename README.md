# BEARMAX-V2
BEARMAX but version 2

## How to set up backend locally
- First make sure you have docker installed on your machine
- then cd to the Server folder for backend
```bash
docker build -t bearmax-backend .
```
- then run the script provided above

- Once the script is finished building, run the following script
```bash
docker run -d -p 8080:8080 bearmax-backend
```

- To stop the backend from running use the bottom script to see what containers are currently running
```bash
docker ps
```
- Then copy the container id of the container you want to stop
```bash
docker stop <CONTAINER_ID>
```
- To test locally, use http://localhost:8080/api