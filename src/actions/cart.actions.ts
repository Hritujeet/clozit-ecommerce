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

export async function removeFromCartServer(data: CartDataServer) {
    try {
        await connectDb();

        // Find user model to get user id
        const user = await User.findOne({ email: data.email });

        // Check if a cart exists for the current user
        const cart = await Cart.findOne({ user: user._id }).populate("items");
        if (!cart) {
            return { success: false, error: "Cart not found" };
        }

        // Check if the same product with the same variant exists in the cart
        const existingItem = await CartItem.findOne({
            cart: cart._id,
            product: data.productId,
            variant: {
                color: data.color,
                size: data.size,
            }, // Ensures variant uniqueness
        });

        if (!existingItem) {
            return { success: false, error: "Item not found in cart" };
        }

        // If the product already exists as a cartItem, decrement its quantity
        if (existingItem.quantity > 1) {
            existingItem.quantity -= 1;
            await existingItem.save();
        } else {
            // If the quantity is 1, remove the item from the cart
            await CartItem.deleteOne({ _id: existingItem._id }); // Delete the CartItem
            cart.items = cart.items.filter(
                (item: any) => item._id.toString() !== existingItem._id.toString()
            ); // Remove the item from the cart's items array
        }

        // Recalculate subtotal
        const updatedItems = await CartItem.find({ cart: cart._id });
        cart.subtotal = updatedItems.reduce(
            (sum, item) => sum + item.quantity * data.price,
            0
        );

        // Save the cart to reflect all the changes in the database
        await cart.save();

        return { success: true };
    } catch (error) {
        console.error("Error in removeFromCartServer:", error);
        return { success: false, error: "Failed to remove item from cart" };
    }
}

export async function clearCartServer(email: string) {
    const user = await User.findOne({ email: email }).select("_id");
    const cart = await Cart.findOneAndDelete({ user: user._id });
    if (!cart) return;

    await cart.populate("items")
    await CartItem.deleteMany({cart: cart._id})
}
