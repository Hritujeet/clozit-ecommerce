import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.ObjectId, ref: "User" },
    products: [{
        product: { type: mongoose.Schema.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 } // Track quantity of each product
    }],
    subtotal: { type: Number, default: 0 }
});

export const Cart = mongoose.models?.Cart || mongoose.model("Cart", cartSchema)
