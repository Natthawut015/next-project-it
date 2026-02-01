"use client";

import React, { useState } from "react";
import { Container, Typography, Box, Grid, Card, CardContent, Divider, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, IconButton } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useCart } from "../../context/CartContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CartPage() {
    const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Form State
    const [customerName, setCustomerName] = useState("");
    const [customerAddress, setCustomerAddress] = useState("");

    const handlePlaceOrder = async () => {
        if (!customerName.trim() || !customerAddress.trim()) {
            alert("กรุณากรอกชื่อและที่อยู่จัดส่งให้ครบถ้วน");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    customerName,
                    customerAddress,
                    items: cartItems
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "เกิดข้อผิดพลาดในการสั่งซื้อ");
            }

            alert("สั่งซื้อสินค้าสำเร็จ!");
            clearCart();
            router.push("/");
        } catch (error: any) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
                <ShoppingBagIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h4" gutterBottom>ตะกร้าของคุณว่างเปล่า</Typography>
                <Button component={Link} href="/" variant="contained" size="large" sx={{ mt: 2, borderRadius: '25px', px: 4 }}>
                    ไปเลือกซื้อสินค้า
                </Button>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom fontWeight="bold" sx={{ mb: 4 }}>
                ตะกร้าสินค้า
            </Typography>

            <Grid container spacing={4}>
                {/* Cart Items */}
                <Grid item xs={12} md={8}>
                    <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>สินค้า</TableCell>
                                    <TableCell align="right">ราคา</TableCell>
                                    <TableCell align="center">จำนวน</TableCell>
                                    <TableCell align="right">รวม</TableCell>
                                    <TableCell align="center"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cartItems.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            <Box display="flex" alignItems="center">
                                                <Avatar
                                                    src={item.proImage || "https://placehold.co/100x100"}
                                                    variant="rounded"
                                                    sx={{ width: 64, height: 64, mr: 2 }}
                                                />
                                                <Typography fontWeight="medium">{item.proName}</Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell align="right">฿{item.proPrice.toLocaleString()}</TableCell>
                                        <TableCell align="center">
                                            <Box display="flex" alignItems="center" justifyContent="center">
                                                <IconButton
                                                    size="small"
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    disabled={item.quantity <= 1}
                                                    sx={{ border: '1px solid #ddd' }}
                                                >
                                                    <RemoveIcon fontSize="small" />
                                                </IconButton>
                                                <Typography sx={{ mx: 2, fontWeight: 'bold' }}>{item.quantity}</Typography>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    sx={{ border: '1px solid #ddd' }}
                                                >
                                                    <AddIcon fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        </TableCell>
                                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                                            ฿{(item.proPrice * item.quantity).toLocaleString()}
                                        </TableCell>
                                        <TableCell align="center">
                                            <IconButton color="error" onClick={() => removeFromCart(item.id)}>
                                                <DeleteOutlineIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

                {/* Checkout Form */}
                <Grid item xs={12} md={4}>
                    <Card elevation={3} sx={{ borderRadius: 2, position: 'sticky', top: 100 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom fontWeight="bold">
                                สรุปคำสั่งซื้อ
                            </Typography>
                            <Box display="flex" justifyContent="space-between" mb={2}>
                                <Typography color="text.secondary">ยอดรวมย่อย</Typography>
                                <Typography fontWeight="bold">฿{cartTotal.toLocaleString()}</Typography>
                            </Box>
                            <Divider sx={{ my: 2 }} />

                            <Typography variant="h6" gutterBottom>รายละเอียดการจัดส่ง</Typography>
                            <TextField
                                label="ชื่อ-นามสกุล"
                                fullWidth
                                margin="normal"
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                            />
                            <TextField
                                label="ที่อยู่สำหรับการจัดส่ง"
                                fullWidth
                                margin="normal"
                                multiline
                                rows={4}
                                value={customerAddress}
                                onChange={(e) => setCustomerAddress(e.target.value)}
                            />

                            <Button
                                fullWidth
                                variant="contained"
                                size="large"
                                sx={{ mt: 3, py: 1.5, fontSize: '1.1rem', borderRadius: '25px', background: 'linear-gradient(45deg, #2e7d32, #4caf50)' }}
                                onClick={handlePlaceOrder}
                                disabled={loading}
                            >
                                {loading ? "กำลังประมวลผล..." : "ยืนยันการสั่งซื้อ"}
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}
