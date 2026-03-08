"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useI18n } from "@/contexts/I18nContext";
import { partnerService } from "@/services/partner.service";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Lock, KeyRound, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const INPUT_CLS = "w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all";
const LABEL_CLS = "text-sm font-semibold text-foreground/80 mb-1.5 block";

function SetupAccountForm() {
    const { t } = useI18n();
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        if (!token) {
            setError(t("setupAccount.error.missingToken"));
            setIsLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError(t("setupAccount.error.passwordMismatch"));
            setIsLoading(false);
            return;
        }

        if (password.length < 6) {
            setError(t("setupAccount.error.passwordLength"));
            setIsLoading(false);
            return;
        }

        try {
            await partnerService.setupPassword(token, password);
            setSuccess(true);
        } catch (err: any) {
            console.error("Setup password failed:", err);
            setError(err.response?.data?.message || t("setupAccount.error.generic"));
        } finally {
            setIsLoading(false);
        }
    };

    if (!token && !success) {
        return (
            <div className="text-center p-8 bg-surface border border-border rounded-3xl shadow-sm text-red-600 bg-red-50">
                <p className="font-semibold mb-2">{t("setupAccount.error.invalidLink")}</p>
                <p className="text-sm opacity-80">{t("setupAccount.error.missingTokenDesc")}</p>
            </div>
        );
    }

    if (success) {
        return (
            <div className="flex flex-col items-center gap-6 py-10 px-6 bg-surface border border-border rounded-3xl shadow-sm text-center animate-in fade-in zoom-in-95">
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">{t("setupAccount.success.title")}</h3>
                    <p className="text-foreground/60 max-w-sm mx-auto">{t("setupAccount.success.desc")}</p>
                </div>
                <Link href="/auth">
                    <Button size="lg" className="rounded-full shadow-md font-semibold mt-4">
                        {t("setupAccount.success.loginButton")}
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-3xl p-8 shadow-sm space-y-6">
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                    <Lock className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t("setupAccount.form.title")}</h2>
                <p className="text-foreground/60 text-sm mt-1">{t("setupAccount.form.subtitle")}</p>
            </div>

            {error && (
                <div className="p-4 text-sm text-red-800 rounded-lg bg-red-50 border border-red-200 text-center">
                    {error}
                </div>
            )}

            <div className="space-y-4">
                <div>
                    <label className={LABEL_CLS}>{t("setupAccount.form.passwordLabel")}</label>
                    <div className="relative">
                        <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={cn(INPUT_CLS, "pl-10")}
                            placeholder="••••••••"
                            required
                        />
                    </div>
                </div>
                <div>
                    <label className={LABEL_CLS}>{t("setupAccount.form.confirmPasswordLabel")}</label>
                    <div className="relative">
                        <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={cn(INPUT_CLS, "pl-10")}
                            placeholder="••••••••"
                            required
                        />
                    </div>
                </div>
            </div>

            <Button type="submit" size="lg" disabled={isLoading} className="w-full rounded-full font-semibold shadow-md hover:-translate-y-0.5 transition-transform">
                {isLoading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                    <ArrowRight className="w-4 h-4 mr-2" />
                )}
                {t("setupAccount.form.submitButton")}
            </Button>
        </form>
    );
}

export default function SetupAccountPage() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 bg-muted/30">
            <div className="max-w-md w-full">
                <Suspense fallback={
                    <div className="flex justify-center p-12">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                }>
                    <SetupAccountForm />
                </Suspense>
            </div>
        </div>
    );
}
