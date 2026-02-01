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

    const products = []

    // Notebooks
    for (let i = 1; i <= 10; i++) {
        products.push({
            proCode: `NB-${i.toString().padStart(3, '0')}`,
            proName: `Notebook Model ${i}`,
            proDetail: `High performance notebook with latest specs. RAM 16GB, SSD 512GB. Perfect for work and gaming.`,
            proPrice: 25000 + (i * 1500),
            proCategory: 'โน๊ตบุ๊ค',
            proImage: `https://picsum.photos/seed/nb${i}/400/300`,
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
            proImage: `https://picsum.photos/seed/dt${i}/400/300`,
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
            proImage: `https://picsum.photos/seed/tb${i}/400/300`,
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
            proImage: `https://picsum.photos/seed/cpu${i}/400/300`,
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
            proImage: `https://picsum.photos/seed/gpu${i}/400/300`,
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
            proImage: `https://picsum.photos/seed/mb${i}/400/300`,
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
            proImage: `https://picsum.photos/seed/ram${i}/400/300`,
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
            proImage: `https://picsum.photos/seed/st${i}/400/300`,
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
            proImage: `https://picsum.photos/seed/psu${i}/400/300`,
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
            proImage: `https://picsum.photos/seed/cs${i}/400/300`,
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
            proImage: `https://picsum.photos/seed/cl${i}/400/300`,
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
