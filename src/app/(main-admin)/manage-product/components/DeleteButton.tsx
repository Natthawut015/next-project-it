"use client";

import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteButton({ id }: { id: number }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this product?")) return;

        setLoading(true);
        try {
            const res = await fetch(`/api/products/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to delete");
            }

            // Refresh to update the list
            router.refresh();
        } catch (error) {
            alert(error instanceof Error ? error.message : "Failed to delete");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            variant="outlined"
            color="error"
            size="small"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
            disabled={loading}
        >
            {loading ? "Deleting..." : "Delete"}
        </Button>
    );
}
