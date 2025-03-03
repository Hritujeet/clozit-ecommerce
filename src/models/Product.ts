import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, enum: ["T-Shirts", "Hoodies", "Bottoms", "Winter Wear"], required: true },
    subCategory: { type: String, required: true },
    stock: { type: Number, required: true, default: 0 },
    rating: { type: Number, required: true, default: 0, max: 5 },
    image: { type: String, required: true },
    sizes: [{ type: String, enum: ["SM", "M", "L", "XL", "XXL"], required: true }],
    colors: [{ type: String, required: true }],
    reviews: [{ type: mongoose.Schema.ObjectId, ref: "Review" }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
export const Product = mongoose.models?.Product || mongoose.model("Product", productSchema);
