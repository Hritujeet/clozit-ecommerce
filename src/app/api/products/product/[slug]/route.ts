import { Product } from "@/models/Product";
import { connectDb } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    const { slug } = await params;
    await connectDb();

    const product = await Product.findOne({ slug });
    if (!product) {
        return NextResponse.json({ error: "No Such Product Found" });
    }
    return NextResponse.json({ message:"Product Fetched" ,product });
}
