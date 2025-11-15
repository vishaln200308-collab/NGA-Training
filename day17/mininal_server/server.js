const http = require('http');
const url = require('url');

const PORT = 3000;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    
    switch (pathname) {
        case '/':
            res.statusCode = 200;
            res.end(`
                <html>
                <body>
                    <h1>Welcome to Node.js Server!</h1>
                    <p><a href="/">Home</a> | <a href="/about">About</a> | <a href="/contact">Contact</a></p>
                    <p>Welcome to our new Company</p>
                </body>
                </html>
            `);
            break;
            
        case '/about':
            res.statusCode = 200;
            res.end(`
                <html>
                <body>
                    <h1>About Page</h1>
                    <p><a href="/">Home</a> | <a href="/about">About</a> | <a href="/contact">Contact</a></p>
                    <p>This is a minimal prototype demonstrating Node.js HTTP capabilities.</p>
                </body>
                </html>
            `);
            break;
            
        case '/contact':
            res.statusCode = 200;
            res.end(`
                <html>
                <body>
                    <h1>Contact Page</h1>
                    <p><a href="/">Home</a> | <a href="/about">About</a> | <a href="/contact">Contact</a></p>
                    <h1>Contact Information</h1>
                    <p>Email: email@example.com</p>
                    <p>Phone No.: 9876543210</p>
                    <p>Address: India </p>
                </body>
                </html>
            `);
            break;
            
        default:
            res.statusCode = 404;
            res.end(`
                <html>
                <body>
                    <h1>404 - Page Not Found</h1>
                    <p><a href="/">Home</a> | <a href="/about">About</a> | <a href="/contact">Contact</a></p>
                    <p>The page you are looking for does not exist.</p>
                </body>
                </html>
            `);
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});