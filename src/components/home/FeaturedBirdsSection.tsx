"use client";

import React from "react";
import { Listing } from "@/types/interfaces";
import { ListingCard } from "@/components/ui/ListingCard";
import { Bird, ArrowRight } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface FeaturedBirdsSectionProps {
    listings: Listing[];
}

export function FeaturedBirdsSection({ listings }: FeaturedBirdsSectionProps) {
    const { t } = useI18n();

    return (
        <section className="mt-4 mb-16">
            <div className="flex items-end justify-between mb-8 px-2 sm:px-0">
                <div>
                    <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                        <Bird className="w-3.5 h-3.5" />
                        {t("home.availableBirdsEyebrow")}
                    </div>
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
                        {listings.slice(0, 4).map((listing) => (
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
    );
}
