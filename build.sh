#!/bin/bash
echo "Building Docker images..."
cd user-service && docker build -t user-service:latest . && cd ..
cd product-service && docker build -t product-service:latest . && cd ..
cd order-service && docker build -t order-service:latest . && cd ..
echo "All images built successfully!"