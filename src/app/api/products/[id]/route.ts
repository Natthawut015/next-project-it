import { NextResponse } from "next/server";
import prisma from "@/app/lib/db";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key";

// Helper to check admin auth
function asyncVerifyAdmin() {
    const cookieStore = cookies();
    const token = cookieStore.get("auth_token");

    if (!token) return false;

    try {
        const decoded = jwt.verify(token.value, JWT_SECRET) as any;
        return decoded.role === "ADMIN";
    } catch (err) {
        return false;
    }
}

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);
        if (isNaN(id)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

        const product = await prisma.product.findUnique({
            where: { id },
        });

        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        if (!asyncVerifyAdmin()) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const id = parseInt(params.id);
        if (isNaN(id)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

        const formData = await request.formData();
        const proCode = formData.get("proCode") as string;
        const proName = formData.get("proName") as string;
        const proDetail = formData.get("proDetail") as string;
        const proPriceStr = formData.get("proPrice") as string;

        const updateData: any = {
            proCode,
            proName,
            proDetail,
            proPrice: parseFloat(proPriceStr),
        };

        // Only update image if specific logic is handled (omitted for now as it needs file upload logic)
        // If you have image upload logic, add it here

        const updatedProduct = await prisma.product.update({
            where: { id },
            data: updateData,
        });

        return NextResponse.json({ success: true, product: updatedProduct });
    } catch (error) {
        console.error("Update error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        if (!asyncVerifyAdmin()) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const id = parseInt(params.id);
        if (isNaN(id)) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        await prisma.product.delete({
            where: { id },
        });

        return NextResponse.json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        console.error("Delete error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
