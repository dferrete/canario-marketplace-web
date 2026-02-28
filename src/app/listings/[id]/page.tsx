import type { Metadata } from 'next';
import api from '@/lib/api';
import { Listing, ListingResponse } from '@/types/interfaces';
import { notFound } from 'next/navigation';
import { ListingDetailsClient } from '@/components/listings/ListingDetailsClient';

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function ListingDetailsPage({ params }: PageProps) {
    const { id } = await params;

    let listing: Listing;

    try {
        // Fetch the specific listing by ID
        const listingRes = await api.get(`/api/v1/listings/${id}`);
        const data: ListingResponse = listingRes.data;

        // Fetch associated bird details
        let birdData: any = {};
        try {
            const birdRes = await api.get(`/api/v1/birds/${data.birdId}`);
            birdData = birdRes.data;
        } catch (error) {
            console.error(`Could not fully map bird data for bird_id: ${data.birdId}`);
        }

        // Map backend response specifically for the Client UI
        listing = {
            id: data.id,
            sellerId: data.sellerId,
            birdId: data.birdId,
            breed: birdData.species || "Ave",
            gender: birdData.gender || 'UNKNOWN',
            birthDate: birdData.birthDate || new Date().toISOString(),
            mutations: data.attributes?.map(a => a.value) || [],
            status: data.status,
            price: data.priceAmount?.toString() || "0.00",
            currency: data.priceCurrency || "BRL",
            createdAt: data.createdAt
        };

    } catch (error) {
        console.error("Error fetching listing details:", error);
        notFound();
    }

    return <ListingDetailsClient listing={listing} />;
}
