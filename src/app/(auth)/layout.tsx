import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from "@mui/material"; // Keep for context within ThemeContextProvider if needed, but actually ThemeContextProvider has it
import theme from "../theme";
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import { ThemeContextProvider } from "../context/ThemeContext";
import AppHeader from "../(main-website)/components/AppHeader";
import AppFooter from "../(main-website)/components/AppFooter";
import "../globals.css";

export const metadata = {
    title: "Authentication - IT Natthawut Shop",
    description: "Login or Register",
};

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <AppRouterCacheProvider>
                    <AuthProvider>
                        <CartProvider>
                            <ThemeContextProvider>
                                <AppHeader />
                                <main style={{ minHeight: '80vh' }}>
                                    {children}
                                </main>
                                <AppFooter />
                            </ThemeContextProvider>
                        </CartProvider>
                    </AuthProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
