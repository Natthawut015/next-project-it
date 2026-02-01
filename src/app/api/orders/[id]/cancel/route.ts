import { NextResponse } from "next/server";
import prisma from "@/app/lib/db";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key";

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);
        if (isNaN(id)) {
            return NextResponse.json({ error: "Invalid order ID" }, { status: 400 });
        }

        // Verify user
        const cookieStore = cookies();
        const token = cookieStore.get("auth_token");

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        let userId: number;
        try {
            const decoded = jwt.verify(token.value, JWT_SECRET) as any;
            userId = decoded.userId;
        } catch (err) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        // Find the order
        const order = await prisma.order.findUnique({
            where: { id },
        });

        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        // Check ownership
        if (order.userId !== userId) {
            return NextResponse.json({ error: "You don't have permission to cancel this order" }, { status: 403 });
        }

        // Check if order can be cancelled
        if (order.status === "CANCELLED") {
            return NextResponse.json({ error: "Order is already cancelled" }, { status: 400 });
        }

        if (order.shippingStatus === "SHIPPED" || order.shippingStatus === "DELIVERED") {
            return NextResponse.json({ error: "Cannot cancel order that has been shipped" }, { status: 400 });
        }

        // Cancel the order
        const updatedOrder = await prisma.order.update({
            where: { id },
            data: { status: "CANCELLED" },
        });

        return NextResponse.json({
            success: true,
            message: "Order cancelled successfully",
            order: updatedOrder
        });
    } catch (error) {
        console.error("Cancel order error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
