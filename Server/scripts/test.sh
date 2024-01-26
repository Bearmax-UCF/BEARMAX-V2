#!/bin/bash
# Run the test using Docker Compose
docker compose run -e PORT=0  --name backend_test backend test

# Perform the test here...

# Delete the Docker Compose containers and images
docker stop $(docker ps -a -q) 1> /dev/null
docker container rm backend_test 1> /dev/null
docker rmi bearmax/backend:latest 1> /dev/null
docker volume prune -f 1> /dev/null