import { auth } from "@/auth";
import { Order } from "@/models/Order";
import { User } from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
    const a = await auth();
    const user = await User.findOne({email: a?.user?.email}).select("_id")
     // Fetch orders and sort by creation date
     const orders = await Order.find({ user: user._id })
     .sort({ createdAt: -1 })
     .lean();

    return NextResponse.json({message: "Hello Sir", orders})    
}