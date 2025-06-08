import { readFile } from 'fs/promises';
import { createServer } from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = 3000;

const serveFile = async (response, filePath, contentType) => {
    try {
        const data = await readFile(filePath)
        response.writeHead(200, { "Content-Type": contentType });
        response.end(data);
    } catch (error) {
        response.writeHead(404, { "Content-Type": contentType });
        response.end("404 page not found");
    }
}

const server = createServer(async (request, response) => {
    if (request.method === "GET") {
        if (request.url === "/") {
            const filePath = path.join(__dirname, "public", "index.html");
            return serveFile(response, filePath, "text/html")
        } else if (request.url === "/styles.css") {
            const filePath = path.join(__dirname, "public", "styles.css");
            return serveFile(response, filePath, "text/css")
        } else {
            response.writeHead(404, { "Content-Type": "text/html" });
            response.end("404 page not found");
        }
    } else {
        response.writeHead(405, { "Content-Type": "text/html" });
        response.end("Method not allowed");
    }
});

server.listen(port, () => {
    console.log(`Server Running on http://localhost:${port}`);
});
