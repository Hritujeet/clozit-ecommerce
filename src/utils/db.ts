import mongoose from "mongoose";
import { DB_URI } from "./types";

let cached = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectDb() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(DB_URI).then(mongoose => {
            console.log("Database connected");
            return mongoose;
        }).catch(err => {
            console.error("Database connection error:", err);
            throw err;
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}
