import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/utils/db";
import { Product } from "@/models/Product";

export async function GET(request: NextRequest, { params }: { params: { category: string } }) {
    const { category } = await (params);
    await connectDb();
    try {
        const products = await Product.find({ category }).sort({ createdAt: "desc" });
        return NextResponse.json({ products, category });
    } catch (e) {
        return NextResponse.json({ error: "Error fetching" }, { status: 500 });
    }
}
