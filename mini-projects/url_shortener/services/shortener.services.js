import { eq } from 'drizzle-orm';
import { db } from '../config/db.js';
import { shortLink } from '../drizzle/schema.js';

export const loadLinks = async () => {
  return await db.select().from(shortLink);
}

export const getLinkByShortCode = async (shortcode) => {
  const result = await db
    .select()
    .from(shortLink)
    .where(eq(shortLink.shortCode, shortcode));

  return result[0] || null;
}

export const insertShortLink = async ({ url, shortCode }) => {
  return await db
    .insert(shortLink)
    .values({ url, shortCode });
}
