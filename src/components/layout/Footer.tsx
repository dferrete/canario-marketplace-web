"use client";

import Link from "next/link";
import { Copy, Facebook, Instagram, Twitter } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

export function Footer() {
    const { t } = useI18n();

    return (
        <footer className="bg-surface border-t border-border mt-auto w-full pt-12 pb-8">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="font-bold text-primary text-xl mb-4">Canário Marketplace</h3>
                    <p className="text-foreground/70 text-sm leading-relaxed max-w-xs">
                        {t("footer.description")}
                    </p>
                    <div className="flex gap-4 mt-6">
                        <a href="#" className="p-2 bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary-hover rounded-full transition-colors">
                            <Facebook className="w-4 h-4" />
                        </a>
                        <a href="#" className="p-2 bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary-hover rounded-full transition-colors">
                            <Instagram className="w-4 h-4" />
                        </a>
                        <a href="#" className="p-2 bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary-hover rounded-full transition-colors">
                            <Twitter className="w-4 h-4" />
                        </a>
                    </div>
                </div>

                <div>
                    <h4 className="font-bold text-foreground mb-4">{t("footer.navigation")}</h4>
                    <ul className="space-y-3">
                        <li><Link href="/" className="text-foreground/70 hover:text-primary text-sm transition-colors">{t("footer.home")}</Link></li>
                        <li><Link href="/" className="text-foreground/70 hover:text-primary text-sm transition-colors">{t("footer.showcase")}</Link></li>
                        <li><Link href="#" className="text-foreground/70 hover:text-primary text-sm transition-colors">{t("footer.sell")}</Link></li>
                        <li><Link href="#" className="text-foreground/70 hover:text-primary text-sm transition-colors">{t("footer.orders")}</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-foreground mb-4">{t("footer.support")}</h4>
                    <ul className="space-y-3">
                        <li><Link href="#" className="text-foreground/70 hover:text-primary text-sm transition-colors">{t("footer.helpCenter")}</Link></li>
                        <li><Link href="#" className="text-foreground/70 hover:text-primary text-sm transition-colors">{t("footer.privacy")}</Link></li>
                        <li><Link href="#" className="text-foreground/70 hover:text-primary text-sm transition-colors">{t("footer.terms")}</Link></li>
                        <li><Link href="#" className="text-foreground/70 hover:text-primary text-sm transition-colors">{t("footer.rules")}</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-foreground mb-4">{t("footer.sellerBadge")}</h4>
                    <div className="p-4 bg-primary/5 rounded-2xl border border-primary/20 flex flex-col gap-2 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-secondary/40 to-transparent rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
                        <span className="text-primary font-bold">{t("footer.protected")}</span>
                        <span className="text-xs text-foreground/60 leading-tight">{t("footer.protectedDesc")}</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-12 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between">
                <p className="text-xs text-foreground/50 flex items-center gap-1">
                    <Copy className="w-3 h-3" />
                    {new Date().getFullYear()} Canário Marketplace. {t("footer.rights")}
                </p>
                <p className="text-xs text-foreground/40 mt-2 md:mt-0 font-mono">
                    V1.0.0-MVP // System-Gen
                </p>
            </div>
        </footer>
    );
}
