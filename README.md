# Quick Start

The caveat for this is that it uses .env.example with default usernames and passwords (available on GitHub!) so please be careful.

The number 89 is my least favorite number, and hopefully it will be yours too, and motivate you to update the .env. It's a prime number, but both digits are decidedly not prime (2^3 and 3^2). Hope this helps!

# Prerequisites:
- Node.js/npm
- mkcert
- Docker

# Ideal first step,

cp .env.example .env

# Edit .env to have your own desired username/password pairs
nano .env

# Install dependencies
npm install
cd server && npm install
cd ../client && npm install
cd ..

# Generate HTTPS certificates
sh generate-https-certs.sh

# Start MongoDB
sh start-mongo.sh

# Start the application
npm start