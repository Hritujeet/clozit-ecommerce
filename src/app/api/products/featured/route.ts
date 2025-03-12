import { Product } from "@/models/Product";
import { connectDb } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    await connectDb();
    const randomProducts = await Product.aggregate([{ $sample: { size: 4 } }]);

    return NextResponse.json({ products: randomProducts });
}
