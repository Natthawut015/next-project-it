'use client'

import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from '@mui/material/Typography'
import Link from "@mui/material/Link";
import NextLink from 'next/link'
import { usePathname } from "next/navigation";
import { Button, IconButton, Badge } from "@mui/material";
import Container from "@mui/material/Container";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

export default function AppHeader() {
  const pathname = usePathname();
  const { cartItems } = useCart();
  const { user, logout } = useAuth();

  // Calculate total items
  const cartCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e0e0e0',
        color: 'text.primary'
      }}
    >
      <Toolbar sx={{ px: { xs: 2, sm: 4 }, minHeight: '100px !important', py: 2 }}>
        <NextLink href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', marginRight: 'auto' }}>
          <img
            src="/logo.png"
            alt="IT Natthawut Shop"
            style={{ height: '200px', width: 'auto' }}
          />
        </NextLink>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {['/', '/abount', '/contact'].map((path) => {
            const labels: { [key: string]: string } = { '/': 'Home', '/abount': 'About', '/contact': 'Contact' };
            return (
              <Link
                key={path}
                underline="none"
                component={NextLink}
                variant="button"
                color={pathname === path ? "primary" : "text.secondary"}
                href={path}
                sx={{ my: 1, mx: 3, fontWeight: pathname === path ? 700 : 500, fontSize: '1.3rem', textTransform: 'uppercase' }}
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
              color={pathname === '/orders' ? "primary" : "text.secondary"}
              href="/orders"
              sx={{ my: 1, mx: 2, fontWeight: pathname === '/orders' ? 700 : 500, fontSize: '1.2rem' }}
            >
              คำสั่งซื้อของฉัน
            </Link>
          )}

          <IconButton
            component={NextLink}
            href="/cart"
            color="primary"
            sx={{ ml: 2, mr: 2 }}
            size="large"
          >
            <Badge badgeContent={cartCount} color="error">
              <ShoppingCartIcon sx={{ fontSize: '1.8rem' }} />
            </Badge>
          </IconButton>

          {user ? (
            <>
              <Typography variant="body1" sx={{ mx: 2, color: 'text.primary', fontWeight: 700, fontSize: '1.15rem' }}>
                {user.name}
              </Typography>
              <Button
                onClick={logout}
                variant="outlined"
                color="error"
                sx={{ ml: 1, borderRadius: '20px', fontSize: '1rem', px: 3, py: 1 }}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              component={NextLink}
              href="/login"
              variant="outlined"
              sx={{ ml: 1, borderRadius: '20px', fontSize: '1rem', px: 3, py: 1 }}
            >
              Login
            </Button>
          )}
        </nav>
      </Toolbar>
    </AppBar>
  );
}
