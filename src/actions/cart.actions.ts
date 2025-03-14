"use server"

import { Cart } from "@/models/Cart"
import { User } from "@/models/User"
import { connectDb } from "@/utils/db"

export const addToCartServer = async (email: string)=>{
    // Get cart data here and manage cart oprations of adding an item here. If cart is not there, create one. Else, simply update the existing
    await connectDb()

    const user = await User.find({email});
    console.log(user);
}

export const clearCartServer = async (cartId: string) => {
    await connectDb()
    await Cart.findByIdAndDelete(cartId);
}

export const removeFromCartServer = async () => {
    // Fetch Product Id remove the product from cart here
}
