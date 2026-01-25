"use client";

import { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useRouter } from "next/navigation";

interface CancelOrderButtonProps {
    orderId: number;
    status: string;
    shippingStatus: string;
}

export default function CancelOrderButton({ orderId, status, shippingStatus }: CancelOrderButtonProps) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Disable if already cancelled/completed or shipped/delivered
    const isDisabled =
        status === "CANCELLED" ||
        status === "COMPLETED" ||
        shippingStatus === "SHIPPED" ||
        shippingStatus === "DELIVERED";

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleCancel = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/orders/${orderId}/cancel`, {
                method: "PATCH",
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.error || "เกิดข้อผิดพลาด");
            } else {
                alert("ยกเลิกคำสั่งซื้อเรียบร้อยแล้ว");
                router.refresh();
            }
        } catch (error) {
            alert("เกิดข้อผิดพลาดในการยกเลิก");
        } finally {
            setLoading(false);
            handleClose();
        }
    };

    if (isDisabled) {
        return null; // Don't show button if can't cancel
    }

    return (
        <>
            <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={handleOpen}
                disabled={loading}
            >
                ยกเลิก
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>ยืนยันการยกเลิก</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        คุณต้องการยกเลิกคำสั่งซื้อ #{orderId} ใช่หรือไม่?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} disabled={loading}>
                        ไม่
                    </Button>
                    <Button onClick={handleCancel} color="error" disabled={loading}>
                        {loading ? "กำลังยกเลิก..." : "ใช่ ยกเลิก"}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
