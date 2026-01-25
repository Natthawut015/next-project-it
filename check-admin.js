const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const admins = await prisma.user.findMany({
            where: { role: 'ADMIN' },
            select: { email: true, role: true, name: true }
        });
        console.log('Admins found:', admins);
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
