const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// Try to load .env first, fall back to .env.example if it exists
const envFile = fs.existsSync('.env') ? '.env' : '.env.example';
dotenv.config({ path: envFile });

if (envFile === '.env.example') {
    console.log('Using example environment configuration. Create a .env file for custom settings.');
}

module.exports = {
    'mongoUrl': process.env.SECRET_URL
}