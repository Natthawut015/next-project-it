import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import AdminLayoutClient from "./components/AdminLayoutClient";

const inter = Inter({ subsets: ["latin"] });
const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key";

export const metadata: Metadata = {
  title: "Admin Dashboard - IT Natthawut Shop",
  description: "Admin Management Panel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Admin Check
  const cookieStore = cookies();
  const token = cookieStore.get("auth_token");

  if (!token) {
    redirect("/login");
  }

  try {
    const decoded = jwt.verify(token.value, JWT_SECRET) as any;
    if (decoded.role !== "ADMIN") {
      redirect("/"); // Or a "Not Authorized" page
    }
  } catch (err) {
    redirect("/login");
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <AdminLayoutClient>
          {children}
        </AdminLayoutClient>
      </body>
    </html>
  );
}
