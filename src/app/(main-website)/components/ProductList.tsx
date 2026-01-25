"use client";

import React from "react";
import { Grid, Card, CardMedia, CardContent, Typography, CardActions, Button, Box, Chip } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useCart } from "../../context/CartContext";

export default function ProductList({ products }: { products: any[] }) {
    const { addToCart } = useCart();

    return (
        <Box sx={{ flexGrow: 1, py: 4 }}>
            <Grid container spacing={4}>
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Card
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: '0.3s',
                                borderRadius: 2,
                                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: '0 12px 24px rgba(0,0,0,0.1)'
                                }
                            }}
                        >
                            <CardMedia
                                component="img"
                                height="200"
                                image={product.proImage || "https://placehold.co/600x400?text=No+Image"}
                                alt={product.proName}
                                sx={{ objectFit: 'cover' }}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h6" component="h2" fontWeight="bold" noWrap>
                                    {product.proName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, height: '40px', overflow: 'hidden' }}>
                                    {product.proDetail || "No description available."}
                                </Typography>

                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Typography variant="h6" color="primary" fontWeight="bold">
                                        ฿{product.proPrice.toLocaleString()}
                                    </Typography>
                                    {product.proCode && <Chip label={product.proCode} size="small" variant="outlined" />}
                                </Box>
                            </CardContent>
                            <CardActions sx={{ p: 2, pt: 0 }}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    startIcon={<AddShoppingCartIcon />}
                                    onClick={() => addToCart({
                                        id: product.id,
                                        proName: product.proName,
                                        proPrice: product.proPrice,
                                        proImage: product.proImage
                                    })}
                                    sx={{
                                        borderRadius: '8px',
                                        textTransform: 'none',
                                        fontWeight: 600,
                                        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)'
                                    }}
                                >
                                    Add to Cart
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
