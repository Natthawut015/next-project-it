import { NextResponse } from "next/server";
import prisma from "@/app/lib/db";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { customerName, customerAddress, items } = body;

        if (!customerName || !items || items.length === 0) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Calculate total and prepare order items
        let totalAmount = 0;
        const orderItemsData = [];

        for (const item of items) {
            const product = await prisma.product.findUnique({
                where: { id: item.id }
            });

            if (!product) {
                return NextResponse.json({ error: `Product not found: ${item.id}` }, { status: 400 });
            }

            totalAmount += product.proPrice * item.quantity;
            orderItemsData.push({
                productId: product.id,
                quantity: item.quantity,
                price: product.proPrice
            });
        }

        // Transaction to create order and items
        const order = await prisma.$transaction(async (tx) => {
            const newOrder = await tx.order.create({
                data: {
                    customerName,
                    customerAddress,
                    totalAmount,
                    status: 'PENDING',
                    items: {
                        create: orderItemsData
                    }
                },
                include: {
                    items: true
                }
            });
            return newOrder;
        });

        return NextResponse.json({ success: true, order });
    } catch (error) {
        console.error("Order error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
