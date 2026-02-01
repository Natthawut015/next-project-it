const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('Updating all product category images...')

  const updates = [
    { category: 'ชุดระบายความร้อน', image: '/products/cooling.jpg' },
    { category: 'เคส', image: '/products/case.jpg' },
    { category: 'พาวเวอร์ซัพพลาย', image: '/products/psu.png' },
    { category: 'ฮาร์ดดิสก์ และ เอสเอสดี', image: '/products/ssd.jpg' },
    { category: 'ซีพียู', image: '/products/cpu.jpg' },
    { category: 'แรม', image: '/products/ram.jpg' },
    { category: 'การ์ดจอ', image: '/products/gpu.jpg' },
    { category: 'เมนบอร์ด', image: '/products/mainboard.jpg' },
    { category: 'แท็บเล็ต', image: '/products/tablet.jpg' },
    { category: 'คอมพิวเตอร์ตั้งโต๊ะ', image: '/products/desktop.jpg' },
    { category: 'โน๊ตบุ๊ค', image: '/products/notebook.jpg' }
  ]

  for (const update of updates) {
    try {
      // Using Raw SQL for reliability on Windows/File lock situations
      const result = await prisma.$executeRawUnsafe(
        'UPDATE product SET proImage = ? WHERE proCategory = ?',
        update.image,
        update.category
      )
      console.log(`Updated ${result} products in category "${update.category}"`)
    } catch (e) {
      console.error(`Error updating category ${update.category}:`, e)
    }
  }

  console.log('All image updates completed!')
}

main().finally(() => prisma.$disconnect())
