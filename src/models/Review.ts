import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    rating: {type: Number, required: true, default: 0, max: 5},
    user: { type: mongoose.Schema.ObjectId, ref: "User"},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

export const Review = mongoose.models?.Review || mongoose.model("Review", reviewSchema);
