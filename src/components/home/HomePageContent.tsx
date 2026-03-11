"use client";

import React from "react";
import { Listing } from "@/types/interfaces";
import { useI18n } from "@/contexts/I18nContext";
import Link from "next/link";
import { HomeCategoriesSection } from "@/components/home/HomeCategoriesSection";
import { FeaturedBirdsSection } from "@/components/home/FeaturedBirdsSection";
import { TopSellersSection } from "@/components/home/TopSellersSection";
import { SponsoredSection } from "@/components/home/SponsoredSection";

interface HomePageContentProps {
    listings: Listing[];
}

export default function HomePageContent({ listings }: HomePageContentProps) {
    const { t } = useI18n();

    return (
        <div className="container mx-auto px-4 animate-in fade-in slide-in-from-bottom-8 duration-500">
            {/* Hero */}
            <header className="py-10 sm:py-12 md:py-16 text-center max-w-2xl mx-auto space-y-3 sm:space-y-4 px-2 sm:px-0">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
                    {t("home.titlePart1")} <br className="hidden sm:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                        {t("home.titlePart2")}
                    </span>
                </h1>
                <p className="text-foreground/70 text-base sm:text-lg md:text-xl leading-relaxed max-w-lg mx-auto">
                    {t("home.subtitle")}
                </p>
            </header>

            {/* ── Nossas Categorias ─────────────────────────────────────── */}
            <HomeCategoriesSection />

            {/* ── Aves em Destaque ──────────────────────────────────────── */}
            <FeaturedBirdsSection listings={listings} />

            {/* ── Melhores Vendedores ───────────────────────────────────── */}
            <TopSellersSection />

            {/* ── Espaço Patrocinado ────────────────────────────────────── */}
            <SponsoredSection />
        </div>
    );
}
