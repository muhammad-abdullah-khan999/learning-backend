import { dbClient } from "../config/db-client.js";
import { env } from "../config/env.js";

const db = dbClient.db(env.MONGODB_DATABASE_NAME);
const shortenerCollection = db.collection("shorteners");

export const loadLinks = async () => {
    return shortenerCollection.find().toArray()
}

export const saveLinks = async (link) => {
    return shortenerCollection.insertOne(link)
}

export const getLinkByShortCode = async (shortcode) => {
    return await shortenerCollection.findOne({shortCode: shortcode})
}