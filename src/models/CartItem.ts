import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    cart: {type: mongoose.Schema.ObjectId, ref: "Cart"},
    product: {type: mongoose.Schema.ObjectId, ref: "Product"},
    variant: {
        color: String,
        size: String
    }, // Stores variant ID or details
    quantity: {type: Number, default: 1},
});

export const CartItem = mongoose.models?.CartItem || mongoose.model("CartItem", cartItemSchema);
