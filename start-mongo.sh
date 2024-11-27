#!/bin/sh

# Function to check if MongoDB is responding
check_mongo() {
    mongosh --quiet --eval "db.runCommand('ping').ok" >/dev/null 2>&1
}

# Function to check if container is running
check_container() {
    container_name="$1"
    docker ps --format '{{.Names}}' | grep -q "^${container_name}$"
}

# Determine which env file to use and set container name accordingly
if [ -f .env ]; then
    ENV_FILE=".env"
else
    echo "No .env file found, using .env.example"
    ENV_FILE=".env.example"
fi

source $ENV_FILE
# Start MongoDB container
docker compose --env-file $ENV_FILE up -d

# Wait for container to be running
echo "Waiting for container to start..."
max_attempts=30
attempt=1
while ! check_container "$CONTAINER_NAME"; do
    if [ $attempt -gt $max_attempts ]; then
        echo "Container failed to start after ${max_attempts} attempts"
        exit 1
    fi
    echo "Attempt $attempt: Container not yet running..."
    sleep 1
    attempt=$((attempt + 1))
done

# Wait for MongoDB to be responsive
echo "Waiting for MongoDB to be ready..."
attempt=1
while ! check_mongo; do
    if [ $attempt -gt $max_attempts ]; then
        echo "MongoDB failed to respond after ${max_attempts} attempts"
        exit 1
    fi
    echo "Attempt $attempt: MongoDB not yet responding..."
    sleep 1
    attempt=$((attempt + 1))
done

echo "MongoDB is up and running!"
