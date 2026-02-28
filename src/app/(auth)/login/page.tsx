"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useI18n } from "@/contexts/I18nContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Bird, Loader2 } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth();
    const { t } = useI18n();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            await login({ email, password });
            router.push("/");
            router.refresh(); // Force layout update
        } catch (err: any) {
            setError(err?.response?.data?.message || err.message || "Falha ao realizar login. Verifique suas credenciais.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-[80vh] items-center justify-center p-4">
            <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-500">
                <div className="mb-8 flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Bird className="h-8 w-8" />
                    </div>
                </div>

                <Card className="border-border/50 bg-surface/50 backdrop-blur-xl shadow-2xl">
                    <CardHeader className="space-y-2 text-center">
                        <CardTitle className="text-3xl font-bold tracking-tight">{t("auth.login.title")}</CardTitle>
                        <CardDescription className="text-foreground/60">
                            {t("auth.login.description")}
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            {error && (
                                <div className="rounded-lg bg-red-500/10 p-3 text-sm text-red-500 border border-red-500/20">
                                    {error}
                                </div>
                            )}
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none text-foreground/80">
                                    {t("auth.login.emailLabel")}
                                </label>
                                <input
                                    type="email"
                                    required
                                    placeholder={t("auth.login.emailPlaceholder")}
                                    className="flex h-11 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all hover:bg-background/80"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-medium leading-none text-foreground/80">
                                        {t("auth.login.passwordLabel")}
                                    </label>
                                    <Link href="/forgot-password" className="font-medium text-primary hover:text-primary-hover text-sm transition-colors">
                                        {t("auth.login.forgotPassword")}
                                    </Link>
                                </div>
                                <input
                                    type="password"
                                    required
                                    placeholder={t("auth.login.passwordPlaceholder")}
                                    className="flex h-11 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all hover:bg-background/80"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-4">
                            <Button
                                type="submit"
                                className="w-full h-11 text-base font-medium shadow-lg hover:shadow-primary/25 transition-all"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        {t("auth.login.submittingButton")}
                                    </>
                                ) : (
                                    t("auth.login.submitButton")
                                )}
                            </Button>
                            <p className="text-center text-sm text-foreground/60 w-full mt-4">
                                {t("auth.login.noAccount")}{" "}
                                <Link href="/register" className="font-semibold text-primary hover:text-primary-hover transition-colors">
                                    {t("auth.login.registerLink")}
                                </Link>
                            </p>
                        </CardFooter>
                    </form>

                    {/* Social Auth Options */}
                    <div className="px-6 pb-6">
                        <div className="relative mb-6">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-border"></span>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-surface px-2 text-muted-foreground">{t("auth.login.orContinueWith")}</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Button variant="outline" type="button" className="h-11 w-full bg-white text-gray-800 hover:bg-gray-50 border-gray-200" onClick={() => console.log("Google Auth Placeholder")}>
                                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                                    <path
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        fill="#FBBC05"
                                    />
                                    <path
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        fill="#EA4335"
                                    />
                                </svg>
                                Google
                            </Button>
                            <Button variant="outline" type="button" className="h-11 w-full bg-[#1877F2] text-white hover:bg-[#1877F2]/90 border-[#1877F2]" onClick={() => console.log("Facebook Auth Placeholder")}>
                                <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                                Facebook
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
