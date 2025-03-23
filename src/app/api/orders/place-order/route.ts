import { Order } from "@/models/Order";
import { User } from "@/models/User";
import { connectDb } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

type OrderItem = {
    product: string;
    color: string;
    size: string;
    quantity: number;
};
type PayLoadItem = {
    product: {
        name: string;
        color: string;
        size: string;
        slug: string;
        price: number;
        id: string;
        phoneNumber: string;
    };
    qty: number;
};

export async function POST(request: NextRequest) {
    try {
        await connectDb(); // Connect to DB first to avoid delays later

        const { items, paymentMode, address, total, email, phoneNumber } = await request.json();
        
        // Validate request data
        if (!items || !email || !total) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const user = await User.findOne({ email }).select("_id");

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const parsedItems: OrderItem[] = items.map((element: PayLoadItem) => ({
            product: element.product.id,
            color: element.product.color,
            size: element.product.size,
            quantity: element.qty,
        }));

        const order = new Order({
            user: user._id, // Changed from `user.id` to `user._id` for consistency
            orderItems: parsedItems,
            isPayed: paymentMode !== "Cash On Delivery",
            paymentMode,
            total,
            shippingAddress: address,
            phoneNumber,
        });

        await order.save(); // Save to database

        return NextResponse.json({ message: "Okay", orderId: order.id });
    } catch (error) {
        console.error("Order placement error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
