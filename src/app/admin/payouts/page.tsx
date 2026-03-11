"use client";

import { Banknote, Wrench } from "lucide-react";

export default function AdminPayoutsPage() {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-500 h-full min-h-[600px] flex flex-col items-center justify-center text-center p-8">
            <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Banknote className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Acertos e Repasses</h1>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
                Acompanhe o módulo de Payout, analise períodos de bloqueio financeiro (Escrow) e gerencie transferências.
            </p>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 max-w-md w-full flex items-start gap-4 text-left">
                <Wrench className="h-6 w-6 text-amber-600 shrink-0 mt-0.5" />
                <div>
                    <h3 className="font-semibold text-amber-900">Em Desenvolvimento</h3>
                    <p className="text-sm text-amber-700 mt-1">
                        O backend já conta com estrutura base de Eventos Monetários, porém as UI Dashboard exigem integrações completas ao sistema bancário.
                    </p>
                </div>
            </div>
        </div>
    );
}
