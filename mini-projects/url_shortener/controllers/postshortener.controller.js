import crypto from 'crypto'
import { getLinkByShortCode, loadLinks, saveLinks } from '../models/shortener.model.js';

export const getShortenerPage = async (req, res) => {
    try {
        const links = await loadLinks();
        return res.render("index", {links, host:req.get("host")})
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

        await saveLinks({url, shortCode});

        return res.redirect("/");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Invalid server error");
    }
};

export const redirectToShortLink = async (req, res) => {
    try {
        const { shortCode } = req.params;
        const link = await getLinkByShortCode(shortCode);

        if(!link) return res.redirect('/404')

        return res.redirect(link.url);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal server error");
    }
}