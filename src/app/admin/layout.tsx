"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/contexts/I18nContext";
import {
    LayoutDashboard,
    Users,
    Megaphone,
    Ticket,
    Gavel,
    Package,
    Tag,
    Banknote,
    Percent,
    Truck,
    UserCheck,
    Star
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, isLoading } = useAuth();
    const { t } = useI18n();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!isLoading && (!user || user.role !== "ROLE_ADMIN")) {
            router.replace("/");
        }
    }, [user, isLoading, router]);

    if (isLoading || !user || user.role !== "ROLE_ADMIN") {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    const navigationGroups = [
        {
            title: t("admin.sidebar.groupAdmin"),
            links: [
                { name: t("admin.sidebar.navOverview"), href: "/admin", icon: LayoutDashboard },
            ]
        },
        {
            title: t("admin.sidebar.groupUsers") || "Usuários & Parceiros",
            links: [
                { name: t("admin.sidebar.navMembers"), href: "/admin/users", icon: Users },
                { name: t("admin.sidebar.navVets"), href: "/admin/vets", icon: UserCheck },
                { name: t("admin.sidebar.navCarriers"), href: "/admin/carriers", icon: Truck },
                { name: t("admin.sidebar.navSponsors"), href: "/admin/sponsors", icon: Star },
            ]
        },
        {
            title: t("admin.sidebar.groupContent"),
            links: [
                { name: t("admin.sidebar.navListings"), href: "/admin/listings", icon: Megaphone },
                { name: t("admin.sidebar.navRaffles"), href: "/admin/raffles", icon: Ticket },
                { name: t("admin.sidebar.navAuctions"), href: "/admin/auctions", icon: Gavel },
                { name: t("admin.sidebar.navBatches"), href: "/admin/batches", icon: Package },
            ]
        },
        {
            title: t("admin.sidebar.groupFinance"),
            links: [
                { name: t("admin.sidebar.navCoupons"), href: "/admin/coupons", icon: Tag },
                { name: t("admin.sidebar.navPayouts"), href: "/admin/payouts", icon: Banknote },
                { name: t("admin.sidebar.navFees"), href: "/admin/fees", icon: Percent },
            ]
        }
    ];

    return (
        <div className="container py-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
            <aside className="w-full md:w-64 flex-shrink-0 md:sticky md:top-24 md:self-start">
                <nav className="flex flex-col space-y-6">
                    {navigationGroups.map((group) => (
                        <div key={group.title}>
                            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                {group.title}
                            </h3>
                            <div className="space-y-1">
                                {group.links.map((item) => {
                                    const isActive = pathname === item.href;
                                    const Icon = item.icon;
                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${isActive
                                                ? "bg-primary text-primary-foreground shadow-sm"
                                                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                                }`}
                                        >
                                            <Icon className={`w-4 h-4 ${isActive ? "text-primary-foreground" : "text-gray-400"}`} />
                                            {item.name}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </nav>
            </aside>
            <main className="flex-1 min-w-0 bg-white rounded-lg shadow-sm border p-6">
                {children}
            </main>
        </div>
    );
}
