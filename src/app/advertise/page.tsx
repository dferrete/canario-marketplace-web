"use client";

import React, { useState, useRef } from "react";
import { useI18n } from "@/contexts/I18nContext";
import { Button } from "@/components/ui/button";
import {
    TrendingUp, Users, Star, Zap, CheckCircle2, Sparkles,
    Send, Bird, UploadCloud, X, ImageIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// Advantages
// ─────────────────────────────────────────────────────────────────────────────
const ADVANTAGES = [
    { key: "brand", icon: <Star className="w-7 h-7" />, gradient: "from-yellow-500/10 to-amber-500/5", border: "border-yellow-500/20", iconBg: "bg-yellow-500/10", iconColor: "text-yellow-600" },
    { key: "sales", icon: <TrendingUp className="w-7 h-7" />, gradient: "from-emerald-500/10 to-green-500/5", border: "border-emerald-500/20", iconBg: "bg-emerald-500/10", iconColor: "text-emerald-600" },
    { key: "reach", icon: <Users className="w-7 h-7" />, gradient: "from-sky-500/10 to-blue-500/5", border: "border-sky-500/20", iconBg: "bg-sky-500/10", iconColor: "text-sky-600" },
    { key: "speed", icon: <Zap className="w-7 h-7" />, gradient: "from-violet-500/10 to-purple-500/5", border: "border-violet-500/20", iconBg: "bg-violet-500/10", iconColor: "text-violet-600" },
];

// ─────────────────────────────────────────────────────────────────────────────
// Plans
// ─────────────────────────────────────────────────────────────────────────────
const PLANS = [
    { key: "month1", highlighted: false },
    { key: "month3", highlighted: false },
    { key: "month6", highlighted: true },
    { key: "year1", highlighted: false },
];

// Input field classname
const INPUT_CLS = "w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all";
const LABEL_CLS = "text-sm font-semibold text-foreground/80";

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────
export default function AdvertisePage() {
    const { t } = useI18n();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [submitted, setSubmitted] = useState(false);

    const [form, setForm] = useState({
        // Contact
        name: "", company: "", email: "", phone: "",
        // Ad content
        adTitle: "", adSubtitle: "", adDescription: "", adUrl: "", adNotes: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const removeImage = () => {
        setImagePreview(null);
        setImageFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="container mx-auto px-4 pb-24">

            {/* ── Hero ──────────────────────────────────────────────────────── */}
            <header className="py-16 md:py-24 text-center max-w-3xl mx-auto space-y-5">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    {t("advertise.hero.eyebrow")}
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-foreground tracking-tight leading-tight">
                    {t("advertise.hero.titlePart1")}{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                        {t("advertise.hero.titlePart2")}
                    </span>
                </h1>
                <p className="text-foreground/70 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                    {t("advertise.hero.subtitle")}
                </p>
            </header>

            <div className="max-w-5xl mx-auto space-y-24">

                {/* ── Advantages ────────────────────────────────────────────── */}
                <section>
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-3">
                            <Bird className="w-3.5 h-3.5" />
                            {t("advertise.advantages.eyebrow")}
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{t("advertise.advantages.title")}</h2>
                        <p className="text-foreground/60 mt-2 text-sm sm:text-base max-w-xl mx-auto">{t("advertise.advantages.subtitle")}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {ADVANTAGES.map((adv) => (
                            <div key={adv.key} className={cn("flex flex-col gap-4 p-6 rounded-2xl border bg-gradient-to-br", adv.gradient, adv.border)}>
                                <div className={cn("p-3 rounded-xl w-fit", adv.iconBg, adv.iconColor)}>{adv.icon}</div>
                                <div>
                                    <h3 className="font-bold text-foreground mb-1">{t(`advertise.advantages.${adv.key}.title`)}</h3>
                                    <p className="text-xs text-foreground/60 leading-relaxed">{t(`advertise.advantages.${adv.key}.desc`)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── Plans ─────────────────────────────────────────────────── */}
                <section>
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-3">
                            <Sparkles className="w-3.5 h-3.5" />
                            {t("advertise.plans.eyebrow")}
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{t("advertise.plans.title")}</h2>
                        <p className="text-foreground/60 mt-2 text-sm sm:text-base max-w-xl mx-auto">{t("advertise.plans.subtitle")}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {PLANS.map((plan) => {
                            const isSelected = selectedPlan === plan.key;
                            return (
                                <div
                                    key={plan.key}
                                    onClick={() => setSelectedPlan(plan.key)}
                                    className={cn(
                                        "relative flex flex-col gap-3 p-6 rounded-2xl border cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1",
                                        plan.highlighted ? "border-primary bg-primary/5 shadow-md" : "border-border bg-surface",
                                        isSelected && "ring-2 ring-primary ring-offset-2 ring-offset-background"
                                    )}
                                >
                                    {plan.highlighted && (
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-sm">
                                                <Sparkles className="w-3 h-3" />
                                                {t("advertise.plans.popular")}
                                            </span>
                                        </div>
                                    )}
                                    <h3 className={cn("text-lg font-extrabold", plan.highlighted ? "text-primary" : "text-foreground")}>
                                        {t(`advertise.plans.${plan.key}.name`)}
                                    </h3>
                                    <div className="text-3xl font-black text-foreground">
                                        {t(`advertise.plans.${plan.key}.price`)}
                                        <span className="text-sm font-normal text-foreground/50 ml-1">{t("advertise.plans.perMonth")}</span>
                                    </div>
                                    <p className="text-xs text-foreground/60">{t(`advertise.plans.${plan.key}.desc`)}</p>
                                    <ul className="space-y-2 mt-2 flex-1">
                                        {(t(`advertise.plans.${plan.key}.features`) as unknown as string[])?.map?.((feat: string, i: number) => (
                                            <li key={i} className="flex items-start gap-2 text-xs text-foreground/70">
                                                <CheckCircle2 className={cn("w-4 h-4 shrink-0 mt-0.5", plan.highlighted ? "text-primary" : "text-emerald-500")} />
                                                {feat}
                                            </li>
                                        ))}
                                    </ul>
                                    <Button
                                        variant={plan.highlighted ? "default" : "outline"}
                                        size="sm"
                                        className="mt-4 rounded-full w-full font-semibold"
                                        onClick={(e) => { e.stopPropagation(); setSelectedPlan(plan.key); document.getElementById("advertise-form")?.scrollIntoView({ behavior: "smooth" }); }}
                                    >
                                        {t("advertise.plans.selectPlan")}
                                    </Button>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* ── Form ──────────────────────────────────────────────────── */}
                <section id="advertise-form">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-3">
                            <Send className="w-3.5 h-3.5" />
                            {t("advertise.form.eyebrow")}
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{t("advertise.form.title")}</h2>
                        <p className="text-foreground/60 mt-2 text-sm sm:text-base max-w-xl mx-auto">{t("advertise.form.subtitle")}</p>
                    </div>

                    <div className="max-w-3xl mx-auto bg-surface border border-border rounded-3xl p-8 shadow-sm">
                        {submitted ? (
                            <div className="flex flex-col items-center gap-4 py-10 text-center animate-in fade-in zoom-in-95">
                                <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                    <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                                </div>
                                <h3 className="text-xl font-bold text-foreground">{t("advertise.form.successTitle")}</h3>
                                <p className="text-foreground/60 text-sm max-w-sm">{t("advertise.form.successDesc")}</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8">

                                {/* Selected plan badge */}
                                {selectedPlan && (
                                    <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary/10 border border-primary/20 text-sm text-primary font-medium">
                                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                                        {t("advertise.form.selectedPlan")}: <span className="font-bold">{t(`advertise.plans.${selectedPlan}.name`)}</span>
                                    </div>
                                )}

                                {/* ── Dados de contato ── */}
                                <div>
                                    <p className="text-xs font-bold text-primary uppercase tracking-wider mb-4">{t("advertise.form.sectionContact")}</p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div className="space-y-1.5">
                                            <label className={LABEL_CLS}>{t("advertise.form.nameLabel")}</label>
                                            <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder={t("advertise.form.namePlaceholder")} className={INPUT_CLS} />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className={LABEL_CLS}>{t("advertise.form.companyLabel")}</label>
                                            <input type="text" name="company" value={form.company} onChange={handleChange} required placeholder={t("advertise.form.companyPlaceholder")} className={INPUT_CLS} />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className={LABEL_CLS}>{t("advertise.form.emailLabel")}</label>
                                            <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder={t("advertise.form.emailPlaceholder")} className={INPUT_CLS} />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className={LABEL_CLS}>{t("advertise.form.phoneLabel")}</label>
                                            <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder={t("advertise.form.phonePlaceholder")} className={INPUT_CLS} />
                                        </div>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="border-t border-border" />

                                {/* ── Conteúdo do anúncio ── */}
                                <div>
                                    <p className="text-xs font-bold text-primary uppercase tracking-wider mb-4">{t("advertise.form.sectionAd")}</p>
                                    <div className="space-y-5">

                                        {/* Title + Subtitle */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div className="space-y-1.5">
                                                <label className={LABEL_CLS}>{t("advertise.form.adTitleLabel")}</label>
                                                <input type="text" name="adTitle" value={form.adTitle} onChange={handleChange} required placeholder={t("advertise.form.adTitlePlaceholder")} className={INPUT_CLS} />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className={LABEL_CLS}>{t("advertise.form.adSubtitleLabel")}</label>
                                                <input type="text" name="adSubtitle" value={form.adSubtitle} onChange={handleChange} placeholder={t("advertise.form.adSubtitlePlaceholder")} className={INPUT_CLS} />
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <div className="space-y-1.5">
                                            <label className={LABEL_CLS}>{t("advertise.form.adDescLabel")}</label>
                                            <textarea name="adDescription" value={form.adDescription} onChange={handleChange} required rows={4} placeholder={t("advertise.form.adDescPlaceholder")} className={cn(INPUT_CLS, "resize-none")} />
                                        </div>

                                        {/* URL */}
                                        <div className="space-y-1.5">
                                            <label className={LABEL_CLS}>{t("advertise.form.adUrlLabel")}</label>
                                            <input type="url" name="adUrl" value={form.adUrl} onChange={handleChange} placeholder={t("advertise.form.adUrlPlaceholder")} className={INPUT_CLS} />
                                        </div>

                                        {/* Image upload */}
                                        <div className="space-y-1.5">
                                            <label className={LABEL_CLS}>{t("advertise.form.adImageLabel")}</label>
                                            {imagePreview ? (
                                                <div className="relative inline-block">
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img src={imagePreview} alt="Preview" className="w-full max-h-48 object-contain rounded-xl border border-border" />
                                                    <button type="button" onClick={removeImage} className="absolute top-2 right-2 p-1 rounded-full bg-background/80 border border-border hover:bg-destructive/10 hover:text-destructive transition-colors">
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                    <p className="text-xs text-foreground/50 mt-1">{imageFile?.name}</p>
                                                </div>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() => fileInputRef.current?.click()}
                                                    className="w-full py-8 border-2 border-dashed border-border rounded-xl flex flex-col items-center gap-2 text-foreground/40 hover:border-primary/40 hover:text-primary/60 hover:bg-primary/5 transition-all"
                                                >
                                                    <UploadCloud className="w-8 h-8" />
                                                    <span className="text-sm font-medium">{t("advertise.form.adImageHint")}</span>
                                                    <span className="text-xs">{t("advertise.form.adImageFormats")}</span>
                                                </button>
                                            )}
                                            <input ref={fileInputRef} type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" onChange={handleImageChange} className="hidden" />
                                        </div>

                                        {/* Notes */}
                                        <div className="space-y-1.5">
                                            <label className={LABEL_CLS}>{t("advertise.form.adNotesLabel")}</label>
                                            <textarea name="adNotes" value={form.adNotes} onChange={handleChange} rows={3} placeholder={t("advertise.form.adNotesPlaceholder")} className={cn(INPUT_CLS, "resize-none")} />
                                        </div>
                                    </div>
                                </div>

                                <Button type="submit" size="lg" className="w-full rounded-full font-semibold shadow-md hover:-translate-y-0.5 transition-transform">
                                    <Send className="w-4 h-4 mr-2" />
                                    {t("advertise.form.submit")}
                                </Button>
                            </form>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}
