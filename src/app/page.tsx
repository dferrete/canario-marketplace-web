import api from "@/lib/api";
import { Listing } from "@/types/interfaces";
import { ListingCard } from "@/components/ui/ListingCard";
import { Bird } from "lucide-react";

async function getListings(): Promise<Listing[]> {
  try {
    const response = await api.get('/api/v1/listings');
    return response.data;
  } catch (error) {
    console.error("Failed to fetch listings:", error);
    return [];
  }
}

export default async function Home() {
  const listings = await getListings();

  return (
    <div className="container mx-auto px-4">
      <header className="py-12 md:py-16 text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
          Encontre o Canário <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            Perfeito para Você
          </span>
        </h1>
        <p className="text-foreground/70 text-lg md:text-xl leading-relaxed">
          Navegue pelas ofertas ativas dos melhores criadores do país.
          Plataforma 100% segura com garantia de entrega.
        </p>
      </header>

      {listings.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-16 text-center bg-surface border border-border border-dashed rounded-3xl">
          <Bird className="w-16 h-16 text-primary/30 mb-4" />
          <h2 className="text-xl font-bold text-foreground">Nenhuma oferta disponível</h2>
          <p className="text-foreground/60 mt-2">Os criadores ainda não publicaram novas aves hoje.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}
