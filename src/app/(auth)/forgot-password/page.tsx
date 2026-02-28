"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useI18n } from "@/contexts/I18nContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Bird, Loader2, ArrowLeft, MailCheck } from "lucide-react";

export default function ForgotPasswordPage() {
    const { t } = useI18n();
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulando delay de API
        setTimeout(() => {
            setIsLoading(false);
            setIsSent(true);
        }, 1500);
    };

    return (
        <div className="flex min-h-[80vh] items-center justify-center p-4">
            <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-500">
                <div className="mb-8 flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Bird className="h-8 w-8" />
                    </div>
                </div>

                <Card className="border-border/50 bg-surface/50 backdrop-blur-xl shadow-2xl relative overflow-hidden">
                    {isSent ? (
                        <div className="flex flex-col items-center justify-center p-8 text-center space-y-4 animate-in fade-in zoom-in duration-500">
                            <div className="h-16 w-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-2">
                                <MailCheck className="h-8 w-8" />
                            </div>
                            <h3 className="text-2xl font-bold tracking-tight">{t("auth.forgotPassword.successTitle")}</h3>
                            <p className="text-muted-foreground text-sm">
                                {t("auth.forgotPassword.successMessage", { email })}
                            </p>
                            <Link href="/login" className="w-full mt-4">
                                <Button className="w-full h-11 text-base font-medium shadow-lg hover:shadow-primary/25 transition-all">
                                    {t("auth.forgotPassword.successButton")}
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <React.Fragment>
                            <CardHeader className="space-y-2 text-center pb-4">
                                <CardTitle className="text-3xl font-bold tracking-tight">{t("auth.forgotPassword.title")}</CardTitle>
                                <CardDescription className="text-foreground/60">
                                    {t("auth.forgotPassword.description")}
                                </CardDescription>
                            </CardHeader>
                            <form onSubmit={handleSubmit}>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium leading-none text-foreground/80">
                                            {t("auth.forgotPassword.emailLabel")}
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            placeholder={t("auth.forgotPassword.emailPlaceholder")}
                                            className="flex h-11 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background transition-all hover:bg-background/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
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
                                                {t("auth.forgotPassword.submittingButton")}
                                            </>
                                        ) : (
                                            t("auth.forgotPassword.submitButton")
                                        )}
                                    </Button>

                                    <Link href="/login" className="flex items-center justify-center text-sm font-medium text-foreground/60 hover:text-primary transition-colors py-2">
                                        <ArrowLeft className="mr-2 h-4 w-4" />
                                        {t("auth.forgotPassword.backToLogin")}
                                    </Link>
                                </CardFooter>
                            </form>
                        </React.Fragment>
                    )}
                </Card>
            </div>
        </div>
    );
}
