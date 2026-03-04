"use client";

import React from "react";
import Link from "next/link";
import { useI18n } from "@/contexts/I18nContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";

interface ComingSoonPageProps {
    featureKey: "raffles" | "auctions" | "batches";
    icon: React.ReactNode;
}

export default function ComingSoonPage({ featureKey, icon }: ComingSoonPageProps) {
    const { t } = useI18n();

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="max-w-lg w-full text-center animate-in fade-in slide-in-from-bottom-8 duration-700">

                {/* Animated icon container */}
                <div className="relative mx-auto w-28 h-28 mb-8">
                    <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping opacity-30" />
                    <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/20 flex items-center justify-center text-primary shadow-lg">
                        {icon}
                    </div>
                </div>

                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-6">
                    <Sparkles className="w-3.5 h-3.5" />
                    {t("comingSoon.badge")}
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
                    {t(`comingSoon.${featureKey}.title`)}
                </h1>

                {/* Description */}
                <p className="text-foreground/60 text-lg leading-relaxed mb-8 max-w-md mx-auto">
                    {t(`comingSoon.${featureKey}.description`)}
                </p>

                {/* CTA strip */}
                <div className="bg-surface border border-border/70 rounded-2xl p-5 mb-8 text-left space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        {t("comingSoon.whatsComingLabel")}
                    </p>
                    <ul className="space-y-1.5">
                        {(t(`comingSoon.${featureKey}.features`) as unknown as string[])?.map?.((item: string, idx: number) => (
                            <li key={idx} className="flex items-center gap-2 text-sm text-foreground/80">
                                <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button asChild variant="default" size="lg" className="rounded-full shadow-md font-semibold hover:-translate-y-0.5 transition-transform">
                        <Link href="/listings">
                            {t("comingSoon.cta")}
                        </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="rounded-full font-semibold">
                        <Link href="/" className="flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            {t("comingSoon.back")}
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
