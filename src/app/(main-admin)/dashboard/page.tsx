import prisma from "@/app/lib/db";
import { Card, CardContent, Grid, Typography } from "@mui/material";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const productCount = await prisma.product.count();
  // Placeholder for orders until Order model is fully populated/used
  // const orderCount = await prisma.order.count(); 
  const orderCount = 0;

  const stats = [
    { title: "Total Products", value: productCount, color: "#1976d2" },
    { title: "Total Orders", value: orderCount, color: "#2e7d32" },
    { title: "Revenue", value: "฿0.00", color: "#ed6c02" },
  ];

  return (
    <div>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Dashboard Overview
      </Typography>
      <Grid container spacing={3}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={4} key={stat.title}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  {stat.title}
                </Typography>
                <Typography variant="h3" component="div" sx={{ color: stat.color, fontWeight: "bold" }}>
                  {stat.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}