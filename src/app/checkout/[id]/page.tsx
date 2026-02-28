"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Listing } from "@/types/interfaces";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ShieldCheck, Truck, CreditCard, Loader2 } from "lucide-react";

export default function CheckoutPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [listing, setListing] = useState<Listing | null>(null);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Mock buyer ID for V1 (MVP) since we don't have a real auth flow yet on the frontend
    const MOCK_BUYER_ID = 999;

    useEffect(() => {
        async function fetchListing() {
            try {
                const response = await api.get(`/api/v1/listings/${params.id}`);
                setListing(response.data);
            } catch (err) {
                setError("Não foi possível carregar a oferta selecionada.");
            } finally {
                setLoading(false);
            }
        }
        fetchListing();
    }, [params.id]);

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
            alert(`Pedido finalizado com sucesso! ID: ${response.data.id}`);
            router.push("/");

        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || "Ocorreu um erro ao processar o seu pedido. Tente novamente.");
        } finally {
            setProcessing(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-foreground/60">Carregando detalhes prós-checkout...</div>;
    if (error && !listing) return <div className="p-8 text-center text-danger">{error}</div>;
    if (!listing) return null;

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl font-extrabold text-foreground mb-8">Revisão do Pedido</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Order Details */}
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader className="border-b border-border/50 bg-surface/50 pb-4">
                            <CardTitle className="text-lg">Resumo da Ave</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="flex gap-4 items-center">
                                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                                    <span className="text-3xl">🦜</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-foreground text-lg">{listing.breed}</h3>
                                    <p className="text-sm text-foreground/60">{listing.gender === 'MALE' ? 'Macho' : 'Fêmea'} • Mutações: {listing.mutations.length > 0 ? listing.mutations.join(", ") : "Nenhuma"}</p>
                                    <p className="text-sm text-foreground/50 mt-1">Vendido por S-ID#{listing.sellerId}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-start gap-4 p-4 rounded-2xl bg-surface border border-border">
                                <Truck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-medium">Retirada ou Entrega</h4>
                                    <p className="text-sm text-foreground/60">Os detalhes logísticos serão combinados com o vendedor após a confirmação do pagamento.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 rounded-2xl bg-surface border border-border">
                                <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-medium">Compra Garantida</h4>
                                    <p className="text-sm text-foreground/60">Seu dinheiro está protegido. Em caso de problemas com o animal, o valor é estornado integralmente (Idempotência e Garantia MVP).</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Payment Summary */}
                <div>
                    <Card className="sticky top-24 border-primary/20 shadow-md">
                        <CardHeader>
                            <CardTitle className="text-lg">Resumo Financeiro</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 pt-0 space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-foreground/70">Subtotal (1 item)</span>
                                <span className="font-medium">R$ {parseFloat(listing.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-foreground/70">Taxa da Plataforma</span>
                                <span className="font-medium text-green-600">Grátis</span>
                            </div>

                            <div className="border-t border-border pt-4 mt-4 flex justify-between items-center">
                                <span className="font-bold">Total a Pagar</span>
                                <span className="text-2xl font-black text-primary">R$ {parseFloat(listing.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
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
                                        <Loader2 className="w-5 h-5 animate-spin" /> Confirmando...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <CreditCard className="w-5 h-5" /> Finalizar Compra
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
