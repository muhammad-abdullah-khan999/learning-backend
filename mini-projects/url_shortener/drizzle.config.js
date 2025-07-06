import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  schema: "./drizzle/schema.js",
  out: "./drizzle/migration",
  dialect: "mysql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});