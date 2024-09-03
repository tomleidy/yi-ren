
// focus on refactoring with Express
const path = require("path");
//const createError = require("http-errors");
//const logger = require("morgan");
const http = require("http");
const fs = require("fs");


const hostname = 'localhost';
const port = 3000;

const iso_ts = () => new Date().toISOString();

const send_404 = (res, msg) => {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');
    res.end(`<html><body><h1>404 ${msg}</h1></body></html>`);
    return
}

const server = http.createServer((req, res) => {
    let log_line = `${iso_ts()} ${req.method} ${req.url}`
    console.log(log_line);


});

console.log(`Server listening at ${hostname}:${port} ...`)
server.listen(port, hostname);