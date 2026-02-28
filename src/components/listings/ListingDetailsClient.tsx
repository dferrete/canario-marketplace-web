"use client";

import { Listing } from '@/types/interfaces';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Tag, Info, User, ShieldCheck } from 'lucide-react';
import { useI18n } from '@/contexts/I18nContext';
import Link from 'next/link';

interface ListingDetailsClientProps {
    listing: Listing;
}

export function ListingDetailsClient({ listing }: ListingDetailsClientProps) {
    const { t } = useI18n();
    const isAvailable = listing.status === "ACTIVE";

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                {/* Left Column: Image & Badges */}
                <div className="flex flex-col gap-4">
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

                    <dl className="grid grid-cols-2 gap-y-6 gap-x-4 text-sm">
                        <div>
                            <dt className="text-foreground/50 mb-1 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary/40 inline-block" /> {t("listingDetails.breed")}
                            </dt>
                            <dd className="font-medium text-foreground">{listing.breed}</dd>
                        </div>

                        <div>
                            <dt className="text-foreground/50 mb-1 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary/40 inline-block" /> {t("listingDetails.gender")}
                            </dt>
                            <dd className="font-medium text-foreground">
                                {listing.gender === 'MALE' ? t("listingDetails.male") : listing.gender === 'FEMALE' ? t("listingDetails.female") : t("listingDetails.undefined")}
                            </dd>
                        </div>

                        <div className="col-span-2">
                            <dt className="text-foreground/50 mb-1 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary/40 inline-block" /> {t("listingDetails.mutations")}
                            </dt>
                            <dd className="font-medium text-foreground flex flex-wrap gap-2 mt-2">
                                {listing.mutations.length > 0 ? (
                                    listing.mutations.map((m, i) => (
                                        <span key={i} className="inline-flex items-center gap-1 px-3 py-1 bg-secondary/10 text-secondary-hover rounded-full border border-secondary/20">
                                            <Tag className="w-3 h-3" /> {m}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-foreground/60 italic">{t("listingDetails.noMutations")}</span>
                                )}
                            </dd>
                        </div>

                        <div>
                            <dt className="text-foreground/50 mb-1 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary/40 inline-block" /> {t("listingDetails.birthDate")}
                            </dt>
                            <dd className="font-medium text-foreground flex items-center gap-1.5">
                                <Calendar className="w-4 h-4 text-primary" />
                                {new Date(listing.birthDate).toLocaleDateString(t("listingDetails.localeDate"))}
                            </dd>
                        </div>
                    </dl>

                </div>
            </div>
        </div>
    );
}
