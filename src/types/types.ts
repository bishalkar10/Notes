import { Request } from "express"

export interface Environment {
    PORT: string | number;
    NODE_ENV: "development" | "production" | "test";
    MONGODB_URI: string;
    JWT_SECRET: string;
    CORS_ORIGIN: string;
    COOKIE_SECRET: string;
}

export interface AuthenticatedRequest extends Request {
    user: { id: string; username: string };
}