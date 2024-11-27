#!/bin/sh

if [ ! -d "server/https" ]; then
    mkdir -p server/https
fi

if [ ! -f "server/https/localhost-key.pem" ]; then
    mkcert -install
    mkcert -key-file server/https/localhost-key.pem -cert-file server/https/localhost.pem localhost 127.0.0.1 ::1
    echo "Generated HTTPS certificates"
else
    echo "Certificates already exist"
fi
