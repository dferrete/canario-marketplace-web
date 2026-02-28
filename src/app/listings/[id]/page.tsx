import { Metadata } from 'next';
import api from '@/lib/api';
import { Listing, ListingResponse, BirdResponse } from '@/types/interfaces';
import { notFound } from 'next/navigation';
import { ListingDetailsClient } from '@/components/listings/ListingDetailsClient';

export const metadata: Metadata = {
    title: 'Detalhes do Canário | Marketplace'
};

async function getListing(id: string): Promise<Listing | null> {
    try {
        const res = await api.get(`/api/v1/listings/${id}`);
        const l: ListingResponse = res.data;

        let bird = null;
        try {
            const birdRes = await api.get(`/api/v1/birds/${l.birdId}`);
            bird = birdRes.data as BirdResponse;
        } catch (e) {
            console.warn(`Could not fetch bird ${l.birdId}`);
        }

        return {
            id: l.id,
            sellerId: l.sellerId,
            birdId: l.birdId,
            breed: bird?.species || 'Ave',
            mutations: l.attributes?.map(a => a.value) || [],
            gender: bird?.gender || 'UNKNOWN',
            birthDate: bird?.birthDate || new Date().toISOString(),
            status: l.status,
            price: l.priceAmount.toString(),
            currency: l.priceCurrency,
            createdAt: l.createdAt
        } as Listing;
    } catch (error) {
        return null;
    }
}

export default async function ListingPage({ params }: { params: { id: string } }) {
    const listing = await getListing(params.id);

    if (!listing) {
        notFound();
    }

    return <ListingDetailsClient listing={listing} />;
}
