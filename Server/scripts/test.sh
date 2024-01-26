#!/bin/bash

# Run the test using Docker Compose
docker-compose run -e PORT=0 backend test

# Perform the test here...

# Delete the Docker Compose containers and images and suppresses output from it
docker stop $(docker ps -a -q) 1> /dev/null

docker container prune -f 1> /dev/null
docker rmi bearmax/backend:latest 1> /dev/null
docker volume prune -a -f 1> /dev/null