"use client";

import React, { useState } from "react";
import { Container, Typography, Box, Grid, Card, CardContent, Divider, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, IconButton } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useCart } from "../../context/CartContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CartPage() {
    const { cartItems, removeFromCart, clearCart, cartTotal } = useCart();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Form State
    const [customerName, setCustomerName] = useState("");
    const [customerAddress, setCustomerAddress] = useState("");

    const handlePlaceOrder = async () => {
        if (!customerName.trim() || !customerAddress.trim()) {
            alert("Please fill in your name and address.");
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
                throw new Error(data.error || "Order failed");
            }

            alert("Order placed successfully!");
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
                <Typography variant="h4" gutterBottom>Your Cart is Empty</Typography>
                <Button component={Link} href="/" variant="contained" size="large" sx={{ mt: 2 }}>
                    Start Shopping
                </Button>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom fontWeight="bold" sx={{ mb: 4 }}>
                Shopping Cart
            </Typography>

            <Grid container spacing={4}>
                {/* Cart Items */}
                <Grid item xs={12} md={8}>
                    <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2 }}>
                        <Table>
                            <TableHead sx={{ bgcolor: 'grey.100' }}>
                                <TableRow>
                                    <TableCell>Product</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                    <TableCell align="center">Quantity</TableCell>
                                    <TableCell align="right">Total</TableCell>
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
                                        <TableCell align="center">{item.quantity}</TableCell>
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
                                Order Summary
                            </Typography>
                            <Box display="flex" justifyContent="space-between" mb={2}>
                                <Typography color="text.secondary">Subtotal</Typography>
                                <Typography fontWeight="bold">฿{cartTotal.toLocaleString()}</Typography>
                            </Box>
                            <Divider sx={{ my: 2 }} />

                            <Typography variant="h6" gutterBottom>Shipping Details</Typography>
                            <TextField
                                label="Full Name"
                                fullWidth
                                margin="normal"
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                            />
                            <TextField
                                label="Address"
                                fullWidth
                                margin="normal"
                                multiline
                                rows={3}
                                value={customerAddress}
                                onChange={(e) => setCustomerAddress(e.target.value)}
                            />

                            <Button
                                fullWidth
                                variant="contained"
                                size="large"
                                sx={{ mt: 3, py: 1.5, fontSize: '1.1rem' }}
                                onClick={handlePlaceOrder}
                                disabled={loading}
                            >
                                {loading ? "Processing..." : "Place Order"}
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}
