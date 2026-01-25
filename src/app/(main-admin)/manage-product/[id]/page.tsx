import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";
import { Container, Button, Box } from "@mui/material";
import Link from "next/link";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditProductForm from "../components/EditProductForm";

export default async function EditProductPage({ params }: { params: { id: string } }) {
    const id = parseInt(params.id);

    if (isNaN(id)) {
        return notFound();
    }

    const product = await prisma.product.findUnique({
        where: { id },
    });

    if (!product) {
        return notFound();
    }

    return (
        <Container maxWidth="lg">
            <Box mb={3}>
                <Button
                    component={Link}
                    href="/manage-product"
                    startIcon={<ArrowBackIcon />}
                    sx={{ mb: 2 }}
                >
                    Back to List
                </Button>
            </Box>
            <EditProductForm product={product} />
        </Container>
    );
}
