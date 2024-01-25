#!/bin/bash
# Run the test using Docker Compose
docker-compose run -e PORT=0 backend test

# Perform the test here...

# Delete the Docker Compose containers and images
docker stop $(docker ps -a -q)

docker container prune -f
docker rmi bearmax/backend:latest
docker volume prune -a -f