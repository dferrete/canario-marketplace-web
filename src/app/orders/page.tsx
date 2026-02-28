"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { userService, UserOrder } from "@/services/user.service";
import { ShoppingBag, Loader2, AlertCircle } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

export default function MyOrdersPage() {
    const { user, isAuthenticated, isLoading: authLoading } = useAuth();
    const { t } = useI18n();
    const [orders, setOrders] = useState<UserOrder[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            window.location.href = "/login";
        }
    }, [isAuthenticated, authLoading]);

    useEffect(() => {
        let isMounted = true;
        const fetchOrders = async () => {
            if (!user) return;
            try {
                const data = await userService.getUserOrders(user.id);
                if (isMounted) {
                    setOrders(data);
                    setLoading(false);
                }
            } catch (err) {
                if (isMounted) {
                    setError("Failed to fetch orders");
                    setLoading(false);
                }
            }
        };

        if (user) {
            fetchOrders();
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
            case "COMPLETED":
            case "PAID":
                return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20";
            case "CREATED":
            case "PROCESSING":
                return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20";
            case "CANCELLED":
            case "FAILED":
                return "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20";
            default:
                return "bg-muted text-foreground/80 border border-border/50";
        }
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className="mb-8 flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-sm border border-primary/20">
                    <ShoppingBag size={28} />
                </div>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">{t("dashboard.orders.title")}</h1>
                    <p className="text-muted-foreground mt-1 text-sm md:text-base">{t("dashboard.orders.description")}</p>
                </div>
            </div>

            {error && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 flex items-center gap-2">
                    <AlertCircle size={20} />
                    <span>{t("dashboard.errorLoading")}</span>
                </div>
            )}

            <div className="bg-surface/50 backdrop-blur-xl rounded-2xl shadow-xl border border-border/50 overflow-hidden">
                {orders.length === 0 && !error ? (
                    <div className="p-16 text-center flex flex-col items-center">
                        <ShoppingBag size={56} className="text-muted-foreground/30 mb-6" />
                        <h3 className="text-xl font-semibold text-foreground">{t("dashboard.orders.emptyTitle")}</h3>
                        <p className="text-muted-foreground mt-2 max-w-sm">{t("dashboard.orders.emptyDesc")}</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-surface border-b border-border/50">
                                    <th className="py-5 px-6 text-sm font-semibold text-foreground/80 uppercase tracking-wider">{t("dashboard.orders.colId")}</th>
                                    <th className="py-5 px-6 text-sm font-semibold text-foreground/80 uppercase tracking-wider">{t("dashboard.orders.colDate")}</th>
                                    <th className="py-5 px-6 text-sm font-semibold text-foreground/80 uppercase tracking-wider">{t("dashboard.orders.colTotal")}</th>
                                    <th className="py-5 px-6 text-sm font-semibold text-foreground/80 uppercase tracking-wider">{t("dashboard.orders.colStatus")}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order.id} className="border-b border-border/30 hover:bg-muted/50 transition-colors">
                                        <td className="py-4 px-6">
                                            <span className="text-sm font-semibold text-foreground font-mono bg-background px-2 py-1 rounded border border-border/50">
                                                #{order.id.split('-')[0]}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-sm text-foreground/70">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="py-4 px-6 text-sm font-bold text-foreground">
                                            R$ {order.totalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase ${getStatusColor(order.status)}`}>
                                                {/* @ts-ignore */}
                                                {t(`dashboard.status.${order.status}`)}
                                            </span>
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
