import mongoose from "mongoose";
import { environment } from "./environment";
import { logger } from "../utils/logger";

export const connectDB = async () => {
    try {
        await mongoose.connect(environment.MONGODB_URI);
        logger.info("MongoDB connected Successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
}