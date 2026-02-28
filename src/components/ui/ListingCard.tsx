"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Listing } from "@/types/interfaces";
import Link from "next/link";
import { Calendar, Tag, Bird, ChevronRight, Heart } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useRouter } from "next/navigation";

interface ListingCardProps {
    listing: Listing;
}

export function ListingCard({ listing }: ListingCardProps) {
    const { t } = useI18n();
    const router = useRouter();
    const { isAuthenticated } = useAuth();
    const { favoriteIds, toggleFavorite } = useFavorites();
    const isAvailable = listing.status === "ACTIVE";
    const isFavorited = favoriteIds?.has(listing.id);

    // Mapeamento de Cores por Gênero para enfeitar o Card
    const genderColor =
        listing.gender === 'MALE' ? 'bg-blue-500/10 text-blue-600 border-blue-500/20' :
            listing.gender === 'FEMALE' ? 'bg-pink-500/10 text-pink-600 border-pink-500/20' :
                'bg-slate-500/10 text-slate-600 border-slate-500/20';

    return (
        <Card className={`relative flex flex-col h-full overflow-hidden transition-all duration-500 border-border/50 bg-surface/60 backdrop-blur-xl hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1.5 ${!isAvailable ? 'opacity-75 grayscale-[40%]' : ''}`}>
            <Link href={`/listings/${listing.id}`} className="group flex flex-col h-full w-full outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">

                {/* Image Placeholder Section */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-muted/50 to-muted/10 flex items-center justify-center">
                    {/* Decorative Background Elements */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors duration-500"></div>

                    {/* Icon */}
                    <Bird className="w-16 h-16 text-primary/40 relative z-10 group-hover:scale-110 transition-transform duration-500 drop-shadow-sm" />

                    {/* Favorite Button Overlay */}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            if (!isAuthenticated) {
                                router.push('/login');
                                return;
                            }
                            toggleFavorite(listing.id);
                        }}
                        className={`absolute top-3 left-3 z-30 p-2 rounded-full border backdrop-blur-md transition-all shadow-sm ${isFavorited
                            ? 'bg-surface opacity-100 text-danger border-danger/30'
                            : 'bg-surface/80 hover:bg-surface text-foreground/40 hover:text-danger hover:border-danger/30 border-border/50 opacity-0 group-hover:opacity-100 sm:opacity-100'
                            }`}
                        title={isFavorited ? t("listingCard.removeFavorite") : t("listingCard.favorite")}
                    >
                        <Heart className={`w-4 h-4 transition-colors ${isFavorited ? 'fill-current' : ''}`} />
                    </button>

                    {/* Status Badge Overlays */}
                    <div className="absolute top-3 right-3 z-20">
                        <Badge
                            variant={
                                listing.status === "ACTIVE" ? "success" :
                                    listing.status === "RESERVED" ? "warning" :
                                        "secondary"
                            }
                            className="shadow-sm backdrop-blur-md"
                        >
                            {listing.status === "ACTIVE" ? t("listingCard.available") :
                                listing.status === "RESERVED" ? t("listingCard.reserved") :
                                    listing.status}
                        </Badge>
                    </div>

                    {/* Gender Badge Overlay */}
                    <div className="absolute bottom-3 left-3 z-20">
                        <span className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-full border backdrop-blur-md shadow-sm ${genderColor}`}>
                            {listing.gender === 'MALE' ? t("listingCard.male") : listing.gender === 'FEMALE' ? t("listingCard.female") : t("listingCard.undefined")}
                        </span>
                    </div>
                </div>

                <CardContent className="flex-1 flex flex-col p-5 gap-4">
                    {/* Title & Date */}
                    <div>
                        <h3 className="font-extrabold text-xl leading-tight line-clamp-1 truncate text-foreground group-hover:text-primary transition-colors" title={listing.breed}>
                            {listing.breed}
                        </h3>
                        <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground mt-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>Nascido em {new Date(listing.birthDate).getFullYear()}</span>
                        </div>
                    </div>

                    {/* Mutations Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                        {listing.mutations && listing.mutations.length > 0 ? (
                            listing.mutations.slice(0, 3).map((mutation, idx) => (
                                <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-primary/5 text-primary/80 border border-primary/10">
                                    {mutation}
                                </span>
                            ))
                        ) : (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-muted text-muted-foreground border border-border/50">
                                Sem mutações
                            </span>
                        )}
                        {listing.mutations && listing.mutations.length > 3 && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-muted text-foreground/60">
                                +{listing.mutations.length - 3}
                            </span>
                        )}
                    </div>
                </CardContent>

                <CardFooter className="flex items-center justify-between p-5 pt-0 mt-auto">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{t("listingCard.value")}</span>
                        <span className="font-black text-2xl text-foreground tracking-tight">
                            <span className="text-sm font-bold text-muted-foreground mr-1">R$</span>
                            {parseFloat(listing.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                    </div>

                    <Button
                        variant={isAvailable ? "default" : "secondary"}
                        className={`rounded-full w-10 h-10 p-0 shadow-md flex items-center justify-center transition-all ${isAvailable ? 'group-hover:scale-110 text-white' : 'opacity-50 pointer-events-none'}`}
                        disabled={!isAvailable}
                        title={isAvailable ? t("listingCard.viewDetails") : t("listingCard.unavailable")}
                    >
                        <ChevronRight className="w-5 h-5" />
                    </Button>
                </CardFooter>
            </Link>
        </Card>
    );
}
