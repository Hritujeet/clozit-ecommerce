import { Order } from "@/models/Order";
import { User } from "@/models/User";
import { connectDb } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

// Consider using a schema validation library for payloads

export async function POST(request: NextRequest) {
    try {
        await connectDb();

        const { items, paymentMode, address, total, email, phoneNumber } = await request.json();

        // Early validation
        if (!items?.length || !email || !total) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Find user by indexed email, lean for performance
        const user = await User.findOne({ email }).select("_id").lean();
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Efficient transformation
        const orderItems = items.map(({ product, qty }: any) => ({
            product: product.id,
            color: product.color,
            size: product.size,
            quantity: qty,
        }));

        // Create order in one call
        const order = await Order.create({
            user: user._id,
            orderItems,
            isPayed: paymentMode !== "Cash On Delivery",
            paymentMode,
            total,
            shippingAddress: address,
            phoneNumber,
        });

        return NextResponse.json({ message: "Okay", orderId: order.id });
    } catch (error) {
        console.error("Order placement error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
