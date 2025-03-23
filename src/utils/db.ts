import mongoose from "mongoose";

const DB_URI = process.env.DB_URI;

export const connectDb = async () => {
    try {
        if (mongoose.connection.readyState) {
            console.log("Already Connected");
            return;
        }

        mongoose.set("strictQuery", false); // Disable strict query mode
        mongoose.set("bufferCommands", false); // Prevent buffering

        await mongoose.connect(DB_URI);

        console.log("Database Connected Successfully");
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
    }
};

mongoose.connection.on("connected", () => console.log("MongoDB connected"));
mongoose.connection.on("error", (err) => console.log("MongoDB error:", err));
mongoose.connection.on("disconnected", () => console.log("MongoDB disconnected"));
