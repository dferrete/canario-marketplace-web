import { Metadata } from "next";
import api from "@/lib/api";
import { Listing, ListingResponse } from "@/types/interfaces";
import ListingsSearchClient from "./ListingsSearchClient";

export const metadata: Metadata = {
    title: "Aves Disponíveis | Marketplace de Canários",
    description: "Pesquise, filtre e encontre o canário perfeito para o seu criatório.",
};

async function getListings(): Promise<Listing[]> {
    try {
        const response = await api.get("/api/v1/listings");
        const data: ListingResponse[] = response.data;

        return data.map((l) => ({
            id: l.id,
            sellerId: l.sellerId,
            birdId: l.birdId,
            breed: "Ave Carregando...", // This will be enriched on the client side if necessary, or we can fetch full details
            mutations: l.attributes?.map(a => a.value) || [],
            gender: "UNKNOWN",
            birthDate: new Date().toISOString(),
            status: l.status,
            price: l.priceAmount.toString(),
            currency: l.priceCurrency,
            createdAt: l.createdAt
        }));
    } catch (error) {
        console.error("Error fetching listings for search page", error);
        return [];
    }
}

export default async function BirdsPage() {
    const initialListings = await getListings();

    return <ListingsSearchClient initialListings={initialListings} />;
}
