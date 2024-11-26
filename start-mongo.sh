#!/bin/bash

if [ -f .env ]; then
    ENV_FILE=.env docker compose up
else
    echo "No .env file found, using .env.example"
    ENV_FILE=.env.example docker compose up -d
fi
