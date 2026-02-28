"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthResponse, LoginRequest, RegisterRequest, UpdateUserRequest, authService } from "@/services/auth.service";
import api from "@/lib/api";

interface User {
    id: number;
    name: string;
    email: string;
    telefone: string;
    cpf: string;
    avatarUrl?: string;
    role?: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (data: LoginRequest) => Promise<void>;
    register: (data: RegisterRequest) => Promise<void>;
    updateProfile: (data: UpdateUserRequest) => Promise<void>;
    uploadAvatar: (file: File) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Load token and user from localStorage on mount
        const storedToken = localStorage.getItem("canario_token");
        const storedUser = localStorage.getItem("canario_user");

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
            // Optionally verify token with backend here
        }

        setIsLoading(false);
    }, []);

    const login = async (data: LoginRequest) => {
        try {
            const response = await authService.login(data);
            handleAuthSuccess(response);
        } catch (error) {
            console.error("Login failed", error);
            throw error;
        }
    };

    const register = async (data: RegisterRequest) => {
        try {
            await authService.register(data);
            // Auto login after registration
            await login({
                email: data.email,
                password: data.senha || data.password,
            });
        } catch (error) {
            console.error("Register failed", error);
            throw error;
        }
    };

    const updateProfile = async (data: UpdateUserRequest) => {
        try {
            await authService.updateProfile(data);
            if (user) {
                const updatedUser = { ...user, name: data.nome, telefone: data.telefone };
                setUser(updatedUser);
                localStorage.setItem("canario_user", JSON.stringify(updatedUser));
            }
        } catch (error) {
            console.error("Profile update failed", error);
            throw error;
        }
    };

    const uploadAvatar = async (file: File) => {
        if (!user) return;
        try {
            const response = await authService.uploadAvatar(user.id, file);
            if (response && response.avatarUrl) {
                const updatedUser = { ...user, avatarUrl: response.avatarUrl };
                setUser(updatedUser);
                localStorage.setItem("canario_user", JSON.stringify(updatedUser));
            }
        } catch (error) {
            console.error("Avatar upload failed", error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("canario_token");
        localStorage.removeItem("canario_user");
        // Remove token from axios interceptor will be handled below or in api.ts
    };

    const handleAuthSuccess = (response: AuthResponse) => {
        const { token, user } = response;
        setToken(token);
        setUser(user);
        localStorage.setItem("canario_token", token);
        localStorage.setItem("canario_user", JSON.stringify(user));
    };

    // Sync token with axios instance dynamically
    useEffect(() => {
        const interceptorId = api.interceptors.request.use((config) => {
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });

        return () => {
            api.interceptors.request.eject(interceptorId);
        };
    }, [token]);

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated: !!user,
                isLoading,
                login,
                register,
                updateProfile,
                uploadAvatar,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
