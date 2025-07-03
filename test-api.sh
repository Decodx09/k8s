#!/bin/bash
echo "Testing APIs..."

# Port forward for testing
kubectl port-forward -n microservices svc/user-service 3001:3001 &
kubectl port-forward -n microservices svc/product-service 3002:3002 &
kubectl port-forward -n microservices svc/order-service 3003:3003 &
kubectl port-forward -n microservices svc/notification-service 3004:3004 &

sleep 5

echo "Creating a user..."
curl -X POST http://localhost:3001/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}'

echo -e "\n\nGetting products..."
curl http://localhost:3002/products

echo -e "\n\nCreating an order..."
curl -X POST http://localhost:3003/orders \
  -H "Content-Type: application/json" \
  -d '{"user_id": 1, "product_id": 1, "quantity": 2}'

echo -e "\n\nGetting notifications..."
curl http://localhost:3004/notifications

echo -e "\n\nTesting complete!"