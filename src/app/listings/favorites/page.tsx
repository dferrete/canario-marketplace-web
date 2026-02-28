"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { userService, UserListing } from "@/services/user.service";
import { ListingCard } from "@/components/ui/ListingCard";
import { Heart, Loader2, Store } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import { Listing } from "@/types/interfaces";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function FavoritesPage() {
    const { user, isAuthenticated, isLoading: authLoading } = useAuth();
    const { t } = useI18n();

    const [listings, setListings] = useState<Listing[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const loadFavorites = async () => {
            if (!user?.id) return;
            setIsLoading(true);
            try {
                // Fetch favorite listings for the user
                const data = await userService.getUserFavoriteListings(user.id);

                if (isMounted) {
                    setListings(data);
                }
            } catch (error) {
                console.error("Erro ao carregar favoritos:", error);
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        if (isAuthenticated && user) {
            loadFavorites();
        } else if (!authLoading && !isAuthenticated) {
            setIsLoading(false);
        }

        return () => {
            isMounted = false;
        };
    }, [isAuthenticated, user, authLoading]);

    if (authLoading || isLoading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="container mx-auto px-4 py-12 flex flex-col items-center text-center">
                <div className="h-20 w-20 rounded-full bg-muted/30 flex items-center justify-center text-muted-foreground mb-6">
                    <Heart size={40} />
                </div>
                <h2 className="text-2xl font-bold mb-2">Faça login para ver seus favoritos</h2>
                <p className="text-muted-foreground mb-8 max-w-md">
                    Crie uma conta ou faça login para salvar seus anúncios favoritos e acessá-los mais tarde.
                </p>
                <Link href="/login?redirect=/listings/favorites">
                    <Button>Entrar na minha conta</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 lg:py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border/50">
                <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-danger/10 flex items-center justify-center text-danger shadow-sm border border-danger/20">
                        <Heart size={28} className="fill-current" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">{t("dashboard.favorites.title") || "Meus Favoritos"}</h1>
                        <p className="text-muted-foreground mt-1 text-sm md:text-base">
                            Anúncios que você marcou com gostei
                        </p>
                    </div>
                </div>
                <div className="text-sm font-medium text-muted-foreground bg-muted/50 px-4 py-2 rounded-full">
                    {listings.length} {listings.length === 1 ? 'favorito' : 'favoritos'}
                </div>
            </div>

            {/* Grid */}
            {listings.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                    {listings.map((listing) => (
                        <ListingCard key={listing.id} listing={listing} />
                    ))}
                </div>
            ) : (
                /* Empty State */
                <div className="py-20 flex flex-col items-center justify-center text-center bg-surface/50 border border-border/50 rounded-3xl backdrop-blur-xl">
                    <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6 shadow-sm border border-primary/20">
                        <Heart size={48} className="text-primary/50" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Você ainda não tem favoritos</h3>
                    <p className="text-muted-foreground max-w-sm mb-8">
                        Explore o marketplace e clique no coração dos anúncios que você mais gostar para salvá-los aqui.
                    </p>
                    <Link href="/listings">
                        <Button size="lg" className="rounded-full shadow-lg font-semibold hover:-translate-y-1 transition-transform">
                            <Store className="mr-2" size={18} />
                            Explorar Aves
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
}
