const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    const categories = [
        { name: 'โน๊ตบุ๊ค', key: 'notebook' },
        { name: 'คอมพิวเตอร์ตั้งโต๊ะ', key: 'desktop' },
        { name: 'แท็บเล็ต', key: 'tablet' },
        { name: 'ซีพียู', key: 'cpu' },
        { name: 'การ์ดจอ', key: 'gpu' },
        { name: 'เมนบอร์ด', key: 'mainboard' },
        { name: 'แรม', key: 'ram' },
        { name: 'ฮาร์ดดิสก์ และ เอสเอสดี', key: 'storage' },
        { name: 'พาวเวอร์ซัพพลาย', key: 'psu' },
        { name: 'เคส', key: 'case' },
        { name: 'ชุดระบายความร้อน', key: 'cooling' },
    ]

    const categoryImages = {
        'โน๊ตบุ๊ค': 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80',
        'คอมพิวเตอร์ตั้งโต๊ะ': 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&q=80',
        'แท็บเล็ต': 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80',
        'ซีพียู': 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&q=80',
        'การ์ดจอ': 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&q=80',
        'เมนบอร์ด': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
        'แรม': 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=800&q=80',
        'ฮาร์ดดิสก์ และ เอสเอสดี': 'https://images.unsplash.com/photo-1597852074816-d933c4d2b988?w=800&q=80',
        'พาวเวอร์ซัพพลาย': 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&q=80',
        'เคส': 'https://images.unsplash.com/photo-1587202372162-6383f05bc0bb?w=800&q=80',
        'ชุดระบายความร้อน': 'https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=800&q=80'
    }

    const products = []

    // Helper to get image or default
    const getImg = (cat) => categoryImages[cat] || `https://picsum.photos/seed/${cat}/400/300`;

    // Notebooks
    for (let i = 1; i <= 10; i++) {
        products.push({
            proCode: `NB-${i.toString().padStart(3, '0')}`,
            proName: `Notebook Model ${i}`,
            proDetail: `High performance notebook with latest specs. RAM 16GB, SSD 512GB. Perfect for work and gaming.`,
            proPrice: 25000 + (i * 1500),
            proCategory: 'โน๊ตบุ๊ค',
            proImage: getImg('โน๊ตบุ๊ค'),
        })
    }

    // Desktops
    for (let i = 1; i <= 10; i++) {
        products.push({
            proCode: `DT-${i.toString().padStart(3, '0')}`,
            proName: `Gaming Desktop ${i}`,
            proDetail: `Powerful gaming desktop with RGB lighting. Intel Core i7, RTX GPU included.`,
            proPrice: 30000 + (i * 2000),
            proCategory: 'คอมพิวเตอร์ตั้งโต๊ะ',
            proImage: getImg('คอมพิวเตอร์ตั้งโต๊ะ'),
        })
    }

    // Tablets
    for (let i = 1; i <= 10; i++) {
        products.push({
            proCode: `TB-${i.toString().padStart(3, '0')}`,
            proName: `Pro Tablet ${i}`,
            proDetail: `Lightweight and powerful tablet for creative professionals. 120Hz display.`,
            proPrice: 15000 + (i * 1000),
            proCategory: 'แท็บเล็ต',
            proImage: getImg('แท็บเล็ต'),
        })
    }

    // CPUs
    for (let i = 1; i <= 10; i++) {
        products.push({
            proCode: `CPU-${i.toString().padStart(3, '0')}`,
            proName: i % 2 === 0 ? `Intel Core i${3 + (i % 3) * 2} Gen 14` : `AMD Ryzen ${3 + (i % 3) * 2} 7000 Series`,
            proDetail: `Latest generation processor with multi-threading support for heavy multitasking.`,
            proPrice: 5000 + (i * 800),
            proCategory: 'ซีพียู',
            proImage: getImg('ซีพียู'),
        })
    }

    // GPUs
    for (let i = 1; i <= 10; i++) {
        products.push({
            proCode: `GPU-${i.toString().padStart(3, '0')}`,
            proName: i % 2 === 0 ? `NVIDIA GeForce RTX ${3060 + i * 10}` : `AMD Radeon RX ${6600 + i * 100}`,
            proDetail: `High-end graphics card for 4K gaming and professional rendering tasks.`,
            proPrice: 12000 + (i * 2500),
            proCategory: 'การ์ดจอ',
            proImage: getImg('การ์ดจอ'),
        })
    }

    // Mainboards
    for (let i = 1; i <= 10; i++) {
        products.push({
            proCode: `MB-${i.toString().padStart(3, '0')}`,
            proName: `Motherboard Series-X ${i}`,
            proDetail: `Modern motherboard with PCIe 5.0 support and multiple M.2 slots.`,
            proPrice: 4000 + (i * 500),
            proCategory: 'เมนบอร์ด',
            proImage: getImg('เมนบอร์ด'),
        })
    }

    // RAM
    for (let i = 1; i <= 10; i++) {
        products.push({
            proCode: `RAM-${i.toString().padStart(3, '0')}`,
            proName: `DDR5 RAM 16GB (2x8GB) ${i}`,
            proDetail: `High-speed overclocked memory with low latency and RGB heatsink.`,
            proPrice: 2000 + (i * 300),
            proCategory: 'แรม',
            proImage: getImg('แรม'),
        })
    }

    // Storage
    for (let i = 1; i <= 10; i++) {
        products.push({
            proCode: `ST-${i.toString().padStart(3, '0')}`,
            proName: i % 2 === 0 ? `NVMe SSD 1TB ${i}` : `External HDD 2TB ${i}`,
            proDetail: `Fast and reliable storage solution for your data and OS. High read/write speeds.`,
            proPrice: 1500 + (i * 400),
            proCategory: 'ฮาร์ดดิสก์ และ เอสเอสดี',
            proImage: getImg('ฮาร์ดดิสก์ และ เอสเอสดี'),
        })
    }

    // PSU
    for (let i = 1; i <= 10; i++) {
        products.push({
            proCode: `PSU-${i.toString().padStart(3, '0')}`,
            proName: `Power Supply ${550 + i * 50}W 80+ Gold`,
            proDetail: `Stable and efficient power supply unit with modular cables.`,
            proPrice: 2500 + (i * 350),
            proCategory: 'พาวเวอร์ซัพพลาย',
            proImage: getImg('พาวเวอร์ซัพพลาย'),
        })
    }

    // Case
    for (let i = 1; i <= 10; i++) {
        products.push({
            proCode: `CS-${i.toString().padStart(3, '0')}`,
            proName: `Mid-Tower Case Model ${i}`,
            proDetail: `Steel case with tempered glass side panel and excellent airflow design.`,
            proPrice: 1800 + (i * 300),
            proCategory: 'เคส',
            proImage: getImg('เคส'),
        })
    }

    // Cooling
    for (let i = 1; i <= 10; i++) {
        products.push({
            proCode: `CL-${i.toString().padStart(3, '0')}`,
            proName: i % 2 === 0 ? `Liquid Cooler 360mm ${i}` : `Air Cooler Tower ${i}`,
            proDetail: `Advanced cooling system to keep your CPU temperature low under load.`,
            proPrice: 1200 + (i * 450),
            proCategory: 'ชุดระบายความร้อน',
            proImage: getImg('ชุดระบายความร้อน'),
        })
    }

    console.log('Seeding products...')

    // Clear existing data (optional but safer for seeding)
    // await prisma.product.deleteMany({})

    for (const p of products) {
        await prisma.product.upsert({
            where: { proCode: p.proCode },
            update: p,
            create: p,
        })
    }

    console.log('Seed completed successfully!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
