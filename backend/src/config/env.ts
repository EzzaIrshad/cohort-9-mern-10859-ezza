import dotenv from 'dotenv'
import type { StringValue } from "ms";

dotenv.config();

export const env = {
    PORT: process.env.PORT!,
    MONGODB_URI: process.env.MONGODB_URI!,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET!,
    JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN! as StringValue,
}