import mongoose from "mongoose";
import { DB_URI } from "./types";

export async function connectDb() {
    try {
        console.log("Connecting to database:", DB_URI);

        if (mongoose.connection.readyState === 1) {
            return;
        }
        await mongoose.connect(DB_URI);

    } catch (error) {
        console.error("Database connection error:", error);
    }
}