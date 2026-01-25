"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, TextField, Typography, Alert, Paper, Grid } from "@mui/material";

interface Product {
    id: number;
    proCode: string;
    proName: string;
    proDetail: string | null;
    proPrice: number;
    proImage: string | null;
}

export default function EditProductForm({ product }: { product: Product }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        setMessage(null);

        const formData = new FormData(event.currentTarget);

        try {
            const response = await fetch(`/api/products/${product.id}`, {
                method: "PUT",
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Something went wrong");
            }

            setMessage({ type: "success", text: "แก้ไขข้อมูลสินค้าเรียบร้อยแล้ว!" });
            router.refresh(); // Refresh server data
            setTimeout(() => {
                router.push("/manage-product");
            }, 1000);
        } catch (error: any) {
            setMessage({ type: "error", text: error.message });
        } finally {
            setLoading(false);
        }
    }

    return (
        <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: "auto" }}>
            <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
                แก้ไขสินค้า: {product.proName}
            </Typography>

            {message && (
                <Alert severity={message.type} sx={{ mb: 3 }}>
                    {message.text}
                </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} noValidate>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="proCode"
                            label="รหัสสินค้า"
                            name="proCode"
                            defaultValue={product.proCode}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="proPrice"
                            label="ราคาสินค้า"
                            name="proPrice"
                            type="number"
                            defaultValue={product.proPrice}
                            inputProps={{ step: "0.01", min: "0" }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="proName"
                            label="ชื่อสินค้า"
                            name="proName"
                            defaultValue={product.proName}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="proDetail"
                            label="รายละเอียดสินค้า"
                            name="proDetail"
                            multiline
                            rows={4}
                            defaultValue={product.proDetail || ""}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 2, py: 1.5, fontSize: "1.1rem" }}
                            disabled={loading}
                        >
                            {loading ? "กำลังบันทึก..." : "บันทึกการแก้ไข"}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
}
