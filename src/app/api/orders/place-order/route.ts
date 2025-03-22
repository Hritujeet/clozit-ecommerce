import { NextRequest, NextResponse } from "next/server";
import { CartDataServer } from "@/utils/types";

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
    },
    qty: number;
};

export async function POST(request: NextRequest) {
    const { items, paymentMode, address, total } = await request.json();
    let parsedItems: OrderItem[] = [];

    items.forEach((element: PayLoadItem) => {
        const orderItem: OrderItem = {
            product: element.product.id,
            color: element.product.color,
            size: element.product.size,
            quantity: element.qty,
        };
        parsedItems.push(orderItem)
    });
    console.log(parsedItems)

    return NextResponse.json({ message: "Okay" });
}
