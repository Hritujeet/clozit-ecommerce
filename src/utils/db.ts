import mongoose from "mongoose";
import { DB_URI } from "./types";

export async function connectDb() {
    console.log(DB_URI);
    if (mongoose.connections && mongoose.connections[0].readyState) {
        return
    }
    await mongoose.connect(DB_URI);
}