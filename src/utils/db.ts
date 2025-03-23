import mongoose from "mongoose";

const DB_URI = process.env.DB_URI; // Ensure you load env variables correctly

export const connectDb = async () => {
    try {
        if (mongoose.connection.readyState) {
            console.log("Already Connected");
            return;
        }
        mongoose.set("bufferCommands", false);
        await mongoose.connect(DB_URI);
        console.log("Database Connected Successfully");
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
    }
};
