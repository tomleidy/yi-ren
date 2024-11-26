const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// Look for .env files one directory up (project root)
const rootDir = path.join(__dirname, '..');
const envFile = fs.existsSync(path.join(rootDir, '.env')) ? '.env' : '.env.example';
dotenv.config({ path: path.join(rootDir, envFile) });

if (envFile === '.env.example') {
    console.log('Using example environment configuration. Create a .env file for custom settings.');
}

module.exports = {
    'mongoUrl': process.env.SECRET_URL
}