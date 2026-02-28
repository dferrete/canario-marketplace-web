"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useI18n } from "@/contexts/I18nContext";
import { userService } from "@/services/user.service";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Store, Loader2, AlertCircle, Bird, Tag, Calendar, HelpCircle, Hash, DollarSign } from "lucide-react";

export default function EditListingPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { user, isAuthenticated, isLoading: authLoading } = useAuth();
    const { t } = useI18n();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Unwrapped params for Next 15 compatibility
    const { id: listingId } = React.use(params);

    // Bird Form State (Read Only)
    const [species, setSpecies] = useState("");
    const [gender, setGender] = useState<"MALE" | "FEMALE" | "UNKNOWN">("UNKNOWN");
    const [birthDate, setBirthDate] = useState("");
    const [ringCode, setRingCode] = useState("");

    // Listing Form State (Editable)
    const [price, setPrice] = useState("");
    const [mutations, setMutations] = useState("");

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push("/login?redirect=/listings/me");
            return;
        }

        let isMounted = true;
        const fetchListingData = async () => {
            try {
                // Fetch Listing
                const listingRes = await api.get(`/api/v1/listings/${listingId}`);
                const listingData = listingRes.data;

                // Protect UI - Ensure it's PAUSED or DRAFT and belongs to the user
                if (listingData.status !== 'PAUSED' && listingData.status !== 'DRAFT') {
                    throw new Error("Apenas anúncios Pausados ou em Rascunho podem ser editados.");
                }

                if (listingData.sellerId !== user?.id) {
                    throw new Error("Você não tem permissão para editar este anúncio.");
                }

                if (isMounted) {
                    setPrice(listingData.priceAmount?.toString() || "");

                    // Extract Mutations Map
                    const mutationAttrs = listingData.attributes?.filter((a: any) => a.key === 'MUTATION') || [];
                    const mutationsStr = mutationAttrs.map((a: any) => a.value).join(', ');
                    setMutations(mutationsStr);
                }

                // Fetch Bird
                const birdRes = await api.get(`/api/v1/birds/${listingData.birdId}`);
                const birdData = birdRes.data;

                if (isMounted) {
                    setSpecies(birdData.species || "");
                    setGender(birdData.gender || "UNKNOWN");
                    setBirthDate(birdData.birthDate || "");
                    setRingCode(birdData.ringCode || "");
                    setIsLoadingData(false);
                }

            } catch (err: any) {
                console.error("Erro ao carregar os dados:", err);
                if (isMounted) {
                    setError(err.message || err.response?.data?.message || "Erro inesperado ao carregar dados do anúncio.");
                    setIsLoadingData(false);
                }
            }
        };

        if (isAuthenticated && user) {
            fetchListingData();
        }

        return () => {
            isMounted = false;
        };

    }, [isAuthenticated, authLoading, router, listingId, user]);

    if (authLoading || isLoadingData) {
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
            const parsedPrice = parseFloat(price.replace(',', '.'));

            // Processa as tags de mutações divididas por vírgula
            const parsedMutations = mutations
                .split(',')
                .map(m => m.trim())
                .filter(m => m.length > 0)
                .map(m => ({ key: 'MUTATION', value: m }));

            const updatePayload = {
                priceAmount: parsedPrice,
                priceCurrency: 'BRL',
                attributes: parsedMutations
            };

            await userService.updateListing(listingId, updatePayload);

            // Sucesso! Volta para os meus anúncios
            router.push('/listings/me');
        } catch (err: any) {
            console.error("Erro ao atualizar anúncio:", err);
            setError(err.response?.data?.message || "Ocorreu um erro ao atualizar o anúncio.");
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className="mb-8 flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 shadow-sm border border-blue-500/20">
                    <Store size={28} />
                </div>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">{t("dashboard.editListing.title")}</h1>
                    <p className="text-muted-foreground mt-1 text-sm md:text-base">{t("dashboard.editListing.description")}</p>
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
                    {/* Sessão da Ave - READ ONLY */}
                    <Card className="border-border/50 bg-surface/50 backdrop-blur-xl shadow-xl overflow-hidden opacity-70">
                        <CardHeader className="border-b border-border/50 bg-muted/20 pb-4">
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <Bird className="w-5 h-5 text-primary" />
                                {t("dashboard.createListing.birdSection")} (Somente Leitura)
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">

                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none text-foreground/80 flex items-center gap-2">
                                    {t("dashboard.createListing.fields.species")}
                                </label>
                                <input
                                    type="text"
                                    disabled
                                    className="flex h-11 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm text-muted-foreground cursor-not-allowed"
                                    value={species}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none text-foreground/80 flex items-center gap-2">
                                    <HelpCircle className="w-4 h-4 text-muted-foreground" />
                                    {t("dashboard.createListing.fields.gender")}
                                </label>
                                <select
                                    disabled
                                    className="flex h-11 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm text-muted-foreground cursor-not-allowed appearance-none"
                                    value={gender}
                                >
                                    <option value="UNKNOWN">{t("dashboard.createListing.fields.unknown")}</option>
                                    <option value="MALE">{t("dashboard.createListing.fields.male")}</option>
                                    <option value="FEMALE">{t("dashboard.createListing.fields.female")}</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none text-foreground/80 flex items-center gap-2">
                                    <Hash className="w-4 h-4 text-muted-foreground" />
                                    {t("dashboard.createListing.fields.ringCode")}
                                </label>
                                <input
                                    type="text"
                                    disabled
                                    className="flex h-11 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm font-mono text-muted-foreground cursor-not-allowed"
                                    value={ringCode}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none text-foreground/80 flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-muted-foreground" />
                                    {t("dashboard.createListing.fields.birthDate")}
                                </label>
                                <input
                                    type="date"
                                    disabled
                                    className="flex h-11 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm text-muted-foreground cursor-not-allowed"
                                    value={birthDate}
                                />
                            </div>

                        </CardContent>
                    </Card>

                    {/* Sessão do Anúncio - EDITÁVEL */}
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
                        <CardFooter className="bg-muted/10 border-t border-border/50 pt-6 pb-6 flex justify-end gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.push('/listings/me')}
                                disabled={isSubmitting}
                            >
                                {t("profile.cancelButton")}
                            </Button>
                            <Button
                                type="submit"
                                className="font-semibold px-8"
                                disabled={isSubmitting || !price}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Salvando...
                                    </>
                                ) : (
                                    t("profile.saveButton")
                                )}
                            </Button>
                        </CardFooter>
                    </Card>

                </div>
            </form>
        </div>
    );
}
