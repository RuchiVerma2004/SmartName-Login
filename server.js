const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '0.0.0.0';
const port = 8080;

const server = http.createServer((req, res) => {
    console.log(`Request for ${req.url} received.`);

    // Serve index.html
    if (req.url === '/' || req.url === '/index.html') {
        const indexPath = path.join(__dirname, 'public/index.html');
        fs.readFile(indexPath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('500 - Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    }
    // Serve style.css
    else if (req.url === '/style.css') {
        const cssPath = path.join(__dirname, 'public/style.css');
        fs.readFile(cssPath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('500 - Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/css' });
                res.end(data);
            }
        });
    }
    // Serve script.js
    else if (req.url === '/script.js') {
        const scriptPath = path.join(__dirname, 'public/script.js');
        fs.readFile(scriptPath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('500 - Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/javascript' });
                res.end(data);
            }
        });
    }


    // Handle 404 - Not Found
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 - Not Found');
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
