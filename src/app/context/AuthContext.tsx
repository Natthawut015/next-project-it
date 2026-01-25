"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Check session on mount
    useEffect(() => {
        async function checkSession() {
            try {
                const res = await fetch("/api/auth/me");
                const data = await res.json();
                setUser(data.user);
            } catch (error) {
                console.error("Session check failed", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        }
        checkSession();
    }, []);

    const login = async (email: string, password: string) => {
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || "Login failed");
        }

        setUser(data.user);
        router.push("/");
        router.refresh();
    };

    const register = async (name: string, email: string, password: string) => {
        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || "Registration failed");
        }
        // Automatically login after register or redirect to login? 
        // For now, let's redirect to login for clarity
        router.push("/login");
    };

    const logout = async () => {
        // In a real app, call an API to clear cookie. 
        // For simplicity here, we assume client-side clear + reload mostly works, 
        // but clearing HttpOnly cookie requires server action/API.
        // Let's implement a simple logout API call later, or just simple state clear for now 
        // (Actual cookie clear needs API)
        document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setUser(null);
        router.push("/login");
        router.refresh();
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
}
