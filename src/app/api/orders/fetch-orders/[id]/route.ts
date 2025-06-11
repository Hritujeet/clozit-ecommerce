// src/app/api/orders/fetch-orders/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectDb } from '@/utils/db';
import { Order } from '@/models/Order';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // Await the params in Next.js 15+
        const { id } = await params;
        
        await connectDb();

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { error: 'Invalid order ID' },
                { status: 400 }
            );
        }

        // Fetch the actual order from database
        const order = await Order.findById(id)
            .populate('orderItems.product')
            .populate('user', 'name email');
        
        if (!order) {
            return NextResponse.json(
                { error: 'Order not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ 
            message: 'Order fetched successfully',
            order 
        });

    } catch (error) {
        console.error('Error fetching order:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}