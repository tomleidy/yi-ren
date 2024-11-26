#!/usr/bin/env node
const app = require('./app.js');
const debug = require('debug')('yi-ren:server');
const https = require("https");
const http = require("http");
const fs = require('fs');

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

let server;

// Try to create HTTPS server, fall back to HTTP if certs not found
try {
    const options = {
        key: fs.readFileSync('https/localhost-key.pem'),
        cert: fs.readFileSync('https/localhost.pem')
    };
    server = https.createServer(options, app);
    console.log('Starting server in HTTPS mode');
} catch (err) {
    console.log('HTTPS certificates not found, falling back to HTTP');
    server = http.createServer(app);
    console.log('Starting server in HTTP mode');
}

// Listen on port, on all network interfaces
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

//  Normalize a port into a number, string, or false.
function normalizePort(value) {
    let port = parseInt(value, 10);
    if (isNaN(port)) return value;
    if (port >= 0) return port;
    return false;
}

// Event listener for HTTP server "error" event
function onError(error) {
    if (error.syscall !== 'listen') throw error;
    let bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
        default:
            throw error;
    }
}

// Event listener for HTTP server "listening" event
function onListening() {
    let addr = server.address();
    let bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    debug(`Listening on ${bind}`);
}
