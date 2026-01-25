import prisma from "@/app/lib/db";
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
    Chip
} from "@mui/material";

export const dynamic = "force-dynamic";

export default async function ManageOrdersPage() {
    const orders = await prisma.order.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom fontWeight="bold">
                จัดการคำสั่งซื้อ
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="order table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                            <TableCell sx={{ fontWeight: "bold" }}>รหัสสั่งซื้อ</TableCell>
                            <TableCell>ชื่อลูกค้า</TableCell>
                            <TableCell>ยอดรวม</TableCell>
                            <TableCell>สถานะ</TableCell>
                            <TableCell>สถานะจัดส่ง</TableCell>
                            <TableCell>เลขติดตามพัสดุ</TableCell>
                            <TableCell>วันที่สั่งซื้อ</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order: any) => (
                            <TableRow
                                key={order.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {order.id}
                                </TableCell>
                                <TableCell>{order.customerName}</TableCell>
                                <TableCell>฿{order.totalAmount.toLocaleString()}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={order.status}
                                        color={order.status === "COMPLETED" ? "success" : "warning"}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={order.shippingStatus || "N/A"}
                                        color={order.shippingStatus === "DELIVERED" ? "success" : order.shippingStatus === "SHIPPED" ? "info" : "default"}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>{order.trackingNumber || "-"}</TableCell>
                                <TableCell>{order.createdAt.toLocaleDateString("th-TH")}</TableCell>
                            </TableRow>
                        ))}
                        {orders.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                                    ไม่พบข้อมูลคำสั่งซื้อ
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}
