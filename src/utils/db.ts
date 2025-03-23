import mongoose from "mongoose";

export async function connectDb() {
    if (mongoose.connections && mongoose.connections[0].readyState) {
        return
    }
    await mongoose.connect(process.env.MONGO_URI);
}