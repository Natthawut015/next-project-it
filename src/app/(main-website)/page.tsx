import React from "react";
import { Container, Typography, Box, Grid } from "@mui/material";
import prisma from "@/app/lib/db";
import ProductList from "./components/ProductList";
import CategoryListWrapper from "./components/CategoryListWrapper";

export const dynamic = 'force-dynamic';

async function getProducts(category?: string) {
  try {
    if (category) {
      return await prisma.product.findMany({
        where: {
          proCategory: category
        } as any,
        orderBy: {
          createdAt: 'desc'
        }
      });
    }
    return await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
  } catch (error) {
    console.error("Prisma error in getProducts:", error);
    return [];
  }
}

export default async function Home({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  let products: any[] = [];
  try {
    const selectedCategory = searchParams.category || "";
    products = await getProducts(selectedCategory);
    if (!Array.isArray(products)) products = [];
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }

  const selectedCategory = searchParams.category || "";

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          fontWeight="900"
          sx={{
            color: '#2e7d32', // Matches our green header
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          ร้าน IT Natthawut
        </Typography>
        <Typography variant="h5" color="text.secondary">
          แหล่งรวมอุปกรณ์ไอทีครบวงจร คุณภาพดี ราคาเป็นกันเอง
        </Typography>
      </Box>


      <Grid container spacing={4}>
        <Grid item xs={12} md={3} lg={2}>
          <CategoryListWrapper initialCategory={selectedCategory} />
        </Grid>
        <Grid item xs={12} md={9} lg={10}>
          <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h5" fontWeight="bold">
              {selectedCategory || "สินค้าทั้งหมด"} ({products.length})
            </Typography>
          </Box>
          <ProductList products={products} />
        </Grid>
      </Grid>
    </Container>
  );
}