import mongoose from "mongoose"
import {DB_URI} from "@/utils/types";

export const connectDb = async () => {
    try {
        if (mongoose.connections && mongoose.connections[0].readyState) {
            console.log("Already Connected")
            return
        }
        await mongoose.connect(DB_URI);
    } catch (error) {
        console.log(error)
    }
}
