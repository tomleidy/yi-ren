const http = require("http");
const path = require("path");
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

    if (req.method === 'GET') {
        let fileUrl = req.url;
        if (fileUrl === '/') {
            fileUrl = '/index.html';
        }

        const filePath = path.resolve('./public' + fileUrl);
        const fileExt = path.extname(filePath);

        if (fileExt === '.html') {
            fs.access(filePath, err => {
                if (err) return send_404(res, `${fileUrl.slice(1)} not found`);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                fs.createReadStream(filePath).pipe(res);
            });
        } else {
            return send_404(res, `${fileUrl} is not an HTML file`);
        }
    } else {
        return send_404(res, `${req.method} not supported`)
    }
    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/html');
    // res.end(log_line);
});

console.log(`Server listening at ${hostname}:${port} ...`)
server.listen(port, hostname);