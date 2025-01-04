import * as dotenv from "dotenv";
import { Environment } from "../types/types";
  
dotenv.config();
  
export const environment : Environment = {
    PORT: process.env.PORT || 3000,
    NODE_ENV: (process.env.NODE_ENV as "development" | "production" | "test") || "development",
    MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/notes-app",
    JWT_SECRET: process.env.JWT_SECRET as string,
    CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:5173",
    COOKIE_SECRET: process.env.COOKIE_SECRET as string,
}