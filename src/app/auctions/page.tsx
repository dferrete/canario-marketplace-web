import { Metadata } from "next";
import ComingSoonPage from "@/components/common/ComingSoonPage";
import { Gavel } from "lucide-react";

export const metadata: Metadata = {
    title: "Leilões | Canário Marketplace",
    description: "Leilões de aves excepcionais em tempo real — em breve!",
};

export default function AuctionsPage() {
    return <ComingSoonPage featureKey="auctions" icon={<Gavel size={44} />} />;
}
