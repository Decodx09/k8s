#!/bin/bash
echo "Building Docker images..."

# Build user service
cd user-service && docker build -t user-service:latest . && cd ..

# Build product service
cd product-service && docker build -t product-service:latest . && cd ..

# Build order service
cd order-service && docker build -t order-service:latest . && cd ..

# Build notification service
cd notification-service && docker build -t notification-service:latest . && cd ..

echo "All images built successfully!"