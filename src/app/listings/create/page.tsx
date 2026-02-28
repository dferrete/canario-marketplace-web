"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useI18n } from "@/contexts/I18nContext";
import { userService } from "@/services/user.service";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Store, Loader2, AlertCircle, Bird, Tag, Calendar, HelpCircle, Hash, DollarSign } from "lucide-react";

export default function CreateListingPage() {
    const router = useRouter();
    const { user, isAuthenticated, isLoading: authLoading } = useAuth();
    const { t } = useI18n();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Bird Form State
    const [species, setSpecies] = useState("");
    const [gender, setGender] = useState<"MALE" | "FEMALE" | "UNKNOWN">("UNKNOWN");
    const [birthDate, setBirthDate] = useState("");
    const [ringCode, setRingCode] = useState("");

    // Listing Form State
    const [price, setPrice] = useState("");
    const [mutations, setMutations] = useState("");

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push("/login?redirect=/listings/create");
        }
    }, [isAuthenticated, authLoading, router]);

    if (authLoading || !user) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            // Passo 1: Cadastrar a Ave no Inventário
            const birdPayload = {
                ownerId: user.id,
                species: species.trim() || 'Desconhecida',
                gender: gender,
                birthDate: birthDate,
                ringCode: ringCode.trim()
            };
            const createdBird = await userService.createBird(birdPayload);

            // Passo 2: Criar o Anúncio de Venda
            const parsedPrice = parseFloat(price.replace(',', '.'));

            // Processa as tags de mutações divididas por vírgula
            const parsedMutations = mutations
                .split(',')
                .map(m => m.trim())
                .filter(m => m.length > 0)
                .map(m => ({ key: 'MUTATION', value: m }));

            const listingPayload = {
                birdId: createdBird.id,
                sellerId: user.id,
                priceAmount: parsedPrice,
                priceCurrency: 'BRL',
                attributes: parsedMutations
            };

            await userService.createListing(listingPayload);

            // Sucesso! Volta para os meus anúncios
            router.push('/listings/me');
        } catch (err: any) {
            console.error("Erro ao criar anúncio:", err);
            setError(err.response?.data?.message || t("dashboard.createListing.error"));
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className="mb-8 flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-sm border border-primary/20">
                    <Store size={28} />
                </div>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">{t("dashboard.createListing.title")}</h1>
                    <p className="text-muted-foreground mt-1 text-sm md:text-base">{t("dashboard.createListing.description")}</p>
                </div>
            </div>

            {error && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 flex items-center gap-2">
                    <AlertCircle size={20} />
                    <span>{error}</span>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="space-y-8">
                    {/* Sessão da Ave */}
                    <Card className="border-border/50 bg-surface/50 backdrop-blur-xl shadow-xl overflow-hidden">
                        <CardHeader className="border-b border-border/50 bg-muted/20">
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <Bird className="w-5 h-5 text-primary" />
                                {t("dashboard.createListing.birdSection")}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">

                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none text-foreground/80 flex items-center gap-2">
                                    {t("dashboard.createListing.fields.species")} *
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="flex h-11 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all"
                                    placeholder={t("dashboard.createListing.fields.speciesPlaceholder")}
                                    value={species}
                                    onChange={(e) => setSpecies(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none text-foreground/80 flex items-center gap-2">
                                    <HelpCircle className="w-4 h-4 text-muted-foreground" />
                                    {t("dashboard.createListing.fields.gender")} *
                                </label>
                                <select
                                    required
                                    className="flex h-11 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value as any)}
                                >
                                    <option value="UNKNOWN">{t("dashboard.createListing.fields.unknown")}</option>
                                    <option value="MALE">{t("dashboard.createListing.fields.male")}</option>
                                    <option value="FEMALE">{t("dashboard.createListing.fields.female")}</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none text-foreground/80 flex items-center gap-2">
                                    <Hash className="w-4 h-4 text-muted-foreground" />
                                    {t("dashboard.createListing.fields.ringCode")} *
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="flex h-11 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all font-mono"
                                    placeholder={t("dashboard.createListing.fields.ringCodePlaceholder")}
                                    value={ringCode}
                                    onChange={(e) => setRingCode(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none text-foreground/80 flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-muted-foreground" />
                                    {t("dashboard.createListing.fields.birthDate")} *
                                </label>
                                <input
                                    type="date"
                                    required
                                    max={new Date().toISOString().split('T')[0]}
                                    className="flex h-11 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all"
                                    value={birthDate}
                                    onChange={(e) => setBirthDate(e.target.value)}
                                />
                            </div>

                        </CardContent>
                    </Card>

                    {/* Sessão do Anúncio */}
                    <Card className="border-border/50 bg-surface/50 backdrop-blur-xl shadow-xl overflow-hidden text-right md:text-left">
                        <CardHeader className="border-b border-border/50 bg-muted/20">
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <Tag className="w-5 h-5 text-primary" />
                                {t("dashboard.createListing.listingSection")}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">

                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none text-foreground/80 flex items-center gap-2">
                                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                                    {t("dashboard.createListing.fields.price")} *
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">R$</span>
                                    <input
                                        type="number"
                                        required
                                        min="0.01"
                                        step="0.01"
                                        className="flex h-11 w-full rounded-md border border-input bg-background/50 pl-10 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all"
                                        placeholder={t("dashboard.createListing.fields.pricePlaceholder")}
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none text-foreground/80 flex items-center gap-2">
                                    {t("dashboard.createListing.fields.mutations")}
                                </label>
                                <input
                                    type="text"
                                    className="flex h-11 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all"
                                    placeholder={t("dashboard.createListing.fields.mutationsPlaceholder")}
                                    value={mutations}
                                    onChange={(e) => setMutations(e.target.value)}
                                />
                            </div>

                        </CardContent>
                        <CardFooter className="bg-muted/10 border-t border-border/50 pt-6 pb-6 flex justify-end">
                            <Button
                                type="submit"
                                size="lg"
                                className="w-full md:w-auto font-semibold px-8"
                                disabled={isSubmitting || !price || !species || !ringCode || !birthDate}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        {t("dashboard.createListing.creatingState")}
                                    </>
                                ) : (
                                    t("dashboard.createListing.submitButton")
                                )}
                            </Button>
                        </CardFooter>
                    </Card>

                </div>
            </form>
        </div>
    );
}
