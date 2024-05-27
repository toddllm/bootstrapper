#!/bin/bash

# Stop and remove existing backend container if it exists
if [ "$(docker ps -a -q -f name=backend)" ]; then
    docker stop backend
    docker rm backend
fi

# Stop and remove existing frontend container if it exists
if [ "$(docker ps -a -q -f name=frontend)" ]; then
    docker stop frontend
    docker rm frontend
fi

# Build and run backend container
docker build -t backend -f backend/Dockerfile . || { echo 'Backend build failed'; exit 1; }
docker run -d -p $backend_port:5000 --name backend backend || { echo 'Backend run failed'; exit 1; }

# Build and run frontend container
docker build -t frontend -f frontend/Dockerfile . || { echo 'Frontend build failed'; exit 1; }
docker run -d -p $frontend_port:3000 --name frontend frontend || { echo 'Frontend run failed'; exit 1; }
