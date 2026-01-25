
import prisma from "@/app/lib/db";
import Link from "next/link";
import { Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box } from "@mui/material";
import DeleteButton from "./components/DeleteButton"; // We will create this client component

export const dynamic = 'force-dynamic';

export default async function AdminProductListPage() {
    const products = await prisma.product.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" component="h1" fontWeight="bold">
                    Product Management
                </Typography>
                <Button
                    component={Link}
                    href="/manage-product/add"
                    variant="contained"
                    color="primary"
                >
                    + Add New Product
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="product table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                            <TableCell sx={{ fontWeight: "bold" }}>รหัสสินค้า</TableCell>
                            <TableCell>ชื่อสินค้า</TableCell>
                            <TableCell>ราคาสินค้า</TableCell>
                            <TableCell>สร้างเมื่อ</TableCell>
                            <TableCell align="right">จัดการ</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product: any) => (
                            <TableRow
                                key={product.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {product.proCode}
                                </TableCell>
                                <TableCell>{product.proName}</TableCell>
                                <TableCell>฿{product.proPrice.toLocaleString()}</TableCell>
                                <TableCell>{product.createdAt.toLocaleDateString()}</TableCell>
                                <TableCell align="right">
                                    <Button
                                        component={Link}
                                        href={`/manage-product/${product.id}`}
                                        variant="outlined"
                                        size="small"
                                        sx={{ mr: 1 }}
                                    >
                                        Edit
                                    </Button>
                                    <DeleteButton id={product.id} />
                                </TableCell>
                            </TableRow>
                        ))}
                        {products.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                                    No products found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}
