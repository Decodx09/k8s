#!/bin/bash
echo "Deploying to Kubernetes..."

# Create namespace
kubectl apply -f k8s/namespace.yaml

# Deploy MySQL
kubectl apply -f k8s/

# Wait for MySQL to be ready
echo "Waiting for MySQL to be ready..."
kubectl wait --for=condition=ready pod -l app=mysql -n microservices --timeout=120s

# Deploy services
kubectl apply -f k8s/

echo "Deployment complete!"
echo "Access Prometheus at: http://localhost:30090"
echo "Access Grafana at: http://localhost:30300 (admin/admin)"

# Check deployment status
kubectl get pods -n microservices