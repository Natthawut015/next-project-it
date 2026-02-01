'use client'

import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from '@mui/material/Typography'
import Link from "@mui/material/Link";
import NextLink from 'next/link'
import { usePathname } from "next/navigation";
import { Badge, IconButton, Button, Box } from "@mui/material";
import Container from "@mui/material/Container";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useThemeContext } from "../../context/ThemeContext";

export default function AppHeader() {
  const pathname = usePathname();
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const { mode, toggleTheme } = useThemeContext();

  // Calculate total items
  const cartCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: '#1b5e20', // Darker Green
        borderBottom: '1px solid',
        borderColor: 'rgba(255, 255, 255, 0.12)',
        color: 'white'
      }}
    >
      <Toolbar sx={{ px: { xs: 2, sm: 4 }, minHeight: '80px !important', py: 1 }}>
        <NextLink href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', marginRight: 'auto' }}>
          <img
            src="/profile.jpg"
            alt="IT Natthawut Shop"
            style={{ height: '60px', width: 'auto', border: '1px solid white' }}
          />
        </NextLink>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {['/', '/about'].map((path) => {
            const labels: { [key: string]: string } = { '/': 'หน้าแรก', '/about': 'เกี่ยวกับเรา' };
            const isActive = pathname === path;
            return (
              <Link
                key={path}
                underline="none"
                component={NextLink}
                variant="button"
                href={path}
                sx={{
                  my: 1,
                  mx: 3,
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '1.3rem',
                  textTransform: 'uppercase',
                  color: isActive ? '#c8e6c9' : 'white', // Light green for active, white for others
                  '&:hover': { color: '#c8e6c9' }
                }}
              >
                {labels[path]}
              </Link>
            )
          })}

          {user && (
            <Link
              underline="none"
              component={NextLink}
              variant="button"
              href="/orders"
              sx={{
                my: 1,
                mx: 3,
                fontWeight: pathname === '/orders' ? 700 : 500,
                fontSize: '1.2rem',
                color: pathname === '/orders' ? '#c8e6c9' : 'white',
                '&:hover': { color: '#c8e6c9' }
              }}
            >
              คําสั่งซื้อ
            </Link>
          )}

          <IconButton
            component={NextLink}
            href="/cart"
            sx={{ ml: 1, mr: 1, color: 'white' }}
            size="large"
          >
            <Badge badgeContent={cartCount} color="error">
              <ShoppingCartIcon sx={{ fontSize: '1.8rem' }} />
            </Badge>
          </IconButton>

          <IconButton onClick={toggleTheme} sx={{ ml: 1, mr: 2, color: 'white' }}>
            {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>

          {user ? (
            <>
              <Typography variant="body1" sx={{ mx: 2, color: 'white', fontWeight: 700, fontSize: '1.15rem' }}>
                {user.name}
              </Typography>
              <Button
                onClick={logout}
                variant="outlined"
                sx={{
                  ml: 1,
                  borderRadius: '20px',
                  fontSize: '1rem',
                  px: 3,
                  py: 1,
                  color: 'white',
                  borderColor: 'white',
                  '&:hover': { borderColor: '#c8e6c9', color: '#c8e6c9' }
                }}
              >
                ออกจากระบบ
              </Button>
            </>
          ) : (
            <Button
              component={NextLink}
              href="/login"
              variant="outlined"
              sx={{
                ml: 1,
                borderRadius: '20px',
                fontSize: '1rem',
                px: 3,
                py: 1,
                color: 'white',
                borderColor: 'white',
                '&:hover': { borderColor: '#c8e6c9', color: '#c8e6c9' }
              }}
            >
              เข้าสู่ระบบ
            </Button>
          )}
        </nav>
      </Toolbar>
    </AppBar>
  );
}
