"use client";

import { Listing } from '@/types/interfaces';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Tag, Info, User, ShieldCheck, BadgeCheck, CalendarDays, Hash, Heart, Share2 } from 'lucide-react';
import { useI18n } from '@/contexts/I18nContext';
import Link from 'next/link';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface ListingDetailsClientProps {
    listing: Listing;
}

export function ListingDetailsClient({ listing }: ListingDetailsClientProps) {
    const { t } = useI18n();
    const router = useRouter();
    const { isAuthenticated } = useAuth();
    const { favoriteIds, toggleFavorite } = useFavorites();

    const isAvailable = listing.status === "ACTIVE";
    const isFavorited = favoriteIds.has(listing.id);

    const handleFavoriteClick = () => {
        if (!isAuthenticated) {
            router.push('/login');
            return;
        }
        toggleFavorite(listing.id);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                {/* Left Column: Image & Badges */}
                <div className="flex flex-col gap-4">
                    {/* Action Bar */}
                    <div className="flex items-center justify-end gap-2 mb-1">
                        <Button variant="outline" size="icon" className="rounded-full w-10 h-10 text-foreground/60 hover:text-primary transition-colors">
                            <Share2 className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={handleFavoriteClick}
                            className={`rounded-full w-10 h-10 transition-colors ${isFavorited
                                    ? 'bg-surface opacity-100 text-danger border-danger/30 hover:bg-surface hover:text-danger'
                                    : 'text-foreground/60 hover:text-danger hover:bg-danger/5 hover:border-danger/30'
                                }`}
                            title={isFavorited ? t("listingCard.removeFavorite") : t("listingCard.favorite")}
                        >
                            <Heart className={`w-4 h-4 transition-colors ${isFavorited ? 'fill-current' : ''}`} />
                        </Button>
                    </div>

                    <div className="aspect-square bg-surface border border-border rounded-3xl flex items-center justify-center relative overflow-hidden shadow-sm">
                        <div className="w-56 h-56 rounded-full bg-secondary/20 border-8 border-surface shadow-lg flex items-center justify-center relative z-10">
                            <span className="text-8xl">🦜</span>
                        </div>

                        <div className="absolute top-6 left-6 z-20">
                            <Badge
                                className="text-sm px-4 py-1.5 shadow-sm"
                                variant={isAvailable ? "success" : "secondary"}
                            >
                                {isAvailable ? t("listingDetails.available") : listing.status}
                            </Badge>
                        </div>
                    </div>

                    <Card className="bg-primary/5 border-primary/20 shadow-none">
                        <CardContent className="p-4 flex items-start gap-4 text-sm text-primary">
                            <ShieldCheck className="w-6 h-6 shrink-0" />
                            <p className="leading-relaxed">
                                {t("listingDetails.guarantee")}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Details & Actions */}
                <div className="flex flex-col">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-2">
                        {listing.breed}
                    </h1>

                    <div className="flex items-center gap-2 mb-8 mt-2">
                        <span className="text-sm text-foreground/60">{t("listingDetails.soldBy")}</span>
                        <div className="flex items-center gap-1.5 bg-surface border border-border rounded-full px-3 py-1">
                            <User className="w-3.5 h-3.5 text-primary" />
                            <span className="font-semibold text-sm text-foreground">S-ID#{listing.sellerId}</span>
                        </div>
                    </div>

                    <div className="mb-8 p-5 sm:p-6 bg-surface border border-border rounded-3xl shadow-sm">
                        <div className="flex flex-col mb-6">
                            <span className="text-foreground/50 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-1">{t("listingDetails.unitValue")}</span>
                            <span className="text-4xl sm:text-5xl font-black text-primary tracking-tight">
                                <span className="mr-1 sm:mr-2 text-2xl sm:text-3xl">{listing.currency}</span>
                                {parseFloat(listing.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </span>
                        </div>

                        <Button
                            asChild
                            className="w-full text-base py-6 rounded-2xl shadow-md hover:shadow-lg transition-all"
                            size="lg"
                            variant={isAvailable ? "default" : "secondary"}
                            disabled={!isAvailable}
                        >
                            <Link href={isAvailable ? `/checkout/${listing.id}` : '#'}>
                                {isAvailable ? t("listingDetails.buyNow") : t("listingDetails.currentlyUnavailable")}
                            </Link>
                        </Button>

                        {isAvailable && (
                            <p className="text-center text-xs text-foreground/50 mt-4 flex items-center justify-center gap-1.5">
                                <Info className="w-3.5 h-3.5" />
                                {t("listingDetails.reviewBeforePayment")}
                            </p>
                        )}
                    </div>

                    <h3 className="font-bold text-lg mb-4 text-foreground/80 border-b border-border pb-2">
                        {t("listingDetails.animalInfo")}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Card className="bg-surface shadow-none border-border">
                            <CardContent className="p-4 flex flex-col gap-1">
                                <span className="text-foreground/50 text-xs font-semibold uppercase flex items-center gap-1.5">
                                    <Tag className="w-3.5 h-3.5" /> {t("listingDetails.breed")}
                                </span>
                                <span className="font-bold text-foreground text-base mt-1">{listing.breed}</span>
                            </CardContent>
                        </Card>

                        <Card className="bg-surface shadow-none border-border">
                            <CardContent className="p-4 flex flex-col gap-1">
                                <span className="text-foreground/50 text-xs font-semibold uppercase flex items-center gap-1.5">
                                    <BadgeCheck className="w-3.5 h-3.5" /> {t("listingDetails.gender")}
                                </span>
                                <span className="font-bold text-foreground text-base mt-1 flex items-center gap-2">
                                    {listing.gender === 'MALE' ? t("listingDetails.male") : listing.gender === 'FEMALE' ? t("listingDetails.female") : t("listingDetails.undefined")}
                                    {listing.gender === 'MALE' ? <span className="w-2 h-2 rounded-full bg-blue-500"></span> : listing.gender === 'FEMALE' ? <span className="w-2 h-2 rounded-full bg-pink-500"></span> : null}
                                </span>
                            </CardContent>
                        </Card>

                        <Card className="bg-surface shadow-none border-border sm:col-span-2">
                            <CardContent className="p-4 flex flex-col gap-1">
                                <span className="text-foreground/50 text-xs font-semibold uppercase flex items-center gap-1.5">
                                    <Hash className="w-3.5 h-3.5" /> {t("listingDetails.mutations")}
                                </span>
                                <div className="font-medium text-foreground flex flex-wrap gap-2 mt-2">
                                    {listing.mutations.length > 0 ? (
                                        listing.mutations.map((m, i) => (
                                            <span key={i} className="inline-flex items-center gap-1 px-3 py-1 bg-secondary/10 text-secondary-hover rounded-full border border-secondary/20 text-sm">
                                                <Tag className="w-3 h-3" /> {m}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-foreground/60 italic text-sm">{t("listingDetails.noMutations")}</span>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-surface shadow-none border-border sm:col-span-2">
                            <CardContent className="p-4 flex flex-col gap-1">
                                <span className="text-foreground/50 text-xs font-semibold uppercase flex items-center gap-1.5">
                                    <CalendarDays className="w-3.5 h-3.5" /> {t("listingDetails.birthDate")}
                                </span>
                                <span className="font-bold text-foreground text-base mt-1">
                                    {new Date(listing.birthDate).toLocaleDateString(t("listingDetails.localeDate"))}
                                </span>
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </div>
        </div>
    );
}
