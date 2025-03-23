import mongoose from "mongoose";
import { DB_URI } from "./types";

export async function connectDb() {
    try {
        // Log the DB_URI for debugging (ensure not to log sensitive information in production)
        console.log("Connecting to database:", DB_URI);

        // Check if already connected
        if (mongoose.connection.readyState === 1) {
            console.log("Already connected to the database.");
            return;
        }

        // Connect to the database
        await mongoose.connect(DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Database connection established successfully.");
    } catch (error) {
        console.error("Database connection error:", error);
        throw new Error("Could not connect to the database");
    }
}