"use client";

import React from "react";
import { useI18n } from "@/contexts/I18nContext";
import { Bird, Palette, Music, Sparkles } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Category {
    key: string;
    icon: React.ReactNode;
    href: string;
    gradient: string;
    border: string;
    iconBg: string;
    iconColor: string;
    descKey: string;
}

const CATEGORIES: Category[] = [
    {
        key: "sizeCanary",
        icon: <Bird className="w-8 h-8" />,
        href: "/listings?category=porte",
        gradient: "from-yellow-500/10 to-amber-500/5",
        border: "border-yellow-500/20 hover:border-yellow-500/50",
        iconBg: "bg-yellow-500/10",
        iconColor: "text-yellow-600",
        descKey: "home.categories.sizeCanaryDesc",
    },
    {
        key: "colorCanary",
        icon: <Palette className="w-8 h-8" />,
        href: "/listings?category=cor",
        gradient: "from-rose-500/10 to-pink-500/5",
        border: "border-rose-500/20 hover:border-rose-500/50",
        iconBg: "bg-rose-500/10",
        iconColor: "text-rose-600",
        descKey: "home.categories.colorCanaryDesc",
    },
    {
        key: "singCanary",
        icon: <Music className="w-8 h-8" />,
        href: "/listings?category=canto",
        gradient: "from-violet-500/10 to-purple-500/5",
        border: "border-violet-500/20 hover:border-violet-500/50",
        iconBg: "bg-violet-500/10",
        iconColor: "text-violet-600",
        descKey: "home.categories.singCanaryDesc",
    },
];

export function HomeCategoriesSection() {
    const { t } = useI18n();

    return (
        <section className="mb-16">
            {/* Header */}
            <div className="flex items-end justify-between mb-8 px-2 sm:px-0">
                <div>
                    <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                        <Sparkles className="w-3.5 h-3.5" />
                        {t("home.categories.eyebrow")}
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                        {t("home.categories.title")}
                    </h2>
                    <p className="text-foreground/60 mt-1.5 text-sm sm:text-base">
                        {t("home.categories.subtitle")}
                    </p>
                </div>
            </div>

            {/* Category cards — horizontal layout with image+text */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                {CATEGORIES.map((cat) => (
                    <Link
                        key={cat.key}
                        href={cat.href}
                        className={cn(
                            "group flex flex-col gap-4 p-6 rounded-2xl border bg-gradient-to-br transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
                            cat.gradient,
                            cat.border
                        )}
                    >
                        {/* Icon */}
                        <div className={cn("p-3 rounded-xl w-fit transition-transform group-hover:scale-110", cat.iconBg, cat.iconColor)}>
                            {cat.icon}
                        </div>

                        {/* Text */}
                        <div>
                            <h3 className="font-bold text-foreground text-base mb-1">
                                {t(`home.categories.${cat.key}`)}
                            </h3>
                            <p className="text-xs text-foreground/60 leading-relaxed">
                                {t(cat.descKey)}
                            </p>
                        </div>

                        {/* CTA hint */}
                        <span className={cn("text-xs font-semibold mt-auto flex items-center gap-1 group-hover:gap-2 transition-all", cat.iconColor)}>
                            {t("home.categories.exploreLink")}
                            <span className="transition-transform group-hover:translate-x-0.5">→</span>
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    );
}
