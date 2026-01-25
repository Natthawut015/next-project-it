import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/app/lib/db";

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key";

export async function GET() {
    try {
        const cookieStore = cookies();
        const token = cookieStore.get("auth_token");

        if (!token) {
            return NextResponse.json({ user: null });
        }

        const decoded = jwt.verify(token.value, JWT_SECRET) as any;

        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: { id: true, name: true, email: true, role: true }
        });

        if (!user) {
            return NextResponse.json({ user: null });
        }

        return NextResponse.json({ user });
    } catch (error) {
        return NextResponse.json({ user: null });
    }
}
