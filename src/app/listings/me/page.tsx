"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { userService, UserListing } from "@/services/user.service";
import { Tag, Loader2, AlertCircle, Edit, Play, Pause, Store } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function MyListingsPage() {
    const { user, isAuthenticated, isLoading: authLoading } = useAuth();
    const { t } = useI18n();
    const [listings, setListings] = useState<UserListing[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            window.location.href = "/login";
        }
    }, [isAuthenticated, authLoading]);

    useEffect(() => {
        let isMounted = true;
        const fetchListings = async () => {
            if (!user) return;
            try {
                const data = await userService.getUserListings(user.id);
                if (isMounted) {
                    setListings(data);
                    setLoading(false);
                }
            } catch (err) {
                if (isMounted) {
                    setError("Failed to fetch listings");
                    setLoading(false);
                }
            }
        };

        if (user) {
            fetchListings();
        }
    }, [user]);

    if (authLoading || loading) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        );
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "ACTIVE":
                return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20";
            case "DRAFT":
            case "PAUSED":
                return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20";
            case "SOLD":
                return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20";
            default:
                return "bg-muted text-foreground/80 border border-border/50";
        }
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-sm border border-primary/20">
                        <Tag size={28} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">{t("dashboard.listings.title")}</h1>
                        <p className="text-muted-foreground mt-1 text-sm md:text-base">{t("dashboard.listings.description")}</p>
                    </div>
                </div>
                <Button asChild className="h-11 px-8 shadow-md">
                    <Link href="/listings/create" className="flex items-center gap-2">
                        <Store size={18} />
                        {t("dashboard.createListing.submitButton") || "Criar Anúncio"}
                    </Link>
                </Button>
            </div>

            {error && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 flex items-center gap-2">
                    <AlertCircle size={20} />
                    <span>{t("dashboard.errorLoading")}</span>
                </div>
            )}

            <div className="bg-surface/50 backdrop-blur-xl rounded-2xl shadow-xl border border-border/50 overflow-hidden">
                {listings.length === 0 && !error ? (
                    <div className="p-16 text-center flex flex-col items-center">
                        <Tag size={56} className="text-muted-foreground/30 mb-6" />
                        <h3 className="text-xl font-semibold text-foreground">{t("dashboard.listings.emptyTitle")}</h3>
                        <p className="text-muted-foreground mt-2 max-w-sm mb-6">{t("dashboard.listings.emptyDesc")}</p>
                        <Button asChild variant="outline" className="h-10 px-6 text-primary border-primary/20 hover:bg-primary/10">
                            <Link href="/listings/create" className="flex items-center gap-2">
                                <Store size={16} />
                                {t("dashboard.createListing.submitButton") || "Criar Anúncio"}
                            </Link>
                        </Button>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-surface border-b border-border/50">
                                    <th className="py-5 px-6 text-sm font-semibold text-foreground/80 uppercase tracking-wider">{t("dashboard.listings.colBird")}</th>
                                    <th className="py-5 px-6 text-sm font-semibold text-foreground/80 uppercase tracking-wider">{t("dashboard.listings.colDate")}</th>
                                    <th className="py-5 px-6 text-sm font-semibold text-foreground/80 uppercase tracking-wider">{t("dashboard.listings.colPrice")}</th>
                                    <th className="py-5 px-6 text-sm font-semibold text-foreground/80 uppercase tracking-wider">{t("dashboard.listings.colStatus")}</th>
                                    <th className="py-5 px-6 text-sm font-semibold text-foreground/80 uppercase tracking-wider text-right">{t("dashboard.listings.colAction")}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listings.map((listing) => (
                                    <tr key={listing.id} className="border-b border-border/30 hover:bg-muted/50 transition-colors">
                                        <td className="py-4 px-6">
                                            <span className="text-sm font-semibold text-foreground font-mono bg-background px-2 py-1 rounded border border-border/50">
                                                #{listing.birdId.split('-')[0]}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-sm text-foreground/70">
                                            {new Date(listing.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="py-4 px-6 text-sm font-bold text-foreground">
                                            R$ {listing.price?.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase ${getStatusColor(listing.status)}`}>
                                                {/* @ts-ignore */}
                                                {t(`dashboard.status.${listing.status}`)}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <Link href={`/listings/${listing.id}`} className="p-2 text-muted-foreground hover:text-primary transition-colors hover:bg-primary/5 rounded-full" title="Visualizar">
                                                    <Edit size={18} />
                                                </Link>
                                                {listing.status === 'ACTIVE' ? (
                                                    <button className="p-2 text-muted-foreground hover:text-amber-500 transition-colors hover:bg-amber-500/10 rounded-full" title="Pausar">
                                                        <Pause size={18} />
                                                    </button>
                                                ) : listing.status === 'PAUSED' || listing.status === 'DRAFT' ? (
                                                    <button className="p-2 text-muted-foreground hover:text-emerald-500 transition-colors hover:bg-emerald-500/10 rounded-full" title="Ativar">
                                                        <Play size={18} />
                                                    </button>
                                                ) : null}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
