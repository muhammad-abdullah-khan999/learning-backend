import express from "express";
import { readFile, writeFile } from "fs/promises";
import crypto from "crypto";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = 3000;

const dataDir = path.join(__dirname, "data");
const DATA_FILE = path.join(dataDir, "links.json");
const HTML_FILE = path.join(__dirname, "views", "index.html");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));

const loadLinks = async () => {
    try {
        const data = await readFile(DATA_FILE, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        if (error.code === "ENOENT") {
            try {
                await writeFile(DATA_FILE, JSON.stringify({}));
                return {};
            } catch (innerError) {
                if (innerError.code === "ENOENT") {
                    await writeFile(path.join(__dirname, "data", ".keep"), "");
                    await writeFile(DATA_FILE, JSON.stringify({}));
                    return {};
                }
                throw innerError;
            }
        }
        throw error;
    }
};

const saveLinks = async (links) => {
    await writeFile(DATA_FILE, JSON.stringify(links, null, 2));
};

app.get("/", async (req, res) => {
    try {
        const file = await readFile(HTML_FILE, "utf-8");
        const links = await loadLinks();

        const content = file.replace("{{ shortened_urls }}",
            Object.entries(links)
                .map(([shortCode, url]) =>
                    `<li><a href="/${shortCode}" target="_blank">${req.get("host")}/${shortCode}</a> — ${url}</li>`
                )
                .join("")
        );

        res.send(content);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/", async (req, res) => {
    try {
        const { url, shortCode } = req.body;
        const links = await loadLinks();
        const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");

        if (links[finalShortCode]) {
            return res.status(400).send("shortCode already exists. Please enter another one.");
        }

        links[finalShortCode] = url;
        await saveLinks(links);

        res.redirect("/");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/:shortCode", async (req, res) => {
    try {
        const { shortCode } = req.params;
        const links = await loadLinks();

        if (!links[shortCode]) {
            return res.status(404).send("404 - Short URL not found");
        }

        res.redirect(links[shortCode]);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
