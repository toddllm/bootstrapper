#!/bin/bash

docker build -t backend -f backend/Dockerfile .
docker run -d -p 5000:5000 --name backend backend

docker build -t frontend -f frontend/Dockerfile .
docker run -d -p 3000:3000 --name frontend frontend

