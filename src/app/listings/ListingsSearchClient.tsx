"use client";

import React, { useState, useEffect } from "react";
import { Listing } from "@/types/interfaces";
import { useI18n } from "@/contexts/I18nContext";
import { ListingCard } from "@/components/ui/ListingCard";
import { Bird, SlidersHorizontal, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/lib/api";

interface ListingsSearchClientProps {
    initialListings: Listing[];
}

export default function ListingsSearchClient({ initialListings }: ListingsSearchClientProps) {
    const { t } = useI18n();
    const [listings, setListings] = useState<Listing[]>(initialListings);
    const [filteredListings, setFilteredListings] = useState<Listing[]>(initialListings);

    // Filters State
    const [searchTerm, setSearchTerm] = useState("");
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    // Enrich the listings with bird data on the client side since the API doesn't return joined data
    useEffect(() => {
        const enrichListings = async () => {
            const enriched = await Promise.all(
                initialListings.map(async (listing) => {
                    try {
                        const birdRes = await api.get(`/api/v1/birds/${listing.birdId}`);
                        const bird = birdRes.data;
                        return {
                            ...listing,
                            breed: bird.species || 'Ave',
                            gender: bird.gender || 'UNKNOWN',
                            birthDate: bird.birthDate || listing.birthDate,
                        };
                    } catch (err) {
                        return listing; // fallback to default
                    }
                })
            );
            setListings(enriched);
            setFilteredListings(enriched);
        };

        if (initialListings.length > 0) {
            enrichListings();
        }
    }, [initialListings]);

    // Apply Filters Effect
    useEffect(() => {
        let result = listings;

        // Exclude PAUSED or SOLD unless specified (For now, just ACTIVE)
        result = result.filter(l => l.status === "ACTIVE" || l.status === "RESERVED");

        // Simple text search filter on breed or mutations
        if (searchTerm.trim() !== "") {
            const lowerSearch = searchTerm.toLowerCase();
            result = result.filter(
                (l) =>
                    l.breed.toLowerCase().includes(lowerSearch) ||
                    l.mutations.some(m => m.toLowerCase().includes(lowerSearch))
            );
        }

        setFilteredListings(result);
    }, [searchTerm, listings]);


    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            {/* Header / Breadcrumbs Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
                        {t("birdsSearch.title")}
                    </h1>
                    <p className="text-foreground/60 mt-2 text-base max-w-xl">
                        {t("birdsSearch.subtitle")}
                    </p>
                </div>

                {/* Mobile Filter Toggle */}
                <Button
                    variant="outline"
                    className="md:hidden w-full flex items-center justify-center rounded-full"
                    onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                >
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    {isMobileFiltersOpen ? "Ocultar Filtros" : "Mostrar Filtros"}
                </Button>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Filters */}
                <aside className={`w-full md:w-64 lg:w-72 shrink-0 space-y-6 ${isMobileFiltersOpen ? 'block' : 'hidden md:block'}`}>
                    <div className="bg-surface border border-border/50 rounded-2xl p-5 sticky top-24 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="font-bold text-lg">{t("birdsSearch.filters")}</h2>
                            {searchTerm && (
                                <button onClick={() => setSearchTerm("")} className="text-xs text-primary font-medium hover:underline">
                                    {t("birdsSearch.clear")}
                                </button>
                            )}
                        </div>

                        <div className="space-y-5">
                            {/* Search Box */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground/80">{t("birdsSearch.searchLabel")}</label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        type="text"
                                        placeholder="Ex: Canário Belga..."
                                        className="pl-9 bg-background/50 h-10"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    {searchTerm && (
                                        <button
                                            onClick={() => setSearchTerm("")}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5"
                                        >
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Future Filters Placeholder: Price Range, Gender, specific Breeds */}
                            <div className="pt-4 border-t border-border border-dashed text-sm text-muted-foreground text-center">
                                Outros filtros avançados como Preço, Idade e Raça serão disponibilizados em breve.
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Grid */}
                <main className="flex-1 min-w-0">
                    <div className="mb-4 text-sm text-muted-foreground font-medium">
                        {filteredListings.length} {filteredListings.length === 1 ? t("birdsSearch.result") : t("birdsSearch.results")}
                    </div>

                    {filteredListings.length === 0 ? (
                        <div className="flex flex-col items-center justify-center p-12 sm:p-20 text-center bg-surface border border-border border-dashed rounded-3xl h-[50vh]">
                            <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mb-4">
                                <Bird className="w-8 h-8 text-muted-foreground" />
                            </div>
                            <h2 className="text-xl font-bold text-foreground">{t("birdsSearch.emptyTitle")}</h2>
                            <p className="text-foreground/60 mt-2 max-w-sm">
                                {t("birdsSearch.emptyDesc")}
                            </p>
                            {searchTerm && (
                                <Button onClick={() => setSearchTerm("")} variant="outline" className="mt-6 rounded-full">
                                    Limpar Busca
                                </Button>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6">
                            {filteredListings.map((listing) => (
                                <ListingCard key={listing.id} listing={listing} />
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
