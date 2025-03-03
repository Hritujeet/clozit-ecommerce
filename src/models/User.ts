import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fName: { type: String },
    lName: { type: String },
    username: { type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true }, // Ensure uniqueness
    password: { type: String },
    cart: { type: mongoose.Schema.ObjectId, ref: "Cart" },
    orders: [{ type: mongoose.Schema.ObjectId, ref: "Order" }],
    reviews: [{ type: mongoose.Schema.ObjectId, ref: "Review" }], // Optional: Reference to reviews
    googleId: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }, // Fixed typo
});

export const User = mongoose.models?.User || mongoose.model("User", userSchema)

