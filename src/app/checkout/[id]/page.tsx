"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Listing } from "@/types/interfaces";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ShieldCheck, Truck, CreditCard, Loader2 } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

export default function CheckoutPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const { t } = useI18n();
    const [listing, setListing] = useState<Listing | null>(null);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Mock buyer ID for V1 (MVP) since we don't have a real auth flow yet on the frontend
    const MOCK_BUYER_ID = 999;

    useEffect(() => {
        async function fetchListing() {
            try {
                const res = await api.get(`/api/v1/listings/${params.id}`);
                const l = res.data;

                let bird = null;
                try {
                    const birdRes = await api.get(`/api/v1/birds/${l.birdId}`);
                    bird = birdRes.data;
                } catch (err) {
                    console.warn("No bird details");
                }

                setListing({
                    id: l.id,
                    sellerId: l.sellerId,
                    birdId: l.birdId,
                    breed: bird?.species || 'Ave',
                    mutations: l.attributes?.map((a: any) => a.value) || [],
                    gender: bird?.gender || 'UNKNOWN',
                    birthDate: bird?.birthDate || new Date().toISOString(),
                    status: l.status,
                    price: l.priceAmount.toString(),
                    currency: l.priceCurrency,
                    createdAt: l.createdAt
                } as Listing);
            } catch (err) {
                setError(t("checkout.errorLoading"));
            } finally {
                setLoading(false);
            }
        }
        fetchListing();
    }, [params.id, t]);

    const handleCheckout = async () => {
        if (!listing) return;
        setProcessing(true);
        setError(null);

        try {
            // Create Order payload matching Canario Marketplace API
            const payload = {
                buyerId: MOCK_BUYER_ID,
                items: [
                    {
                        listingId: listing.id,
                        quantity: 1,
                        price: {
                            amount: parseFloat(listing.price),
                            currency: listing.currency
                        }
                    }
                ]
            };

            const response = await api.post("/api/v1/orders", payload);

            // If success, order is created and reserved
            alert(t("checkout.successAlert", { id: response.data.id }));
            router.push("/");

        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || t("checkout.errorProcess"));
        } finally {
            setProcessing(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-foreground/60">{t("checkout.loading")}</div>;
    if (error && !listing) return <div className="p-8 text-center text-danger">{error}</div>;
    if (!listing) return null;

    return (
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-4xl">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-6 sm:mb-8">{t("checkout.title")}</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Order Details */}
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader className="border-b border-border/50 bg-surface/50 pb-4">
                            <CardTitle className="text-lg">{t("checkout.birdSummary")}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start text-center sm:text-left">
                                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                                    <span className="text-3xl sm:text-4xl">🦜</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-foreground text-lg">{listing.breed}</h3>
                                    <p className="text-sm text-foreground/60">
                                        {listing.gender === 'MALE' ? t("checkout.male") : t("checkout.female")} • {t("checkout.mutations", { mutations: listing.mutations.length > 0 ? listing.mutations.join(", ") : t("checkout.noMutations") })}
                                    </p>
                                    <p className="text-sm text-foreground/50 mt-1">{t("checkout.soldBy", { id: listing.sellerId.toString() })}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-start gap-4 p-4 rounded-2xl bg-surface border border-border">
                                <Truck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-medium">{t("checkout.deliveryTitle")}</h4>
                                    <p className="text-sm text-foreground/60">{t("checkout.deliveryDesc")}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 rounded-2xl bg-surface border border-border">
                                <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-medium">{t("checkout.guaranteeTitle")}</h4>
                                    <p className="text-sm text-foreground/60">{t("checkout.guaranteeDesc")}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Payment Summary */}
                <div>
                    <Card className="sticky top-24 border-primary/20 shadow-md">
                        <CardHeader>
                            <CardTitle className="text-lg">{t("checkout.financeSummary")}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 pt-0 space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-foreground/70">{t("checkout.subtotal")}</span>
                                <span className="font-medium">
                                    <span className="mr-1">{listing.currency}</span>
                                    {parseFloat(listing.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-foreground/70">{t("checkout.platformFee")}</span>
                                <span className="font-medium text-green-600">{t("checkout.free")}</span>
                            </div>

                            <div className="border-t border-border pt-4 mt-4 flex justify-between items-center">
                                <span className="font-bold">{t("checkout.totalToPay")}</span>
                                <span className="text-2xl font-black text-primary">
                                    <span className="mr-1">{listing.currency}</span>
                                    {parseFloat(listing.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </span>
                            </div>

                            {error && (
                                <div className="p-3 bg-danger/10 text-danger text-sm rounded-xl border border-danger/20">
                                    {error}
                                </div>
                            )}
                        </CardContent>

                        <CardFooter className="p-6 pt-0 bg-surface/50 border-t border-border/50">
                            <Button
                                className="w-full py-6 text-base"
                                size="lg"
                                onClick={handleCheckout}
                                disabled={processing || listing.status !== "ACTIVE"}
                            >
                                {processing ? (
                                    <span className="flex items-center gap-2">
                                        <Loader2 className="w-5 h-5 animate-spin" /> {t("checkout.confirming")}
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <CreditCard className="w-5 h-5" /> {t("checkout.finishPurchase")}
                                    </span>
                                )}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>

            </div>
        </div>
    );
}
