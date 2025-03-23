import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.ObjectId, ref: "User" },
    orderItems: [
        {
            product: { type: mongoose.Schema.ObjectId, ref: "Product" },
            color: String,
            size: String,
            quantity: { type: Number, default: 1 }, // Track quantity of each product
        },
    ],
    isPayed: { type: Boolean, default: false },
    status: {
        type: String,
        enum: ["Order Placed", "Shipped", "Out for Delivery", "Delivered"],
        default: "Order Placed",
    },
    paymentMode: {
        type: String,
        enum: ["Cash On Delivery", "Card", "Net Banking"],
    },
    total: { type: Number, default: 0 },
    phoneNumber: {type: String, required: true},
    shippingAddress: { type: String }, // Add shipping address
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }, // Fixed typo
    deliveryDate: { 
        type: Date, 
        default: () => new Date(Date.now() + 5 * 24 * 60 * 60 * 1000) 
      }      
});

export const Order =
    mongoose.models?.Order || mongoose.model("Order", orderSchema);
