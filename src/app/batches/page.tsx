import { Metadata } from "next";
import ComingSoonPage from "@/components/common/ComingSoonPage";
import { Package } from "lucide-react";

export const metadata: Metadata = {
    title: "Lotes | Canário Marketplace",
    description: "Compra de aves em lotes especiais — em breve!",
};

export default function BatchesPage() {
    return <ComingSoonPage featureKey="batches" icon={<Package size={44} />} />;
}
