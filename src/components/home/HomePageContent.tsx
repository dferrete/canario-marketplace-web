"use client";

import React from "react";
import { Listing } from "@/types/interfaces";
import { ListingCard } from "@/components/ui/ListingCard";
import { Bird, ArrowRight } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface HomePageContentProps {
    listings: Listing[];
}

export default function HomePageContent({ listings }: HomePageContentProps) {
    const { t } = useI18n();

    return (
        <div className="container mx-auto px-4">
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

            <section className="mt-16 sm:mt-24 mb-16">
                <div className="flex items-end justify-between mb-8 px-2 sm:px-0">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                            {t("home.availableBirds")}
                        </h2>
                        <p className="text-foreground/60 mt-1.5 max-w-2xl text-sm sm:text-base">
                            {t("home.availableBirdsSubtitle")}
                        </p>
                    </div>
                    <Button asChild variant="outline" className="hidden sm:inline-flex rounded-full group">
                        <Link href="/listings">
                            {t("home.viewAll")}
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Button>
                </div>

                {listings.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-12 sm:p-16 text-center bg-surface border border-border border-dashed rounded-3xl">
                        <Bird className="w-16 h-16 text-primary/30 mb-4" />
                        <h2 className="text-xl font-bold text-foreground">{t("home.noListingsTitle")}</h2>
                        <p className="text-foreground/60 mt-2">{t("home.noListingsDesc")}</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {listings.slice(0, 8).map((listing) => (
                                <ListingCard key={listing.id} listing={listing} />
                            ))}
                        </div>
                        <div className="mt-10 text-center sm:hidden px-2">
                            <Button asChild variant="outline" className="w-full rounded-full h-12 group">
                                <Link href="/listings">
                                    {t("home.viewAll")}
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                        </div>
                    </>
                )}
            </section>
        </div>
    );
}
