'use client'
import { Sarabun } from "next/font/google"
import { createTheme } from "@mui/material/styles"

const sarabun = Sarabun({
    weight: ['300','400','500','600','700'],
    subsets: ['thai']
})
const theme = createTheme({
    typography: {
        fontFamily: sarabun.style.fontFamily,
    },
})
export default theme