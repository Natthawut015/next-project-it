import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from "@mui/material";
import theme from "../theme";
import { AuthProvider } from "../context/AuthContext";
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
                        <ThemeProvider theme={theme}>
                            {children}
                        </ThemeProvider>
                    </AuthProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
