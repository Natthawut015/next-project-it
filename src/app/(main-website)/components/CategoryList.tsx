"use client";

import React from "react";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Paper, Box } from "@mui/material";
import LaptopIcon from '@mui/icons-material/Laptop';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import TabletMacIcon from '@mui/icons-material/TabletMac';
import MemoryIcon from '@mui/icons-material/Memory';
import VideoCardIcon from '@mui/icons-material/SettingsInputComponent'; // GPU proxy
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import StorageIcon from '@mui/icons-material/Storage';
import PowerIcon from '@mui/icons-material/Power';
import KitchenIcon from '@mui/icons-material/Kitchen';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';

const categories = [
    { name: 'โน๊ตบุ๊ค', icon: <LaptopIcon /> },
    { name: 'คอมพิวเตอร์ตั้งโต๊ะ', icon: <DesktopWindowsIcon /> },
    { name: 'แท็บเล็ต', icon: <TabletMacIcon /> },
    { name: 'ซีพียู', icon: <MemoryIcon /> },
    { name: 'การ์ดจอ', icon: <VideoCardIcon /> },
    { name: 'เมนบอร์ด', icon: <DeveloperBoardIcon /> },
    { name: 'แรม', icon: <MemoryIcon /> },
    { name: 'ฮาร์ดดิสก์ และ เอสเอสดี', icon: <StorageIcon /> },
    { name: 'พาวเวอร์ซัพพลาย', icon: <PowerIcon /> },
    { name: 'เคส', icon: <KitchenIcon /> },
    { name: 'ชุดระบายความร้อน', icon: <AcUnitIcon /> },
];

export default function CategoryList({ onSelectCategory, selectedCategory }: { onSelectCategory: (cat: string) => void, selectedCategory: string }) {
    return (
        <Paper sx={{
            p: 2,
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            position: 'sticky',
            top: '2rem'
        }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, px: 1 }}>
                หมวดหมู่สินค้า
            </Typography>
            <List disablePadding>
                <ListItem disablePadding>
                    <ListItemButton
                        selected={selectedCategory === ""}
                        onClick={() => onSelectCategory("")}
                        sx={{ borderRadius: 1, mb: 0.5 }}
                    >
                        <ListItemIcon><ViewQuiltIcon /></ListItemIcon>
                        <ListItemText primary="สินค้าทั้งหมด" />
                    </ListItemButton>
                </ListItem>
                {categories.map((cat) => (
                    <ListItem key={cat.name} disablePadding>
                        <ListItemButton
                            selected={selectedCategory === cat.name}
                            onClick={() => onSelectCategory(cat.name)}
                            sx={{ borderRadius: 1, mb: 0.5 }}
                        >
                            <ListItemIcon>{cat.icon}</ListItemIcon>
                            <ListItemText primary={cat.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
}
