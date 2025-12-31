#!/bin/bash

echo "=== Building Docker Images ==="

echo "1. Building backend image..."
cd backend
docker build -t ashutosh9110/task-management-backend:latest .
cd ..

echo "2. Building frontend image..."
cd frontend
docker build -t ashutosh9110/task-management-frontend:latest .
cd ..

echo "=== Pushing to Docker Hub ==="

echo "3. Pushing backend image..."
docker push ashutosh9110/task-management-backend:latest

echo "4. Pushing frontend image..."
docker push ashutosh9110/task-management-frontend:latest

echo "=== Done! ==="
echo "Images available at:"
echo "- ashutosh9110/task-management-backend:latest"
echo "- ashutosh9110/task-management-frontend:latest"