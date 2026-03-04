"use client";

import React, { useState, useEffect } from "react";
import { useI18n } from "@/contexts/I18nContext";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Sponsor {
    id: number;
    name: string;
    taglineKey: string;
    descriptionKey: string;
    ctaKey: string;
    href: string;
    accentColor: string;
    bgGradient: string;
    avatarBg: string;
    avatarText: string;
    tag: string;
}

const SPONSORS: Sponsor[] = [
    {
        id: 1,
        name: "AveVet Clínicas",
        taglineKey: "home.sponsored.sponsor1.tagline",
        descriptionKey: "home.sponsored.sponsor1.description",
        ctaKey: "home.sponsored.sponsor1.cta",
        href: "#",
        accentColor: "text-emerald-600",
        bgGradient: "from-emerald-500/10 via-teal-500/5 to-transparent",
        avatarBg: "bg-emerald-500/15",
        avatarText: "AV",
        tag: "Saúde Animal",
    },
    {
        id: 2,
        name: "AveExpress Transportes",
        taglineKey: "home.sponsored.sponsor2.tagline",
        descriptionKey: "home.sponsored.sponsor2.description",
        ctaKey: "home.sponsored.sponsor2.cta",
        href: "#",
        accentColor: "text-sky-600",
        bgGradient: "from-sky-500/10 via-blue-500/5 to-transparent",
        avatarBg: "bg-sky-500/15",
        avatarText: "AE",
        tag: "Transporte",
    },
    {
        id: 3,
        name: "NutriAve Premium",
        taglineKey: "home.sponsored.sponsor3.tagline",
        descriptionKey: "home.sponsored.sponsor3.description",
        ctaKey: "home.sponsored.sponsor3.cta",
        href: "#",
        accentColor: "text-amber-600",
        bgGradient: "from-amber-500/10 via-yellow-500/5 to-transparent",
        avatarBg: "bg-amber-500/15",
        avatarText: "NP",
        tag: "Nutrição",
    },
];

export function SponsoredSection() {
    const { t } = useI18n();
    const [current, setCurrent] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const total = SPONSORS.length;

    const go = (idx: number) => {
        if (isAnimating) return;
        setIsAnimating(true);
        setTimeout(() => {
            setCurrent((idx + total) % total);
            setIsAnimating(false);
        }, 150);
    };

    // Auto-advance every 6 seconds
    useEffect(() => {
        const timer = setInterval(() => go(current + 1), 6000);
        return () => clearInterval(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [current]);

    const sponsor = SPONSORS[current];

    return (
        <section className="mb-16">
            {/* Header */}
            <div className="mb-8 px-2 sm:px-0">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    {t("home.sponsored.eyebrow")}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                    {t("home.sponsored.title")}
                </h2>
                <p className="text-foreground/60 mt-1.5 text-sm sm:text-base">
                    {t("home.sponsored.subtitle")}
                </p>
            </div>

            {/* Carousel card */}
            <div className={cn(
                "relative rounded-3xl border border-border overflow-hidden bg-surface shadow-sm transition-opacity duration-300",
                isAnimating ? "opacity-0" : "opacity-100"
            )}>
                <div className={cn("absolute inset-0 bg-gradient-to-r opacity-60", sponsor.bgGradient)} />

                <div className="relative flex flex-col sm:flex-row items-center gap-6 sm:gap-10 p-6 sm:p-10">
                    {/* Image / Avatar placeholder */}
                    <div className={cn(
                        "flex items-center justify-center w-28 h-28 sm:w-36 sm:h-36 rounded-2xl text-3xl font-extrabold shrink-0 shadow-inner border border-white/20",
                        sponsor.avatarBg,
                        sponsor.accentColor
                    )}>
                        {sponsor.avatarText}
                    </div>

                    {/* Text content */}
                    <div className="flex-1 text-center sm:text-left">
                        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
                            {t("home.sponsored.label")} · {sponsor.tag}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-foreground mb-1">{sponsor.name}</h3>
                        <p className={cn("text-sm font-semibold mb-2", sponsor.accentColor)}>{t(sponsor.taglineKey)}</p>
                        <p className="text-foreground/70 text-sm leading-relaxed max-w-lg mb-5">{t(sponsor.descriptionKey)}</p>
                        <Button asChild variant="outline" size="sm" className="rounded-full font-semibold hover:-translate-y-0.5 transition-transform">
                            <a href={sponsor.href}>{t(sponsor.ctaKey)}</a>
                        </Button>
                    </div>

                    {/* Navigation arrows */}
                    <div className="flex gap-2 sm:flex-col absolute top-4 right-4 sm:top-auto sm:right-6 sm:static">
                        <button onClick={() => go(current - 1)} className="p-2 rounded-full bg-surface/80 border border-border hover:bg-primary/10 hover:text-primary transition-colors" aria-label="Previous">
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button onClick={() => go(current + 1)} className="p-2 rounded-full bg-surface/80 border border-border hover:bg-primary/10 hover:text-primary transition-colors" aria-label="Next">
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Dot indicators */}
                <div className="flex justify-center gap-2 py-4 border-t border-border/50">
                    {SPONSORS.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => go(idx)}
                            className={cn(
                                "h-1.5 rounded-full transition-all duration-300",
                                idx === current ? "w-6 bg-primary" : "w-1.5 bg-foreground/20"
                            )}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
