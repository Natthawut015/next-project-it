import prisma from "@/app/lib/db";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import {
    Container,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    Box,
    Alert
} from "@mui/material";
import CancelOrderButton from "./CancelOrderButton";

export const dynamic = "force-dynamic";

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key";

export default async function UserOrdersPage() {
    const cookieStore = cookies();
    const token = cookieStore.get("auth_token");

    if (!token) {
        redirect("/login");
    }

    let userId: number | null = null;
    try {
        const decoded = jwt.verify(token.value, JWT_SECRET) as any;
        userId = decoded.id;
    } catch (err) {
        redirect("/login");
    }

    const orders = await prisma.order.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        include: {
            items: {
                include: {
                    product: true,
                },
            },
        },
    });

    const statusLabels: { [key: string]: string } = {
        PENDING: "รอดำเนินการ",
        COMPLETED: "สำเร็จ",
        CANCELLED: "ยกเลิก",
    };

    const shippingLabels: { [key: string]: string } = {
        PREPARING: "กำลังเตรียมสินค้า",
        SHIPPED: "จัดส่งแล้ว",
        DELIVERED: "ได้รับสินค้าแล้ว",
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom fontWeight="bold">
                คำสั่งซื้อของฉัน
            </Typography>

            {orders.length === 0 ? (
                <Alert severity="info">
                    คุณยังไม่มีคำสั่งซื้อ
                </Alert>
            ) : (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="my orders">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                                <TableCell sx={{ fontWeight: "bold" }}>รหัสสั่งซื้อ</TableCell>
                                <TableCell>วันที่สั่งซื้อ</TableCell>
                                <TableCell>ยอดรวม</TableCell>
                                <TableCell>สถานะคำสั่งซื้อ</TableCell>
                                <TableCell>สถานะจัดส่ง</TableCell>
                                <TableCell>เลขติดตามพัสดุ</TableCell>
                                <TableCell align="center">จัดการ</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order: any) => (
                                <TableRow
                                    key={order.id}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        #{order.id}
                                    </TableCell>
                                    <TableCell>
                                        {order.createdAt.toLocaleDateString("th-TH")}
                                    </TableCell>
                                    <TableCell>
                                        ฿{order.totalAmount.toLocaleString()}
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={statusLabels[order.status] || order.status}
                                            color={
                                                order.status === "COMPLETED"
                                                    ? "success"
                                                    : order.status === "CANCELLED"
                                                        ? "error"
                                                        : "warning"
                                            }
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={shippingLabels[order.shippingStatus] || order.shippingStatus}
                                            color={
                                                order.shippingStatus === "DELIVERED"
                                                    ? "success"
                                                    : order.shippingStatus === "SHIPPED"
                                                        ? "info"
                                                        : "default"
                                            }
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {order.trackingNumber || "-"}
                                    </TableCell>
                                    <TableCell align="center">
                                        <CancelOrderButton
                                            orderId={order.id}
                                            status={order.status}
                                            shippingStatus={order.shippingStatus}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    );
}
