import { Order } from "@/models/Order";
import { User } from "@/models/User";
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
    },
    qty: number;
};

export async function POST(request: NextRequest) {
    const { items, paymentMode, address, total, email } = await request.json();
    let parsedItems: OrderItem[] = [];
    
    const user = await User.findOne({email}).select("_id")    
    items.forEach((element: PayLoadItem) => {
        const orderItem: OrderItem = {
            product: element.product.id,
            color: element.product.color,
            size: element.product.size,
            quantity: element.qty,
        };
        parsedItems.push(orderItem)
    });

    const order = new Order({
        user: user.id,
        orderItems: parsedItems,
        isPayed: (paymentMode != "Cash On Delivery"),
        paymentMode: paymentMode,
        total: total,
        shippingAddress: address
    })

    await order.save();

    return NextResponse.json({ message: "Okay" });
}
