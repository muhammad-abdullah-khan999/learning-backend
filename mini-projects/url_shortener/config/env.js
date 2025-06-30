import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

export const env = z.object({
    PORT: z.coerce.number().default(3000),
    MONGODB_URI: z.string()
}).parse(process.env);
