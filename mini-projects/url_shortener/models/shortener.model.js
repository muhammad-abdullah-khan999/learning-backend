import { readFile, writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = path.resolve(__dirname, '..');
const DATA_FILE = path.join(baseDir, 'data', 'links.json');

export const loadLinks = async () => {
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

export const saveLinks = async (links) => {
    await writeFile(DATA_FILE, JSON.stringify(links, null, 2)); 
};