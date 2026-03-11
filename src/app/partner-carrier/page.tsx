"use client";

import React, { useState, useRef } from "react";
import { useI18n } from "@/contexts/I18nContext";
import { Button } from "@/components/ui/button";
import {
    Truck, Package, MapPin, ShieldCheck, Sparkles, Send,
    Bird, UploadCloud, X, CheckCircle2, ClipboardList,
    BadgeCheck, Handshake, Star, Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { partnerService, PartnerApplicationData } from "@/services/partner.service";

// ─────────────────────────────────────────────────────────────────────────────
// Benefits
// ─────────────────────────────────────────────────────────────────────────────
const BENEFITS = [
    { key: "demand", icon: <Package className="w-7 h-7" />, gradient: "from-amber-500/10 to-yellow-500/5", border: "border-amber-500/20", iconBg: "bg-amber-500/10", iconColor: "text-amber-600" },
    { key: "trust", icon: <ShieldCheck className="w-7 h-7" />, gradient: "from-emerald-500/10 to-green-500/5", border: "border-emerald-500/20", iconBg: "bg-emerald-500/10", iconColor: "text-emerald-600" },
    { key: "routes", icon: <MapPin className="w-7 h-7" />, gradient: "from-sky-500/10 to-blue-500/5", border: "border-sky-500/20", iconBg: "bg-sky-500/10", iconColor: "text-sky-600" },
    { key: "ratings", icon: <Star className="w-7 h-7" />, gradient: "from-violet-500/10 to-purple-500/5", border: "border-violet-500/20", iconBg: "bg-violet-500/10", iconColor: "text-violet-600" },
];

// ─────────────────────────────────────────────────────────────────────────────
// Steps
// ─────────────────────────────────────────────────────────────────────────────
const STEPS = [
    { key: "apply", icon: <ClipboardList className="w-6 h-6" />, color: "bg-primary/10 text-primary" },
    { key: "review", icon: <Handshake className="w-6 h-6" />, color: "bg-amber-500/10 text-amber-600" },
    { key: "approved", icon: <BadgeCheck className="w-6 h-6" />, color: "bg-emerald-500/10 text-emerald-600" },
    { key: "active", icon: <Truck className="w-6 h-6" />, color: "bg-violet-500/10 text-violet-600" },
];

const INPUT_CLS = "w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all";
const LABEL_CLS = "text-sm font-semibold text-foreground/80";

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────
export default function PartnerCarrierPage() {
    const { t } = useI18n();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [docPreview, setDocPreview] = useState<string | null>(null);
    const [docFile, setDocFile] = useState<File | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [form, setForm] = useState({
        name: "", company: "", email: "", phone: "", cpfCnpj: "", city: "", state: "",
        vehicleType: "", plateCount: "", animalExp: "", routes: "", notes: "",
        cnhAntt: "" // Added field for driver's license / ANTT
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleDocChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setDocFile(file);
        setDocPreview(URL.createObjectURL(file));
    };

    const removeDoc = () => {
        setDocPreview(null);
        setDocFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const payload: PartnerApplicationData = {
                name: form.name,
                email: form.email,
                cpfCnpj: form.cpfCnpj,
                phone: form.phone,
                role: "ROLE_LOGISTICS",
                documentType: "CNH", // Or ANTT depending on UI choice later, hardcoded for now
                documentNumber: form.cnhAntt || "N/A",
                vehicleDetails: form.vehicleType,
                coverageArea: form.city + ', ' + form.state
            };

            await partnerService.applyForPartnership(payload);
            setSubmitted(true);
        } catch (err: any) {
            console.error("Error applying for carrier partnership:", err);
            setError(err.response?.data?.message || "Ocorreu um erro ao enviar sua solicitação. Tente novamente mais tarde.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 pb-24">

            {/* ── Hero ──────────────────────────────────────────────────────── */}
            <header className="py-16 md:py-24 text-center max-w-3xl mx-auto space-y-5">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-2">
                    <Truck className="w-3.5 h-3.5" />
                    {t("partnerCarrier.hero.eyebrow")}
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-foreground tracking-tight leading-tight">
                    {t("partnerCarrier.hero.titlePart1")}{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                        {t("partnerCarrier.hero.titlePart2")}
                    </span>
                </h1>
                <p className="text-foreground/70 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                    {t("partnerCarrier.hero.subtitle")}
                </p>
            </header>

            <div className="max-w-5xl mx-auto space-y-24">

                {/* ── Benefits ──────────────────────────────────────────────── */}
                <section>
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-3">
                            <Bird className="w-3.5 h-3.5" />
                            {t("partnerCarrier.benefits.eyebrow")}
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{t("partnerCarrier.benefits.title")}</h2>
                        <p className="text-foreground/60 mt-2 text-sm sm:text-base max-w-xl mx-auto">{t("partnerCarrier.benefits.subtitle")}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {BENEFITS.map((b) => (
                            <div key={b.key} className={cn("flex flex-col gap-4 p-6 rounded-2xl border bg-gradient-to-br", b.gradient, b.border)}>
                                <div className={cn("p-3 rounded-xl w-fit", b.iconBg, b.iconColor)}>{b.icon}</div>
                                <div>
                                    <h3 className="font-bold text-foreground mb-1">{t(`partnerCarrier.benefits.${b.key}.title`)}</h3>
                                    <p className="text-xs text-foreground/60 leading-relaxed">{t(`partnerCarrier.benefits.${b.key}.desc`)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── How it works ──────────────────────────────────────────── */}
                <section>
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-3">
                            <Sparkles className="w-3.5 h-3.5" />
                            {t("partnerCarrier.steps.eyebrow")}
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{t("partnerCarrier.steps.title")}</h2>
                        <p className="text-foreground/60 mt-2 text-sm sm:text-base max-w-xl mx-auto">{t("partnerCarrier.steps.subtitle")}</p>
                    </div>

                    <div className="relative">
                        <div className="hidden lg:block absolute top-10 left-[calc(12.5%-0.5px)] right-[calc(12.5%-0.5px)] h-px bg-border z-0" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                            {STEPS.map((step, idx) => (
                                <div key={step.key} className="flex flex-col items-center text-center gap-3">
                                    <div className={cn("w-20 h-20 rounded-2xl flex items-center justify-center shadow-sm border border-border bg-surface relative", step.color)}>
                                        {step.icon}
                                        <span className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shadow-sm">
                                            {idx + 1}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-foreground">{t(`partnerCarrier.steps.${step.key}.title`)}</h3>
                                        <p className="text-xs text-foreground/60 mt-1 leading-relaxed max-w-[160px] mx-auto">{t(`partnerCarrier.steps.${step.key}.desc`)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Registration Form ─────────────────────────────────────── */}
                <section id="partner-carrier-form">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-3">
                            <Send className="w-3.5 h-3.5" />
                            {t("partnerCarrier.form.eyebrow")}
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{t("partnerCarrier.form.title")}</h2>
                        <p className="text-foreground/60 mt-2 text-sm sm:text-base max-w-xl mx-auto">{t("partnerCarrier.form.subtitle")}</p>
                    </div>

                    <div className="max-w-3xl mx-auto bg-surface border border-border rounded-3xl p-8 shadow-sm">
                        {submitted ? (
                            <div className="flex flex-col items-center gap-4 py-10 text-center animate-in fade-in zoom-in-95">
                                <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                    <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                                </div>
                                <h3 className="text-xl font-bold text-foreground">{t("partnerCarrier.form.successTitle")}</h3>
                                <p className="text-foreground/60 text-sm max-w-sm">{t("partnerCarrier.form.successDesc")}</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8">

                                {/* ── Dados de contato ── */}
                                <div>
                                    <p className="text-xs font-bold text-primary uppercase tracking-wider mb-4">{t("partnerCarrier.form.sectionContact")}</p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        {error && (
                                            <div className="col-span-1 sm:col-span-2 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 border border-red-200">
                                                {error}
                                            </div>
                                        )}
                                        <div className="space-y-1.5">
                                            <label className={LABEL_CLS}>{t("partnerCarrier.form.nameLabel")}</label>
                                            <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder={t("partnerCarrier.form.namePlaceholder")} className={INPUT_CLS} />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className={LABEL_CLS}>{t("partnerCarrier.form.companyLabel")}</label>
                                            <input type="text" name="company" value={form.company} onChange={handleChange} placeholder={t("partnerCarrier.form.companyPlaceholder")} className={INPUT_CLS} />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className={LABEL_CLS}>{t("partnerCarrier.form.emailLabel")}</label>
                                            <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder={t("partnerCarrier.form.emailPlaceholder")} className={INPUT_CLS} />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className={LABEL_CLS}>CPF / CNPJ</label>
                                            <input type="text" name="cpfCnpj" value={form.cpfCnpj} onChange={handleChange} required placeholder="000.000.000-00" className={INPUT_CLS} />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className={LABEL_CLS}>CNH ou ANTT</label>
                                            <input type="text" name="cnhAntt" value={form.cnhAntt} onChange={handleChange} required placeholder="Número do Registro" className={INPUT_CLS} />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className={LABEL_CLS}>{t("partnerCarrier.form.phoneLabel")}</label>
                                            <input type="tel" name="phone" value={form.phone} onChange={handleChange} required placeholder={t("partnerCarrier.form.phonePlaceholder")} className={INPUT_CLS} />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className={LABEL_CLS}>{t("partnerCarrier.form.cityLabel")}</label>
                                            <input type="text" name="city" value={form.city} onChange={handleChange} required placeholder={t("partnerCarrier.form.cityPlaceholder")} className={INPUT_CLS} />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className={LABEL_CLS}>{t("partnerCarrier.form.stateLabel")}</label>
                                            <input type="text" name="state" value={form.state} onChange={handleChange} required placeholder={t("partnerCarrier.form.statePlaceholder")} className={INPUT_CLS} />
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-border" />

                                {/* ── Dados operacionais ── */}
                                <div>
                                    <p className="text-xs font-bold text-primary uppercase tracking-wider mb-4">{t("partnerCarrier.form.sectionOperational")}</p>
                                    <div className="space-y-5">

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div className="space-y-1.5">
                                                <label className={LABEL_CLS}>{t("partnerCarrier.form.vehicleTypeLabel")}</label>
                                                <select name="vehicleType" value={form.vehicleType} onChange={handleChange} required className={INPUT_CLS}>
                                                    <option value="" disabled>{t("partnerCarrier.form.vehicleTypePlaceholder")}</option>
                                                    <option value="car">{t("partnerCarrier.form.vehicleCar")}</option>
                                                    <option value="van">{t("partnerCarrier.form.vehicleVan")}</option>
                                                    <option value="truck">{t("partnerCarrier.form.vehicleTruck")}</option>
                                                    <option value="transport">{t("partnerCarrier.form.vehicleTransport")}</option>
                                                </select>
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className={LABEL_CLS}>{t("partnerCarrier.form.plateCountLabel")}</label>
                                                <select name="plateCount" value={form.plateCount} onChange={handleChange} required className={INPUT_CLS}>
                                                    <option value="" disabled>{t("partnerCarrier.form.plateCountPlaceholder")}</option>
                                                    <option value="1">1</option>
                                                    <option value="2-5">2 – 5</option>
                                                    <option value="6-10">6 – 10</option>
                                                    <option value="11+">11+</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className={LABEL_CLS}>{t("partnerCarrier.form.animalExpLabel")}</label>
                                            <select name="animalExp" value={form.animalExp} onChange={handleChange} required className={INPUT_CLS}>
                                                <option value="" disabled>{t("partnerCarrier.form.animalExpPlaceholder")}</option>
                                                <option value="none">{t("partnerCarrier.form.expNone")}</option>
                                                <option value="some">{t("partnerCarrier.form.expSome")}</option>
                                                <option value="regular">{t("partnerCarrier.form.expRegular")}</option>
                                                <option value="specialist">{t("partnerCarrier.form.expSpecialist")}</option>
                                            </select>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className={LABEL_CLS}>{t("partnerCarrier.form.routesLabel")}</label>
                                            <textarea name="routes" value={form.routes} onChange={handleChange} rows={3} placeholder={t("partnerCarrier.form.routesPlaceholder")} className={cn(INPUT_CLS, "resize-none")} />
                                        </div>

                                        {/* Document / photo upload */}
                                        <div className="space-y-1.5">
                                            <label className={LABEL_CLS}>{t("partnerCarrier.form.docLabel")}</label>
                                            {docPreview ? (
                                                <div className="relative inline-block w-full">
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img src={docPreview} alt="Preview" className="w-full max-h-48 object-contain rounded-xl border border-border" />
                                                    <button type="button" onClick={removeDoc} className="absolute top-2 right-2 p-1 rounded-full bg-background/80 border border-border hover:bg-destructive/10 hover:text-destructive transition-colors">
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                    <p className="text-xs text-foreground/50 mt-1">{docFile?.name}</p>
                                                </div>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() => fileInputRef.current?.click()}
                                                    className="w-full py-8 border-2 border-dashed border-border rounded-xl flex flex-col items-center gap-2 text-foreground/40 hover:border-primary/40 hover:text-primary/60 hover:bg-primary/5 transition-all"
                                                >
                                                    <UploadCloud className="w-8 h-8" />
                                                    <span className="text-sm font-medium">{t("partnerCarrier.form.docHint")}</span>
                                                    <span className="text-xs">{t("partnerCarrier.form.docFormats")}</span>
                                                </button>
                                            )}
                                            <input ref={fileInputRef} type="file" accept="image/png,image/jpeg,image/webp,application/pdf" onChange={handleDocChange} className="hidden" />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className={LABEL_CLS}>{t("partnerCarrier.form.notesLabel")}</label>
                                            <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} placeholder={t("partnerCarrier.form.notesPlaceholder")} className={cn(INPUT_CLS, "resize-none")} />
                                        </div>
                                    </div>
                                </div>

                                <Button type="submit" size="lg" disabled={isLoading} className="w-full rounded-full font-semibold shadow-md hover:-translate-y-0.5 transition-transform">
                                    {isLoading ? (
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    ) : (
                                        <Send className="w-4 h-4 mr-2" />
                                    )}
                                    {t("partnerCarrier.form.submit")}
                                </Button>
                            </form>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}
