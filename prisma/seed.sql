-- Notebooks
INSERT OR REPLACE INTO product (proCode, proName, proDetail, proPrice, proCategory, proImage, createdAt, updatedAt) VALUES 
('NB-001', 'Apple MacBook Air M3', 'ชิป M3 จอภาพ Liquid Retina 13 นิ้ว RAM 8GB SSD 256GB', 39900, 'โน๊ตบุ๊ค', 'https://picsum.photos/seed/nb1/400/300', datetime('now'), datetime('now')),
('NB-002', 'ASUS ROG Zephyrus G14', 'Ryzen 9 8945HS, RTX 4060, RAM 16GB, จอ OLED 120Hz', 59900, 'โน๊ตบุ๊ค', 'https://picsum.photos/seed/nb2/400/300', datetime('now'), datetime('now')),
('NB-003', 'MSI Katana 15', 'Core i7-13620H, RTX 4050, RAM 16GB, SSD 512GB', 32900, 'โน๊ตบุ๊ค', 'https://picsum.photos/seed/nb3/400/300', datetime('now'), datetime('now')),
('NB-004', 'Lenovo Legion 5i', 'Core i5-13500H, RTX 4060, RAM 16GB, 165Hz Display', 42000, 'โน๊ตบุ๊ค', 'https://picsum.photos/seed/nb4/400/300', datetime('now'), datetime('now')),
('NB-005', 'HP Victus 16', 'Ryzen 7 7840HS, RTX 4050, RAM 16GB, SSD 512GB', 29900, 'โน๊ตบุ๊ค', 'https://picsum.photos/seed/nb5/400/300', datetime('now'), datetime('now')),
('NB-006', 'Acer Predator Helios Neo 16', 'Core i7-13700HX, RTX 4060, RAM 16GB, จอ 165Hz', 46900, 'โน๊ตบุ๊ค', 'https://picsum.photos/seed/nb6/400/300', datetime('now'), datetime('now')),
('NB-007', 'Dell XPS 13', 'Core i7-1250U, RAM 16GB, SSD 512GB, จอ InfinityEdge', 54900, 'โน๊ตบุ๊ค', 'https://picsum.photos/seed/nb7/400/300', datetime('now'), datetime('now')),
('NB-008', 'Microsoft Surface Laptop 5', 'Core i5, RAM 8GB, SSD 256GB, จอสัมผัส PixelSense', 38900, 'โน๊ตบุ๊ค', 'https://picsum.photos/seed/nb8/400/300', datetime('now'), datetime('now')),
('NB-009', 'Gigabyte G5 KF', 'Core i5-12500H, RTX 4060, RAM 16GB, 144Hz', 35900, 'โน๊ตบุ๊ค', 'https://picsum.photos/seed/nb9/400/300', datetime('now'), datetime('now')),
('NB-010', 'Huawei MateBook D 14', 'Core i5-1240P, RAM 16GB, SSD 512GB, จอ IPS', 21900, 'โน๊ตบุ๊ค', 'https://picsum.photos/seed/nb10/400/300', datetime('now'), datetime('now'));

-- CPUs
INSERT OR REPLACE INTO product (proCode, proName, proDetail, proPrice, proCategory, proImage, createdAt, updatedAt) VALUES 
('CPU-001', 'Intel Core i9-14900K', '24 Cores (8P + 16E), Up to 6.0 GHz, LGA 1700', 21900, 'ซีพียู', 'https://picsum.photos/seed/cpu1/400/300', datetime('now'), datetime('now')),
('CPU-002', 'AMD Ryzen 9 7950X3D', '16 Cores, 32 Threads, 144MB Cache, Socket AM5', 23500, 'ซีพียู', 'https://picsum.photos/seed/cpu2/400/300', datetime('now'), datetime('now')),
('CPU-003', 'Intel Core i7-14700K', '20 Cores (8P + 12E), Up to 5.6 GHz, LGA 1700', 15900, 'ซีพียู', 'https://picsum.photos/seed/cpu3/400/300', datetime('now'), datetime('now')),
('CPU-004', 'AMD Ryzen 7 7800X3D', '8 Cores, 16 Threads, 104MB Cache, Best for Gaming', 14900, 'ซีพียู', 'https://picsum.photos/seed/cpu4/400/300', datetime('now'), datetime('now')),
('CPU-005', 'Intel Core i5-14600K', '14 Cores (6P + 8E), Up to 5.3 GHz, LGA 1700', 11900, 'ซีพียู', 'https://picsum.photos/seed/cpu5/400/300', datetime('now'), datetime('now')),
('CPU-006', 'AMD Ryzen 5 7600X', '6 Cores, 12 Threads, 38MB Cache, Socket AM5', 8900, 'ซีพียู', 'https://picsum.photos/seed/cpu6/400/300', datetime('now'), datetime('now')),
('CPU-007', 'Intel Core i3-14100', '4 Cores (4P), Up to 4.7 GHz, UHD Graphics 730', 4900, 'ซีพียู', 'https://picsum.photos/seed/cpu7/400/300', datetime('now'), datetime('now')),
('CPU-008', 'AMD Ryzen 7 5700X', '8 Cores, 16 Threads, Socket AM4, No Graphics', 6900, 'ซีพียู', 'https://picsum.photos/seed/cpu8/400/300', datetime('now'), datetime('now')),
('CPU-009', 'Intel Core i7-12700K', '12 Cores (8P + 4E), Up to 5.0 GHz, LGA 1700', 10900, 'ซีพียู', 'https://picsum.photos/seed/cpu9/400/300', datetime('now'), datetime('now')),
('CPU-010', 'AMD Ryzen 5 5600G', '6 Cores, 12 Threads, Radeon Graphics included', 4500, 'ซีพียู', 'https://picsum.photos/seed/cpu10/400/300', datetime('now'), datetime('now'));

-- GPUs
INSERT OR REPLACE INTO product (proCode, proName, proDetail, proPrice, proCategory, proImage, createdAt, updatedAt) VALUES 
('GPU-001', 'NVIDIA GeForce RTX 4090', '24GB GDDR6X, The Ultimate GPU for 4K Performance', 69900, 'การ์ดจอ', 'https://picsum.photos/seed/gpu1/400/300', datetime('now'), datetime('now')),
('GPU-002', 'ASUS ROG Strix RTX 4080 Super', '16GB GDDR6X, High-end cooling performance', 42900, 'การ์ดจอ', 'https://picsum.photos/seed/gpu2/400/300', datetime('now'), datetime('now')),
('GPU-003', 'Gigabyte RTX 4070 Ti Super', '16GB GDDR6X, Excellent for 1440p Gaming', 32900, 'การ์ดจอ', 'https://picsum.photos/seed/gpu3/400/300', datetime('now'), datetime('now')),
('GPU-004', 'MSI RTX 4060 Ti Ventus 3X', '8GB GDDR6, Great mid-range performance', 15900, 'การ์ดจอ', 'https://picsum.photos/seed/gpu4/400/300', datetime('now'), datetime('now')),
('GPU-005', 'Zotac RTX 4060 Solo', '8GB GDDR6, Compact size for ITX builds', 10900, 'การ์ดจอ', 'https://picsum.photos/seed/gpu5/400/300', datetime('now'), datetime('now')),
('GPU-006', 'AMD Radeon RX 7900 XTX', '24GB GDDR6, Flagship performance from AMD', 36900, 'การ์ดจอ', 'https://picsum.photos/seed/gpu6/400/300', datetime('now'), datetime('now')),
('GPU-007', 'Sapphire Pulse RX 7800 XT', '16GB GDDR6, Solid high-resolution gaming', 19900, 'การ์ดจอ', 'https://picsum.photos/seed/gpu7/400/300', datetime('now'), datetime('now')),
('GPU-008', 'PowerColor RX 7600 Fighter', '8GB GDDR6, Entry-level 1080p gaming', 9900, 'การ์ดจอ', 'https://picsum.photos/seed/gpu8/400/300', datetime('now'), datetime('now')),
('GPU-009', 'NVIDIA RTX 3060 12GB', '12GB GDDR6, Best budget card for enthusiasts', 9400, 'การ์ดจอ', 'https://picsum.photos/seed/gpu9/400/300', datetime('now'), datetime('now')),
('GPU-010', 'Intel Arc A770 16GB', '16GB GDDR6, Modern features from Intel', 11900, 'การ์ดจอ', 'https://picsum.photos/seed/gpu10/400/300', datetime('now'), datetime('now'));

-- General Seed for other categories
-- Filling only a few for demonstration and to keep SQL short, I'll add more via another script if needed
INSERT OR REPLACE INTO product (proCode, proName, proDetail, proPrice, proCategory, proImage, createdAt, updatedAt) VALUES 
('RAM-001', 'Kingston FURY Beast DDR5 32GB', '32GB (16GBx2) Dual Channel, 5600MT/s', 4200, 'แรม', 'https://picsum.photos/seed/ram1/400/300', datetime('now'), datetime('now')),
('ST-001', 'Samsung 990 Pro 1TB', 'PCIe 4.0 NVMe M.2 SSD, Up to 7450MB/s', 3900, 'ฮาร์ดดิสก์ และ เอสเอสดี', 'https://picsum.photos/seed/st1/400/300', datetime('now'), datetime('now')),
('MB-001', 'ASUS PRIME Z790-P WIFI', 'LGA 1700, DDR5, PCIe 5.0, WiFi 6', 8500, 'เมนบอร์ด', 'https://picsum.photos/seed/mb1/400/300', datetime('now'), datetime('now')),
('PSU-001', 'Corsair RM850e 850W', '80 PLUS Gold, Fully Modular, ATX 3.0', 4500, 'พาวเวอร์ซัพพลาย', 'https://picsum.photos/seed/psu1/400/300', datetime('now'), datetime('now')),
('CS-001', 'NZXT H5 Flow White', 'Mid-Tower Case with optimized airflow', 3200, 'เคส', 'https://picsum.photos/seed/cs1/400/300', datetime('now'), datetime('now')),
('CL-001', 'DeepCool AK400 Digital', 'Air Cooler with Digital Display for Temps', 1290, 'ชุดระบายความร้อน', 'https://picsum.photos/seed/cl1/400/300', datetime('now'), datetime('now')),
('DT-001', 'Custom Gaming PC i5-12400F', 'RTX 3060, RAM 16GB, SSD 500GB', 24900, 'คอมพิวเตอร์ตั้งโต๊ะ', 'https://picsum.photos/seed/dt1/400/300', datetime('now'), datetime('now')),
('TB-001', 'Samsung Galaxy Tab S9', 'Snapdragon 8 Gen 2, จอ Dynamic AMOLED 2X', 28900, 'แท็บเล็ต', 'https://picsum.photos/seed/tb1/400/300', datetime('now'), datetime('now'));
