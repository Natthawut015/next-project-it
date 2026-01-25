import { NextResponse } from "next/server";
import prisma from "@/app/lib/db";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key";

export async function POST(request: Request) {
  try {
    // Check Authentication
    const cookieStore = cookies();
    const token = cookieStore.get("auth_token");

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token.value, JWT_SECRET) as any;
    if (decoded.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden: Admin only" }, { status: 403 });
    }

    const data = await request.formData();
    const proCode = data.get("proCode") as string;
    const proName = data.get("proName") as string;
    const proDetail = data.get("proDetail") as string;
    const proPriceStr = data.get("proPrice") as string;
    const file = data.get("proImage") as File | null;

    if (!proCode || !proName || !proPriceStr) {
      return NextResponse.json(
        { error: "Missing required fields (Code, Name, Price)" },
        { status: 400 }
      );
    }

    const proPrice = parseFloat(proPriceStr);
    if (isNaN(proPrice)) {
      return NextResponse.json(
        { error: "Invalid price format" },
        { status: 400 }
      );
    }

    let proImage = null;
    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = Date.now() + "_" + file.name.replaceAll(" ", "_");
      const uploadDir = path.join(process.cwd(), "public", "uploads");

      try {
        await mkdir(uploadDir, { recursive: true });
        await writeFile(path.join(uploadDir, filename), buffer);
        proImage = `/uploads/${filename}`;
      } catch (e) {
        console.error("Upload error:", e);
        return NextResponse.json({ error: "File upload failed" }, { status: 500 });
      }
    }

    const product = await prisma.product.create({
      data: {
        proCode,
        proName,
        proDetail,
        proPrice,
        proImage,
      },
    });

    return NextResponse.json({ success: true, product });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: "Product code already exists" }, { status: 400 });
    }
    console.error("Database error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
