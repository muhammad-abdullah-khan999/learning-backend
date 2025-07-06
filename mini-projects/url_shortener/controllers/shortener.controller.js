import crypto from 'crypto'
import { urls } from '../schema/url_schema.js';
// import { getLinkByShortCode, insertShortLink, loadLinks} from '../models/shortener.model.js';
import { getLinkByShortCode, insertShortLink, loadLinks} from '../services/shortener.services.js';


export const getShortenerPage = async (req, res) => {
    try {
        const links = await loadLinks();
        // const links = await urls.find()
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
        // const links = await loadLinks();
        const links = await getLinkByShortCode(finalShortCode)


        if (links) {
            return res.status(400).send('<h1>Short code already exists. Please enter another short code... <a href="/" >Go Back </a></h1>');
        }

        // await urls.create({url, shortCode})
        await insertShortLink({url, shortCode: finalShortCode})

        return res.redirect("/");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Invalid server error");
    }
};

export const redirectToShortLink = async (req, res) => {
    try {
        const { shortCode } = req.params;
        // const link = await urls.findOne({shortCode: shortCode})
        const link = await getLinkByShortCode(shortCode)

        if(!link) return res.redirect('/404')

        return res.redirect(link.url);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal server error");
    }
}