const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const fs = require('fs')
const path = require('path')

async function main() {
    const sql = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf8')
    const statements = sql.split(';').filter(s => s.trim())

    console.log('Seeding via raw SQL...')
    for (const statement of statements) {
        try {
            await prisma.$executeRawUnsafe(statement)
        } catch (e) {
            console.error('Error executing statement:', statement)
            console.error(e)
        }
    }
    console.log('Done!')
}

main().finally(() => prisma.$disconnect())
