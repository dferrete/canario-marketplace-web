import { Metadata } from "next";
import ComingSoonPage from "@/components/common/ComingSoonPage";
import { Ticket } from "lucide-react";

export const metadata: Metadata = {
    title: "Rifas | Canário Marketplace",
    description: "Participação em rifas de aves especiais — em breve!",
};

export default function RafflesPage() {
    return <ComingSoonPage featureKey="raffles" icon={<Ticket size={44} />} />;
}
