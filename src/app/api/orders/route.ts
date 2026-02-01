import { NextResponse } from "next/server";
import prisma from "@/app/lib/db";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { customerName, customerAddress, items } = body;

        if (!customerName || !items || items.length === 0) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Try to get userId from token
        let userId: number | null = null;
        try {
            const cookieStore = cookies();
            const token = cookieStore.get("auth_token");
            if (token) {
                const decoded = jwt.verify(token.value, JWT_SECRET) as any;
                userId = decoded.userId;
            }
        } catch (err) {
            console.error("Optional auth check for order failed:", err);
        }

        // Calculate total and prepare order items
        let totalAmount = 0;
        const orderItemsData: { productId: number; quantity: number; price: number }[] = [];

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
                    userId: userId,
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
