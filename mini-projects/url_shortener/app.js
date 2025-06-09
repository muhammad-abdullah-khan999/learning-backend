import { readFile, writeFile, mkdir } from 'fs/promises';
import { createServer } from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = 3000;
const DATA_FILE = path.join(__dirname, "data", "links.json");

const serveFile = async (response, filePath, contentType) => {
    try {
        const data = await readFile(filePath);
        response.writeHead(200, { "Content-Type": contentType });
        response.end(data);
    } catch (error) {
        response.writeHead(404, { "Content-Type": contentType });
        response.end("404 page not found");
    }
};

const loadLinks = async () => {
    try {
        const data = await readFile(DATA_FILE, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            await mkdir(path.dirname(DATA_FILE), { recursive: true });
            await writeFile(DATA_FILE, JSON.stringify({}));
            return {};
        }
        throw error;
    }
};

const saveLinks = async (links) => {
    await writeFile(DATA_FILE, JSON.stringify(links, null, 2)); 
};

const server = createServer(async (request, response) => {
    if (request.method === "GET") {
        if (request.url === "/") {
            const filePath = path.join(__dirname, "public", "index.html");
            return serveFile(response, filePath, "text/html");
        } else if (request.url === "/styles.css") {
            const filePath = path.join(__dirname, "public", "styles.css");
            return serveFile(response, filePath, "text/css");
        } else if (request.url === "/links" || request.url === "/links.json") {
            const links = await loadLinks();
            response.writeHead(200, { "Content-Type": "application/json" })
            return response.end(JSON.stringify(links))
        } else {
            const links = await loadLinks()
            const shortCode = request.url.slice(1);
            if(links[shortCode]){
                response.writeHead(302, {location: links[shortCode]})
                return response.end()
            }

            response.writeHead(404, { "Content-Type": "text/plain" });
            return response.end("Shortened URL is not found");
        }
    } else if (request.method === "POST" && request.url === '/shorten') {
        const links = await loadLinks();

        let body = '';
        request.on('data', (chunk) => (body += chunk)); 
        request.on('end', async () => {
            const { url, shortCode } = JSON.parse(body);

            if (!url) {
                response.writeHead(400, { "Content-Type": "text/html" });
                return response.end("url is required");
            }

            const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");

            if (links[finalShortCode]) {
                response.writeHead(400, { "Content-Type": "text/plain" });
                return response.end("shortCode already exists. Please enter another shortCode");
            }

            links[finalShortCode] = url;
            await saveLinks(links);

            response.writeHead(200, { "Content-Type": "application/json" });
            response.end(JSON.stringify({ success: true, finalShortCode }));
        });
    } else {
        response.writeHead(405, { "Content-Type": "text/html" });
        response.end("Method not allowed");
    }
});

server.listen(port, () => {
    console.log(`Server Running on http://localhost:${port}`);
});
