import React from "react";
import { Container, Typography, Box } from "@mui/material";
import prisma from "@/app/lib/db";
import ProductList from "./components/ProductList";

export const dynamic = 'force-dynamic';

async function getProducts() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
  return products;
}

export default async function Home() {
  const products = await getProducts();

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom fontWeight="800" sx={{ background: 'linear-gradient(45deg, #1e88e5, #5e35b1)', backgroundClip: 'text', textFillColor: 'transparent', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          ยินดีต้อนรับสู่ร้าน IT Natthawut
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          อุปกรณ์ไอทีคุณภาพสำหรับทุกรูปแบบการใช้งาน
        </Typography>
      </Box>

      <ProductList products={products} />
    </Container>
  );
}