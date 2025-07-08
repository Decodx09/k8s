#!/bin/bash
echo "--- Starting load test. Press [Ctrl+C] to stop. ---"

while true; do
  curl -X POST \
    -H "Content-Type: application/json" \
    -d '{"name":"loadtest", "email":"test@example.com"}' \
    http://localhost:8080/user
  echo 
done