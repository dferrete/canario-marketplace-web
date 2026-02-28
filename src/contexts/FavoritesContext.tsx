"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { userService } from "@/services/user.service";
import { toast } from "sonner";

interface FavoritesContextType {
    favoriteIds: Set<string>;
    toggleFavorite: (listingId: string) => Promise<void>;
    isLoading: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
    const { user, isAuthenticated } = useAuth();
    const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isAuthenticated && user?.id) {
            loadFavorites(user.id);
        } else {
            setFavoriteIds(new Set());
        }
    }, [isAuthenticated, user?.id]);

    const loadFavorites = async (userId: number) => {
        setIsLoading(true);
        try {
            const ids = await userService.getFavoriteListingIds(userId);
            setFavoriteIds(new Set(ids));
        } catch (error) {
            console.error("Erro ao carregar favoritos", error);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleFavorite = async (listingId: string) => {
        if (!user?.id) return;

        const isFavorited = favoriteIds.has(listingId);

        // Optimistic UI Update
        const newSet = new Set(favoriteIds);
        if (isFavorited) {
            newSet.delete(listingId);
        } else {
            newSet.add(listingId);
        }
        setFavoriteIds(newSet);

        try {
            if (isFavorited) {
                await userService.unfavoriteListing(listingId, user.id);
            } else {
                await userService.favoriteListing(listingId, user.id);
            }
        } catch (error) {
            console.error("Erro ao alterar favorito", error);
            // Revert changes on error
            setFavoriteIds(new Set(favoriteIds));
            toast.error("Ocorreu um erro ao atualizar os favoritos.");
        }
    };

    return (
        <FavoritesContext.Provider value={{ favoriteIds, toggleFavorite, isLoading }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error("useFavorites must be used within a FavoritesProvider");
    }
    return context;
}
