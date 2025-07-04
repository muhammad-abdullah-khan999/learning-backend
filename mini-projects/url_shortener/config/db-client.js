import mysql from 'mysql2/promise'
import { env } from './env.js'

export const db = await mysql.createConnection({
    host: env.DATABASE_HOST,
    user: env.DATABASE_USER,
    database: env.DATABASE_NAME,
    password: env.DATABASE_PASSWORD
})