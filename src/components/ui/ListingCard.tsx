import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Listing } from "@/types/interfaces";
import Link from "next/link";
import { Calendar, Tag } from "lucide-react";

interface ListingCardProps {
    listing: Listing;
}

export function ListingCard({ listing }: ListingCardProps) {
    const isAvailable = listing.status === "ACTIVE";

    return (
        <Card className={`group flex flex-col h-full overflow-hidden transition-all duration-300 ${!isAvailable ? 'opacity-70 grayscale-[30%]' : 'hover:-translate-y-1'}`}>
            <div className="relative aspect-square bg-primary/5 w-full flex items-center justify-center p-6 border-b border-border">
                {/* Placeholder image (representing the bird's breed abstractly) */}
                <div className="w-32 h-32 rounded-full bg-secondary/20 border-4 border-surface shadow-md flex items-center justify-center relative overflow-hidden">
                    <span className="text-4xl">🦜</span>
                </div>

                <div className="absolute top-4 right-4">
                    <Badge
                        variant={
                            listing.status === "ACTIVE" ? "success" :
                                listing.status === "RESERVED" ? "warning" :
                                    "secondary"
                        }
                    >
                        {listing.status === "ACTIVE" ? "Disponível" : listing.status}
                    </Badge>
                </div>
            </div>

            <CardHeader className="pb-2">
                <h3 className="font-bold text-lg leading-tight line-clamp-1 truncate" title={listing.breed}>
                    {listing.breed}
                </h3>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col gap-3 pb-2">
                {listing.mutations.length > 0 && (
                    <div className="flex items-start gap-2 text-sm text-foreground/70">
                        <Tag className="w-4 h-4 mt-0.5 shrink-0" />
                        <p className="line-clamp-2 leading-tight">
                            {listing.mutations.join(", ")}
                        </p>
                    </div>
                )}

                <div className="flex items-center justify-between text-sm font-medium mt-auto">
                    <span className="flex items-center gap-1.5 px-2.5 py-1 bg-surface border border-border rounded-full text-foreground/80">
                        {listing.gender === 'MALE' ? 'Macho ♂' : listing.gender === 'FEMALE' ? 'Fêmea ♀' : 'Indefinido'}
                    </span>
                    <span className="flex items-center gap-1.5 text-foreground/60">
                        <Calendar className="w-4 h-4" />
                        {new Date(listing.birthDate).getFullYear()}
                    </span>
                </div>
            </CardContent>

            <CardFooter className="flex items-center justify-between pt-4 border-t border-border/50 bg-background/50">
                <div className="flex flex-col">
                    <span className="text-xs font-semibold text-foreground/50 uppercase tracking-wider">Valor</span>
                    <span className="font-bold text-xl text-primary">
                        R$ {parseFloat(listing.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                </div>

                <Button asChild variant={isAvailable ? "default" : "secondary"} size="sm" className={!isAvailable ? 'pointer-events-none' : ''}>
                    <Link href={`/listings/${listing.id}`}>
                        {isAvailable ? 'Ver Detalhes' : 'Indisponível'}
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
