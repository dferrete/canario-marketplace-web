"use client";

import { useI18n } from "@/contexts/I18nContext";
import Link from "next/link";
import { Users, FileText, ChevronRight, Activity, BellRing, UserCheck, Truck, Gavel, Ticket, Layers, Wallet, Percent, Tag, Star } from "lucide-react";

export default function AdminDashboardPage() {
    const { t } = useI18n();

    return (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-500 max-w-7xl">
            <h1 className="text-2xl font-bold mb-2 text-gray-900">{t("admin.dashboard.title")}</h1>
            <p className="text-gray-600 mb-8">
                {t("admin.dashboard.welcome")}
            </p>

            {/* Seção Usuários & Parceiros */}
            <div className="mb-8">
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    {t("admin.sidebar.groupUsers")}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

                    {/* Membros Card */}
                    <Link href="/admin/users" className="group block h-full">
                        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all h-full relative overflow-hidden hover:border-blue-300 flex flex-col">
                            <div className="flex justify-between items-start mb-4 relative z-10 w-full">
                                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg shadow-sm border border-blue-100">
                                    <Users className="w-5 h-5" />
                                </div>
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-lg font-bold text-gray-900 mb-1">{t("admin.sidebar.navMembers")}</h3>
                                <p className="text-gray-500 text-xs mb-6 leading-relaxed">
                                    Consumidores, criadores e entusiastas utilizando a plataforma.
                                </p>
                            </div>
                            <div className="flex items-center text-blue-600 font-semibold text-xs mt-auto relative z-10">
                                Gerenciar Membros
                                <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1.5 transition-transform" />
                            </div>
                        </div>
                    </Link>

                    {/* Vets Card */}
                    <Link href="/admin/vets" className="group block h-full">
                        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all h-full relative overflow-hidden hover:border-emerald-300 flex flex-col">
                            <div className="flex justify-between items-start mb-4 relative z-10 w-full">
                                <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-lg shadow-sm border border-emerald-100">
                                    <UserCheck className="w-5 h-5" />
                                </div>
                                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-[10px] font-semibold shadow-sm animate-pulse">
                                    <Activity className="w-3 h-3" />
                                    <span>Aprovações</span>
                                </div>
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-lg font-bold text-gray-900 mb-1">{t("admin.sidebar.navVets")}</h3>
                                <p className="text-gray-500 text-xs mb-6 leading-relaxed">
                                    Veterinários responsáveis por atestar a saúde das aves.
                                </p>
                            </div>
                            <div className="flex items-center text-emerald-600 font-semibold text-xs mt-auto relative z-10">
                                Validar Parceiros
                                <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1.5 transition-transform" />
                            </div>
                        </div>
                    </Link>

                    {/* Carriers Card */}
                    <Link href="/admin/carriers" className="group block h-full">
                        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all h-full relative overflow-hidden hover:border-orange-300 flex flex-col">
                            <div className="flex justify-between items-start mb-4 relative z-10 w-full">
                                <div className="p-2.5 bg-orange-50 text-orange-600 rounded-lg shadow-sm border border-orange-100">
                                    <Truck className="w-5 h-5" />
                                </div>
                                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-[10px] font-semibold shadow-sm animate-pulse">
                                    <Activity className="w-3 h-3" />
                                    <span>Aprovações</span>
                                </div>
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-lg font-bold text-gray-900 mb-1">{t("admin.sidebar.navCarriers")}</h3>
                                <p className="text-gray-500 text-xs mb-6 leading-relaxed">
                                    Rede de transportadores parceiros habilitados no sistema.
                                </p>
                            </div>
                            <div className="flex items-center text-orange-600 font-semibold text-xs mt-auto relative z-10">
                                Validar Parceiros
                                <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1.5 transition-transform" />
                            </div>
                        </div>
                    </Link>

                    {/* Sponsors Card */}
                    <Link href="/admin/sponsors" className="group block h-full">
                        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all h-full relative overflow-hidden hover:border-yellow-300 flex flex-col">
                            <div className="flex justify-between items-start mb-4 relative z-10 w-full">
                                <div className="p-2.5 bg-yellow-50 text-yellow-600 rounded-lg shadow-sm border border-yellow-100">
                                    <Star className="w-5 h-5" />
                                </div>
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-lg font-bold text-gray-900 mb-1">{t("admin.sidebar.navSponsors")}</h3>
                                <p className="text-gray-500 text-xs mb-6 leading-relaxed">
                                    Empresas e marcas parceiras da plataforma.
                                </p>
                            </div>
                            <div className="flex items-center text-yellow-600 font-semibold text-xs mt-auto relative z-10">
                                Gerenciar Patrocínios
                                <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1.5 transition-transform" />
                            </div>
                        </div>
                    </Link>

                </div>
            </div>

            {/* Seção Gestão de Conteúdo */}
            <div className="mb-8">
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-purple-600" />
                    {t("admin.sidebar.groupContent")}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

                    {/* Listings Card */}
                    <Link href="/admin/listings" className="group block h-full">
                        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all h-full relative overflow-hidden hover:border-purple-300 flex flex-col">
                            <div className="flex justify-between items-start mb-4 relative z-10 w-full">
                                <div className="p-2.5 bg-purple-50 text-purple-600 rounded-lg shadow-sm border border-purple-100">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <div className="flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-[10px] font-semibold shadow-sm">
                                    <BellRing className="w-3 h-3" />
                                    <span>Novos</span>
                                </div>
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-lg font-bold text-gray-900 mb-1">{t("admin.sidebar.navListings")}</h3>
                                <p className="text-gray-500 text-[11px] mb-4 leading-relaxed">
                                    Aves em venda direta (Marketplace).
                                </p>
                            </div>
                            <div className="flex items-center text-purple-600 font-semibold text-[11px] mt-auto relative z-10">
                                Moderação
                                <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1.5 transition-transform" />
                            </div>
                        </div>
                    </Link>

                    {/* Raffles Card */}
                    <Link href="/admin/raffles" className="group block h-full">
                        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all h-full relative overflow-hidden hover:border-pink-300 flex flex-col">
                            <div className="flex justify-between items-start mb-4 relative z-10 w-full">
                                <div className="p-2.5 bg-pink-50 text-pink-600 rounded-lg shadow-sm border border-pink-100">
                                    <Ticket className="w-5 h-5" />
                                </div>
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-lg font-bold text-gray-900 mb-1">{t("admin.sidebar.navRaffles")}</h3>
                                <p className="text-gray-500 text-[11px] mb-4 leading-relaxed">
                                    Acompanhamento de cotas e sorteios.
                                </p>
                            </div>
                            <div className="flex items-center text-pink-600 font-semibold text-[11px] mt-auto relative z-10">
                                Moderação
                                <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1.5 transition-transform" />
                            </div>
                        </div>
                    </Link>

                    {/* Auctions Card */}
                    <Link href="/admin/auctions" className="group block h-full">
                        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all h-full relative overflow-hidden hover:border-red-300 flex flex-col">
                            <div className="flex justify-between items-start mb-4 relative z-10 w-full">
                                <div className="p-2.5 bg-red-50 text-red-600 rounded-lg shadow-sm border border-red-100">
                                    <Gavel className="w-5 h-5" />
                                </div>
                                <div className="flex items-center gap-1 px-2 py-0.5 bg-red-50 text-red-700 border border-red-200 rounded-full text-[10px] font-semibold shadow-sm animate-pulse">
                                    <Activity className="w-3 h-3" />
                                    <span>Ao Vivo</span>
                                </div>
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-lg font-bold text-gray-900 mb-1">{t("admin.sidebar.navAuctions")}</h3>
                                <p className="text-gray-500 text-[11px] mb-4 leading-relaxed">
                                    Arremates, lances e histórico.
                                </p>
                            </div>
                            <div className="flex items-center text-red-600 font-semibold text-[11px] mt-auto relative z-10">
                                Moderação
                                <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1.5 transition-transform" />
                            </div>
                        </div>
                    </Link>

                    {/* Batches Card */}
                    <Link href="/admin/batches" className="group block h-full">
                        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all h-full relative overflow-hidden hover:border-indigo-300 flex flex-col">
                            <div className="flex justify-between items-start mb-4 relative z-10 w-full">
                                <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-lg shadow-sm border border-indigo-100">
                                    <Layers className="w-5 h-5" />
                                </div>
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-lg font-bold text-gray-900 mb-1">{t("admin.sidebar.navBatches")}</h3>
                                <p className="text-gray-500 text-[11px] mb-4 leading-relaxed">
                                    Pacotes de aves e plantel unificado.
                                </p>
                            </div>
                            <div className="flex items-center text-indigo-600 font-semibold text-[11px] mt-auto relative z-10">
                                Moderação
                                <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1.5 transition-transform" />
                            </div>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Seção Gestão Financeira */}
            <div className="mb-8">
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2 mt-8">
                    <Wallet className="w-5 h-5 text-emerald-600" />
                    {t("admin.sidebar.groupFinance")}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

                    {/* Coupons Card */}
                    <div className="col-span-1">
                        <Link href="/admin/coupons" className="group block h-full">
                            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all h-full relative overflow-hidden hover:border-pink-300 flex flex-col">
                                <div className="flex justify-between items-start mb-4 relative z-10 w-full">
                                    <div className="p-2.5 bg-pink-50 text-pink-600 rounded-lg shadow-sm border border-pink-100">
                                        <Tag className="w-5 h-5" />
                                    </div>
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">{t("admin.sidebar.navCoupons")}</h3>
                                    <p className="text-gray-500 text-xs mb-6 leading-relaxed">
                                        Cupons de desconto e vouchers promocionais.
                                    </p>
                                </div>
                                <div className="flex items-center text-pink-600 font-semibold text-xs mt-auto relative z-10">
                                    Gerenciar Cupons
                                    <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1.5 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Payouts Card */}
                    <div className="col-span-1">
                        <Link href="/admin/payouts" className="group block h-full">
                            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all h-full relative overflow-hidden hover:border-emerald-300 flex flex-col">
                                <div className="flex justify-between items-start mb-4 relative z-10 w-full">
                                    <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-lg shadow-sm border border-emerald-100">
                                        <Wallet className="w-5 h-5" />
                                    </div>
                                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-[10px] font-semibold shadow-sm animate-pulse">
                                        <Activity className="w-3 h-3" />
                                        <span>Saques</span>
                                    </div>
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">{t("admin.sidebar.navPayouts")}</h3>
                                    <p className="text-gray-500 text-xs mb-6 leading-relaxed">
                                        Liberação de saldo e repasses para carteiras virtuais de vendedores.
                                    </p>
                                </div>
                                <div className="flex items-center text-emerald-600 font-semibold text-xs mt-auto relative z-10">
                                    Analisar
                                    <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1.5 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Fees Card */}
                    <div className="col-span-1">
                        <Link href="/admin/fees" className="group block h-full">
                            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all h-full relative overflow-hidden hover:border-indigo-300 flex flex-col">
                                <div className="flex justify-between items-start mb-4 relative z-10 w-full">
                                    <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-lg shadow-sm border border-indigo-100">
                                        <Percent className="w-5 h-5" />
                                    </div>
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">{t("admin.sidebar.navFees")}</h3>
                                    <p className="text-gray-500 text-xs mb-6 leading-relaxed">
                                        Configuração global de taxas operacionais cobradas.
                                    </p>
                                </div>
                                <div className="flex items-center text-indigo-600 font-semibold text-xs mt-auto relative z-10">
                                    Ajustar Taxas
                                    <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1.5 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    </div>

                </div>
            </div>

        </div>
    );
}
