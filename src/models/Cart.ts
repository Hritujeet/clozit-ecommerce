import mongoose from "mongoose";

// Define CartItem Schema first
const cartItemSchema = new mongoose.Schema({
    cart: { type: mongoose.Schema.ObjectId, ref: "Cart" },
    product: { type: mongoose.Schema.ObjectId, ref: "Product" },
    variant: {
        color: String,
        size: String
    },
    quantity: { type: Number, default: 1 },
});

// Register CartItem model
const CartItem = mongoose.models?.CartItem || mongoose.model("CartItem", cartItemSchema);

// Define Cart Schema after CartItem
const cartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.ObjectId, ref: "User" },
    items: [{ type: mongoose.Schema.ObjectId, ref: "CartItem" }],
    subtotal: { type: Number, default: 0 }
});

// Add a pre-delete hook to the Cart schema
cartSchema.pre("deleteOne", { document: true, query: false }, async function (next) {
    const cart = this;

    try {
        // Delete all CartItem documents associated with this Cart
        await CartItem.deleteMany({ cart: cart._id });
        next();
    } catch (error) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        next(error);
    }
});

// Register Cart model
const Cart = mongoose.models?.Cart || mongoose.model("Cart", cartSchema);

export { Cart, CartItem };