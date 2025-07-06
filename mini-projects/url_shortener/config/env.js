import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

export const env = z.object({
    PORT: z.coerce.number().default(3000),
    // DATABASE_HOST: z.string(),
    // DATABASE_USER: z.string(),
    // DATABASE_NAME: z.string(),
    // DATABASE_PASSWORD: z.string()
}).parse(process.env);
