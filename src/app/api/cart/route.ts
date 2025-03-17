import {NextResponse} from "next/server";
import {auth} from "@/auth";
import {Cart} from "@/models/Cart";
import {User} from "@/models/User"
import {connectDb} from "@/utils/db";

type CartItemData = {
    product: {
        name: string
        color: string
        size: string
        slug: string
        price: number
        id: string
    }
    qty: number
}

export async function GET() {
    const userSession = await auth()
    await connectDb()

    const user = await User.findOne({username: userSession?.user?.name}).select("_id")

    const cart = await Cart.findOne({user: user.id})
        .populate({
            path: "items",
            populate: {
                path: "product", // Populate the 'product' field inside each item
            },
        });

    const data: CartItemData[] = []

    if (cart?.items) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        cart.items.forEach((e) => {
            const myCartItem: CartItemData = {
                product: {
                    name: e.product.productName,
                    color: e.variant.color,
                    size: e.variant.size,
                    slug: e.product.slug,
                    price: e.product.price,
                    id: e.product._id
                },
                qty: e.quantity,
            }
            data.push(myCartItem)
        })
        return NextResponse.json({message: "success", cart: data});
    }
    return NextResponse.json({message: "success", cart: undefined});
}