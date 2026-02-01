'use client'

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Sarabun } from "next/font/google";
import CssBaseline from '@mui/material/CssBaseline';

const sarabun = Sarabun({
    weight: ['300', '400', '500', '600', '700'],
    subsets: ['thai']
});

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
    mode: ThemeMode;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useThemeContext must be used within a ThemeContextProvider');
    }
    return context;
};

export const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [mode, setMode] = useState<ThemeMode>('light');

    useEffect(() => {
        const savedMode = localStorage.getItem('themeMode') as ThemeMode;
        if (savedMode) {
            setMode(savedMode);
        }
    }, []);

    const toggleTheme = () => {
        const newMode = mode === 'light' ? 'dark' : 'light';
        setMode(newMode);
        localStorage.setItem('themeMode', newMode);
    };

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    ...(mode === 'light'
                        ? {
                            primary: { main: '#1b5e20' }, // Use IT Green as primary
                            secondary: { main: '#43a047' },
                            background: { default: '#f8f9fa', paper: '#ffffff' },
                        }
                        : {
                            primary: { main: '#81c784' }, // Lighter Green for dark mode
                            secondary: { main: '#a5d6a7' },
                            background: { default: '#0a0a0a', paper: '#161616' },
                            text: { primary: '#ffffff', secondary: 'rgba(255, 255, 255, 0.7)' }
                        }),
                },
                components: {
                    MuiPaper: {
                        styleOverrides: {
                            root: {
                                backgroundImage: 'none',
                            },
                        },
                    },
                    MuiTableCell: {
                        styleOverrides: {
                            head: {
                                backgroundColor: mode === 'light' ? '#f5f5f5' : '#1e1e1e',
                                color: mode === 'light' ? 'rgba(0, 0, 0, 0.87)' : '#ffffff',
                                fontWeight: 'bold',
                            },
                        },
                    },
                },
                typography: {
                    fontFamily: sarabun.style.fontFamily,
                },
            }),
        [mode]
    );

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};
