import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import 'dotenv/config';

const connection = await mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

export const db = drizzle(connection);