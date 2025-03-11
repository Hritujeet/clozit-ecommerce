import {NextRequest, NextResponse} from "next/server";
import {connectDb} from "@/utils/db";
import {Product} from "@/models/Product";

export async function GET(request: NextRequest) {
    await connectDb()
    const allProducts = await Product.find({}).sort("desc");
    return NextResponse.json({products: allProducts})
}