import crypto from 'crypto'
import { readFile} from 'fs/promises';
import { loadLinks, saveLinks } from '../models/shortener.model.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = path.resolve(__dirname, '..');

const VIEWS_DIR = path.join(baseDir, 'views');

export const getShortenerPage = async (req, res) => {
    try {
        const file = await readFile(path.join(VIEWS_DIR, "index.html"));
        const links = await loadLinks();
        const content = file.toString().replaceAll("{{ shortened_urls }}",
            Object.entries(links).map(([shortCode, url]) => {
                return `
                    <li>
                        <a href="/${shortCode}" target="_blank">${req.get("host")}/${shortCode}</a>
                        <button class="copy-btn" onclick="navigator.clipboard.writeText('${req.get("host")}/${shortCode}')">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v16h14c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 18H8V7h11v16z"/>
                            </svg>
                        </button>
                    </li>
                `;
            }).join("")
        );
        return res.send(content);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal server error");
    }
}

export const postURLShortener = async (req, res) => {
    try {
        const { url, shortCode } = req.body;
        const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");
        const links = await loadLinks();

        if (links[finalShortCode]) {
            return res.status(400).send("Short code already exists. Please enter another short code.");
        }

        links[finalShortCode] = url;
        await saveLinks(links);

        return res.redirect("/");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Invalid server error");
    }
};

export const redirectToShortLink = async (req, res) => {
    try {
        const { shortCode } = req.params;
        const links = await loadLinks();

        if (!links[shortCode]) return res.status(404).send("404 error occurred");

        return res.redirect(links[shortCode]);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal server error");
    }
}