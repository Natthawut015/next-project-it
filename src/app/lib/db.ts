import { PrismaClient } from "@prisma/client";
import path from "path";

const prismaClientSingleton = () => {
    // Force the database path to be absolute relative to process.cwd() on Vercel
    const dbPath = process.env.DATABASE_URL || `file:${path.join(process.cwd(), "prisma", "dev.db")}`;
    return new PrismaClient({
        datasources: {
            db: {
                url: dbPath,
            },
        },
    });
};

declare const globalThis: {
    prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma