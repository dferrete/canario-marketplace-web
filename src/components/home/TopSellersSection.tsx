"use client";

import React from "react";
import { useI18n } from "@/contexts/I18nContext";
import { Trophy, Star, TrendingUp } from "lucide-react";

interface MockSeller {
    rank: number;
    name: string;
    location: string;
    sales: number;
    rating: number;
    avatar: string;
}

const MOCK_SELLERS: MockSeller[] = [
    { rank: 1, name: "Vale Verde", location: "SP", sales: 142, rating: 4.98, avatar: "VV" },
    { rank: 2, name: "Aves do Sertão", location: "CE", sales: 119, rating: 4.97, avatar: "AS" },
    { rank: 3, name: "Canários do Sul", location: "RS", sales: 108, rating: 4.95, avatar: "CS" },
    { rank: 4, name: "Serra Azul", location: "MG", sales: 97, rating: 4.93, avatar: "SA" },
    { rank: 5, name: "Casa das Aves BR", location: "RJ", sales: 84, rating: 4.91, avatar: "CA" },
];

const RANK_STYLES: Record<number, { text: string; bg: string; font: string }> = {
    1: { text: "text-yellow-500", bg: "bg-yellow-500/10", font: "font-extrabold" },
    2: { text: "text-slate-400", bg: "bg-slate-400/10", font: "font-bold" },
    3: { text: "text-amber-700", bg: "bg-amber-700/10", font: "font-bold" },
};

export function TopSellersSection() {
    const { t } = useI18n();

    return (
        <section className="mb-16">
            {/* Header */}
            <div className="mb-8 px-2 sm:px-0">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                    <TrendingUp className="w-3.5 h-3.5" />
                    {t("home.topSellers.eyebrow")}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                    {t("home.topSellers.title")}
                </h2>
                <p className="text-foreground/60 mt-1.5 text-sm sm:text-base">
                    {t("home.topSellers.subtitle")}
                </p>
            </div>

            {/* Table */}
            <div className="rounded-2xl border border-border overflow-hidden bg-surface shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-muted/40 border-b border-border">
                                <th className="text-left px-4 py-3 font-semibold text-foreground/60 w-12">#</th>
                                <th className="text-left px-4 py-3 font-semibold text-foreground/60">{t("home.topSellers.colSeller")}</th>
                                <th className="text-left px-4 py-3 font-semibold text-foreground/60 hidden sm:table-cell">{t("home.topSellers.colLocation")}</th>
                                <th className="text-right px-4 py-3 font-semibold text-foreground/60">{t("home.topSellers.colSales")}</th>
                                <th className="text-right px-4 py-3 font-semibold text-foreground/60 hidden md:table-cell">{t("home.topSellers.colRating")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {MOCK_SELLERS.map((seller, idx) => {
                                const rankStyle = RANK_STYLES[seller.rank] ?? { text: "text-foreground/50", bg: "", font: "font-medium" };
                                const isTop1 = seller.rank === 1;

                                return (
                                    <tr
                                        key={seller.rank}
                                        className={`border-b border-border/50 last:border-0 transition-colors hover:bg-primary/5 ${idx < 3 ? "bg-primary/[0.02]" : ""}`}
                                    >
                                        {/* Rank */}
                                        <td className="px-4 py-3.5">
                                            <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs ${rankStyle.font} ${rankStyle.text} ${rankStyle.bg}`}>
                                                {seller.rank}
                                            </span>
                                        </td>

                                        {/* Seller name + avatar + trophy for #1 */}
                                        <td className="px-4 py-3.5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs shrink-0">
                                                    {seller.avatar}
                                                </div>
                                                <span className="font-semibold text-foreground">{seller.name}</span>
                                                {isTop1 && (
                                                    <Trophy className="w-4 h-4 text-yellow-500 fill-yellow-500/30 shrink-0" />
                                                )}
                                            </div>
                                        </td>

                                        {/* Location */}
                                        <td className="px-4 py-3.5 text-foreground/60 hidden sm:table-cell">{seller.location}</td>

                                        {/* Sales */}
                                        <td className="px-4 py-3.5 text-right font-semibold text-foreground">
                                            {seller.sales}
                                            <span className="text-foreground/40 font-normal ml-1 text-xs">{t("home.topSellers.salesUnit")}</span>
                                        </td>

                                        {/* Rating */}
                                        <td className="px-4 py-3.5 text-right hidden md:table-cell">
                                            <span className="inline-flex items-center gap-1 text-yellow-500 font-semibold">
                                                <Star className="w-3.5 h-3.5 fill-current" />
                                                {seller.rating.toFixed(2)}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <p className="text-xs text-foreground/40 mt-3 text-center">{t("home.topSellers.disclaimer")}</p>
        </section>
    );
}
