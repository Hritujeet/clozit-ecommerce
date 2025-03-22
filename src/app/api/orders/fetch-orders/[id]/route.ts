import { Order } from "@/models/Order";
import { connectDb } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = params;
    await connectDb();

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ error: "Invalid Order ID", id });
    }

    const order = await Order.findById(id).populate("orderItems.product");
    if (!order) {
        return NextResponse.json({ error: "No Such Order Found", id });
    }
    return NextResponse.json({ message: "Order Fetched", order });
}
