const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const product = await prisma.product.upsert({
            where: { proCode: 'TEST001' },
            update: {},
            create: {
                proCode: 'TEST001',
                proName: 'Test Notebook',
                proDetail: 'High performance notebook',
                proPrice: 25000,
                proImage: 'https://placehold.co/600x400'
            },
        });
        console.log('Seeded product:', product);
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
