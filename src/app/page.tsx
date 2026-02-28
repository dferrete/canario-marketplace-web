import api from "@/lib/api";
import { Listing, ListingResponse, BirdResponse } from "@/types/interfaces";
import { ListingCard } from "@/components/ui/ListingCard";
import { Bird } from "lucide-react";
import HomePageContent from "@/components/home/HomePageContent";

async function getListings(): Promise<Listing[]> {
  try {
    const res = await api.get('/api/v1/listings');
    const listingsRaw: ListingResponse[] = res.data;

    // For each listing, fetch the bird details to complete the UI model
    const fullListings = await Promise.all(
      listingsRaw.map(async (l) => {
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
      })
    );

    return fullListings;
  } catch (error) {
    console.error("Failed to fetch listings:", error);
    return [];
  }
}

export default async function Home() {
  const listings = await getListings();

  return <HomePageContent listings={listings} />;
}
