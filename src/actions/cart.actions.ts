"use server"
import {Cart, CartItem} from "@/models/Cart"
import {User} from "@/models/User"
import {connectDb} from "@/utils/db"
import {CartDataServer} from "@/utils/types"

export const addToCartServer = async (data: CartDataServer) => {
    try {
        await connectDb();

        // Find user model to get user id
        const user = await User.findOne({email: data.email});

        // Check if a cart exists for the current user. If it doesn't, create a new cart
        let cart = await Cart.findOne({user: user._id}).populate("items");
        if (!cart) {
            cart = new Cart({
                user: user._id,
                items: [],
                subtotal: 0
            });
            await cart.save();
        }

        // Check if the same product with the same variant exists in the cart
        const existingItem = await CartItem.findOne({
            cart: cart._id,
            product: data.productId,
            variant: {
                color: data.color,
                size: data.size
            }, // Ensures variant uniqueness
        });

        // If the product already exists as a cartItem, then increment its quantity. Otherwise, create a new item in our cart
        if (existingItem) {
            existingItem.quantity += 1;
            await existingItem.save();
        } else {
            const newCartItem = new CartItem({
                cart: cart._id,
                product: data.productId,
                variant: {
                    color: data.color,
                    size: data.size
                }, // Stores the variant
                quantity: 1,
            });
            await newCartItem.save();
            cart.items.push(newCartItem._id);
        }

        // Recalculate subtotal
        const updatedItems = await CartItem.find({cart: cart._id});
        cart.subtotal = updatedItems.reduce((sum, item) => sum + item.quantity * data.price, 0);

        // save the cart ta last to reflect all the changes in the database
        await cart.save();

        return {success: true};

    } catch (error) {
        console.error("Error in addToCartServer:", error);
        return {success: false, error: "Failed to add item to cart"};
    }
};

