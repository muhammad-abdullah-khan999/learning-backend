import express from "express";
import { readFile, writeFile, access } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const DATA_FILE = path.join(__dirname, "data", "links.json");

async function readData() {
  try {
    await access(DATA_FILE);
  } catch {
    await writeFile(DATA_FILE, JSON.stringify({}));
  }

  const data = await readFile(DATA_FILE, "utf-8");
  return JSON.parse(data);
}

async function writeData(data) {
  await writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

app.get("/", async (req, res) => {
  const file = await readFile(path.join(__dirname, "views", "index.html"), "utf-8");
  const data = await readData();

  const linksHtml = Object.entries(data).map(([shortCode, url]) => (`
    <li>
      <a href="/${shortCode}" target="_blank">${req.headers.host}/${shortCode}</a>
      <button class="copy-btn" onclick="navigator.clipboard.writeText('${req.headers.host}/${shortCode}')">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v16h14c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 18H8V7h11v16z"/>
        </svg>
      </button>
    </li>
  `)).join("");

  res.send(file.replace("{{ shortened_urls }}", linksHtml));
});

app.post("/shorten", async (req, res) => {
  const { url, shortCode } = req.body;

  if (!url || !shortCode) {
    return res.status(400).send("URL and shortCode are required.");
  }

  const data = await readData();

  if (data[shortCode]) {
    return res.status(400).send("Short code already exists.");
  }

  data[shortCode] = url;
  await writeData(data);
  res.redirect("/");
});

app.get("/:shortCode", async (req, res) => {
  const data = await readData();
  const url = data[req.params.shortCode];

  if (url) {
    res.redirect(url);
  } else {
    res.status(404).send("Short URL not found.");
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
