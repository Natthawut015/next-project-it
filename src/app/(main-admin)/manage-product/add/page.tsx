"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Paper,
    Grid,
    Alert,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";

export default function AddProductPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        setMessage(null);

        const formData = new FormData(event.currentTarget);

        try {
            const response = await fetch("/api/products", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Something went wrong");
            }

            setMessage({ type: "success", text: "เพิ่มสินค้าเรียบร้อยแล้ว!" });
            // Reset form
            (event.target as HTMLFormElement).reset();
            // Optional: Redirect
            // router.push("/manage-product");
        } catch (error: any) {
            setMessage({ type: "error", text: error.message });
        } finally {
            setLoading(false);
        }
    }

    return (
        <Container maxWidth="md">
            <Box mb={3}>
                <Button
                    component={Link}
                    href="/manage-product"
                    startIcon={<ArrowBackIcon />}
                    sx={{ mb: 2 }}
                >
                    ย้อนกลับ
                </Button>
            </Box>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h5" component="h1" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
                    เพิ่มสินค้าใหม่
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
                                placeholder="เช่น P001"
                                autoFocus
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
                                placeholder="0.00"
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
                                placeholder="เช่น Wireless Mouse"
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
                                placeholder="รายละเอียดเพิ่มเติม..."
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                component="label"
                                variant="outlined"
                                startIcon={<CloudUploadIcon />}
                                sx={{ width: "100%", py: 2, borderStyle: 'dashed' }}
                            >
                                อัปโหลดรูปภาพสินค้า
                                <input
                                    type="file"
                                    id="proImage"
                                    name="proImage"
                                    accept="image/*"
                                    hidden
                                />
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 2, py: 1.5, fontSize: "1.1rem" }}
                                disabled={loading}
                            >
                                {loading ? "กำลังบันทึก..." : "บันทึกสินค้า"}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    );
}
