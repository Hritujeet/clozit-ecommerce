import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.ObjectId, ref: "User" },
    items: [{ type: mongoose.Schema.ObjectId, ref: "CartItem" }],
    subtotal: { type: Number, default: 0 }
});

export const Cart = mongoose.models?.Cart || mongoose.model("Cart", cartSchema);
