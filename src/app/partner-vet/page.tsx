"use client";

import React, { useState, useRef } from "react";
import { useI18n } from "@/contexts/I18nContext";
import { Button } from "@/components/ui/button";
import {
    Stethoscope, Shield, Users, TrendingUp, CheckCircle2,
    Sparkles, Send, Bird, UploadCloud, X, ClipboardList,
    BookOpen, BadgeCheck, HeartHandshake, Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { partnerService, PartnerApplicationData } from "@/services/partner.service";

// ─────────────────────────────────────────────────────────────────────────────
// Benefits
// ─────────────────────────────────────────────────────────────────────────────
const BENEFITS = [
    { key: "reach", icon: <Users className="w-7 h-7" />, gradient: "from-sky-500/10 to-blue-500/5", border: "border-sky-500/20", iconBg: "bg-sky-500/10", iconColor: "text-sky-600" },
    { key: "trust", icon: <Shield className="w-7 h-7" />, gradient: "from-emerald-500/10 to-green-500/5", border: "border-emerald-500/20", iconBg: "bg-emerald-500/10", iconColor: "text-emerald-600" },
    { key: "grow", icon: <TrendingUp className="w-7 h-7" />, gradient: "from-violet-500/10 to-purple-500/5", border: "border-violet-500/20", iconBg: "bg-violet-500/10", iconColor: "text-violet-600" },
    { key: "referral", icon: <HeartHandshake className="w-7 h-7" />, gradient: "from-rose-500/10 to-pink-500/5", border: "border-rose-500/20", iconBg: "bg-rose-500/10", iconColor: "text-rose-600" },
];

// ─────────────────────────────────────────────────────────────────────────────
// Steps
// ─────────────────────────────────────────────────────────────────────────────
const STEPS = [
    { key: "apply", icon: <ClipboardList className="w-6 h-6" />, color: "bg-primary/10 text-primary" },
    { key: "review", icon: <BookOpen className="w-6 h-6" />, color: "bg-amber-500/10 text-amber-600" },
    { key: "approved", icon: <BadgeCheck className="w-6 h-6" />, color: "bg-emerald-500/10 text-emerald-600" },
    { key: "active", icon: <Stethoscope className="w-6 h-6" />, color: "bg-violet-500/10 text-violet-600" },
];

// Input / label reusable classes
const INPUT_CLS = "w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all";
const LABEL_CLS = "text-sm font-semibold text-foreground/80";

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────
const BRAZILIAN_STATES = [
    { value: 'AC', label: 'Acre' }, { value: 'AL', label: 'Alagoas' }, { value: 'AP', label: 'Amapá' },
    { value: 'AM', label: 'Amazonas' }, { value: 'BA', label: 'Bahia' }, { value: 'CE', label: 'Ceará' },
    { value: 'DF', label: 'Distrito Federal' }, { value: 'ES', label: 'Espírito Santo' }, { value: 'GO', label: 'Goiás' },
    { value: 'MA', label: 'Maranhão' }, { value: 'MT', label: 'Mato Grosso' }, { value: 'MS', label: 'Mato Grosso do Sul' },
    { value: 'MG', label: 'Minas Gerais' }, { value: 'PA', label: 'Pará' }, { value: 'PB', label: 'Paraíba' },
    { value: 'PR', label: 'Paraná' }, { value: 'PE', label: 'Pernambuco' }, { value: 'PI', label: 'Piauí' },
    { value: 'RJ', label: 'Rio de Janeiro' }, { value: 'RN', label: 'Rio Grande do Norte' }, { value: 'RS', label: 'Rio Grande do Sul' },
    { value: 'RO', label: 'Rondônia' }, { value: 'RR', label: 'Roraima' }, { value: 'SC', label: 'Santa Catarina' },
    { value: 'SP', label: 'São Paulo' }, { value: 'SE', label: 'Sergipe' }, { value: 'TO', label: 'Tocantins' }
];

const PREDEFINED_SERVICES = [
    "GTA (Guia de Trânsito Animal)",
    "Atestado de saúde",
    "Consulta clínica",
    "Exames laboratoriais",
    "Outro"
];

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────
export default function PartnerVetPage() {
    const { t } = useI18n();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [form, setForm] = useState({
        name: "", clinic: "", email: "", phone: "", cpfCnpj: "", city: "", state: "",
        crmv: "", experience: "", notes: "",
    });

    const [services, setServices] = useState<{ name: string, price: string }[]>([
        { name: "GTA (Guia de Trânsito Animal)", price: "" }
    ]);

    const handleServiceChange = (index: number, field: 'name' | 'price', value: string) => {
        const newServices = [...services];
        newServices[index][field] = value;
        setServices(newServices);
    };

    const addService = () => {
        setServices([...services, { name: "", price: "" }]);
    };

    const removeService = (index: number) => {
        setServices(services.filter((_, i) => i !== index));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
                role: "ROLE_VET",
                documentType: "CRMV",
                documentNumber: form.crmv,
                servicesOffered: JSON.stringify(services.filter(s => s.name.trim() !== "" && s.price.trim() !== ""))
            };

            await partnerService.applyForPartnership(payload);
            setSubmitted(true);
        } catch (err: any) {
            console.error("Error applying for partnership:", err);
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
                    <Stethoscope className="w-3.5 h-3.5" />
                    {t("partnerVet.hero.eyebrow")}
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-foreground tracking-tight leading-tight">
                    {t("partnerVet.hero.titlePart1")}{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                        {t("partnerVet.hero.titlePart2")}
                    </span>
                </h1>
                <p className="text-foreground/70 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                    {t("partnerVet.hero.subtitle")}
                </p>
            </header>

            <div className="max-w-5xl mx-auto space-y-24">

                {/* ── Benefits ──────────────────────────────────────────────── */}
                <section>
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-3">
                            <Bird className="w-3.5 h-3.5" />
                            {t("partnerVet.benefits.eyebrow")}
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{t("partnerVet.benefits.title")}</h2>
                        <p className="text-foreground/60 mt-2 text-sm sm:text-base max-w-xl mx-auto">{t("partnerVet.benefits.subtitle")}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {BENEFITS.map((b) => (
                            <div key={b.key} className={cn("flex flex-col gap-4 p-6 rounded-2xl border bg-gradient-to-br", b.gradient, b.border)}>
                                <div className={cn("p-3 rounded-xl w-fit", b.iconBg, b.iconColor)}>{b.icon}</div>
                                <div>
                                    <h3 className="font-bold text-foreground mb-1">{t(`partnerVet.benefits.${b.key}.title`)}</h3>
                                    <p className="text-xs text-foreground/60 leading-relaxed">{t(`partnerVet.benefits.${b.key}.desc`)}</p>
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
                            {t("partnerVet.steps.eyebrow")}
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{t("partnerVet.steps.title")}</h2>
                        <p className="text-foreground/60 mt-2 text-sm sm:text-base max-w-xl mx-auto">{t("partnerVet.steps.subtitle")}</p>
                    </div>

                    <div className="relative">
                        {/* Connector line (desktop) */}
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
                                        <h3 className="font-bold text-foreground">{t(`partnerVet.steps.${step.key}.title`)}</h3>
                                        <p className="text-xs text-foreground/60 mt-1 leading-relaxed max-w-[160px] mx-auto">{t(`partnerVet.steps.${step.key}.desc`)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Registration Form ─────────────────────────────────────── */}
                <section id="partner-vet-form">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-3">
                            <Send className="w-3.5 h-3.5" />
                            {t("partnerVet.form.eyebrow")}
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{t("partnerVet.form.title")}</h2>
                        <p className="text-foreground/60 mt-2 text-sm sm:text-base max-w-xl mx-auto">{t("partnerVet.form.subtitle")}</p>
                    </div>

                    <div className="max-w-3xl mx-auto bg-surface border border-border rounded-3xl p-8 shadow-sm">
                        {submitted ? (
                            <div className="flex flex-col items-center gap-4 py-10 text-center animate-in fade-in zoom-in-95">
                                <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                    <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                                </div>
                                <h3 className="text-xl font-bold text-foreground">{t("partnerVet.form.successTitle")}</h3>
                                <p className="text-foreground/60 text-sm max-w-sm">{t("partnerVet.form.successDesc")}</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8">

                                {/* ── Dados pessoais e profissionais ── */}
                                <div>
                                    <p className="text-xs font-bold text-primary uppercase tracking-wider mb-4">{t("partnerVet.form.sectionPersonal")}</p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        {error && (
                                            <div className="col-span-1 sm:col-span-2 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 border border-red-200">
                                                {error}
                                            </div>
                                        )}
                                        <div className="space-y-1.5">
                                            <label className={LABEL_CLS}>{t("partnerVet.form.nameLabel")}</label>
                                            <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder={t("partnerVet.form.namePlaceholder")} className={INPUT_CLS} />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className={LABEL_CLS}>{t("partnerVet.form.clinicLabel")}</label>
                                            <input type="text" name="clinic" value={form.clinic} onChange={handleChange} placeholder={t("partnerVet.form.clinicPlaceholder")} className={INPUT_CLS} />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className={LABEL_CLS}>{t("partnerVet.form.emailLabel")}</label>
                                            <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder={t("partnerVet.form.emailPlaceholder")} className={INPUT_CLS} />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className={LABEL_CLS}>CPF / CNPJ</label>
                                            <input type="text" name="cpfCnpj" value={form.cpfCnpj} onChange={handleChange} required placeholder="000.000.000-00" className={INPUT_CLS} />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className={LABEL_CLS}>{t("partnerVet.form.phoneLabel")}</label>
                                            <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder={t("partnerVet.form.phonePlaceholder")} className={INPUT_CLS} />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className={LABEL_CLS}>{t("partnerVet.form.cityLabel")}</label>
                                            <input type="text" name="city" value={form.city} onChange={handleChange} required placeholder={t("partnerVet.form.cityPlaceholder")} className={INPUT_CLS} />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className={LABEL_CLS}>{t("partnerVet.form.stateLabel")}</label>
                                            <select name="state" value={form.state} onChange={handleChange} required className={INPUT_CLS}>
                                                <option value="" disabled>{t("partnerVet.form.statePlaceholder")}</option>
                                                {BRAZILIAN_STATES.map(s => (
                                                    <option key={s.value} value={s.value}>{s.label}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-border" />

                                {/* ── Credenciais profissionais ── */}
                                <div>
                                    <p className="text-xs font-bold text-primary uppercase tracking-wider mb-4">{t("partnerVet.form.sectionCredentials")}</p>
                                    <div className="space-y-5">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div className="space-y-1.5">
                                                <label className={LABEL_CLS}>{t("partnerVet.form.crmvLabel")}</label>
                                                <input type="text" name="crmv" value={form.crmv} onChange={handleChange} required placeholder={t("partnerVet.form.crmvPlaceholder")} className={INPUT_CLS} />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className={LABEL_CLS}>{t("partnerVet.form.experienceLabel")}</label>
                                                <select name="experience" value={form.experience} onChange={handleChange} required className={INPUT_CLS}>
                                                    <option value="" disabled>{t("partnerVet.form.experiencePlaceholder")}</option>
                                                    <option value="1">{t("partnerVet.form.exp1")}</option>
                                                    <option value="3">{t("partnerVet.form.exp3")}</option>
                                                    <option value="5">{t("partnerVet.form.exp5")}</option>
                                                    <option value="10">{t("partnerVet.form.exp10")}</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <label className={LABEL_CLS}>Serviços Oferecidos e Valores (R$)</label>
                                                <Button type="button" variant="outline" size="sm" onClick={addService} className="h-8 text-xs border-dashed border-primary/50 text-primary hover:bg-primary/5">
                                                    + Adicionar Serviço
                                                </Button>
                                            </div>

                                            {services.map((svc, idx) => (
                                                <div key={idx} className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                                                    <div className="flex-1 w-full">
                                                        <input
                                                            type="text"
                                                            list="predefined-services"
                                                            value={svc.name}
                                                            onChange={(e) => handleServiceChange(idx, 'name', e.target.value)}
                                                            placeholder="Ex: Consulta Clínica"
                                                            className={INPUT_CLS}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="w-full sm:w-32 relative">
                                                        <span className="absolute left-3 top-2.5 text-foreground/50 text-sm">R$</span>
                                                        <input
                                                            type="number"
                                                            step="0.01"
                                                            min="0"
                                                            value={svc.price}
                                                            onChange={(e) => handleServiceChange(idx, 'price', e.target.value)}
                                                            placeholder="0,00"
                                                            className={cn(INPUT_CLS, "pl-9")}
                                                            required
                                                        />
                                                    </div>
                                                    {services.length > 1 && (
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => removeService(idx)}
                                                            className="text-foreground/40 hover:text-destructive hover:bg-destructive/10 -mt-1 sm:mt-0"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </Button>
                                                    )}
                                                </div>
                                            ))}
                                            <datalist id="predefined-services">
                                                {PREDEFINED_SERVICES.map(p => <option key={p} value={p} />)}
                                            </datalist>
                                        </div>

                                        {/* Photo / Document upload */}
                                        <div className="space-y-1.5">
                                            <label className={LABEL_CLS}>{t("partnerVet.form.photoLabel")}</label>
                                            {imagePreview ? (
                                                <div className="relative inline-block w-full">
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
                                                    <span className="text-sm font-medium">{t("partnerVet.form.photoHint")}</span>
                                                    <span className="text-xs">{t("partnerVet.form.photoFormats")}</span>
                                                </button>
                                            )}
                                            <input ref={fileInputRef} type="file" accept="image/png,image/jpeg,image/webp" onChange={handleImageChange} className="hidden" />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className={LABEL_CLS}>{t("partnerVet.form.notesLabel")}</label>
                                            <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} placeholder={t("partnerVet.form.notesPlaceholder")} className={cn(INPUT_CLS, "resize-none")} />
                                        </div>
                                    </div>
                                </div>

                                <Button type="submit" size="lg" disabled={isLoading} className="w-full rounded-full font-semibold shadow-md hover:-translate-y-0.5 transition-transform">
                                    {isLoading ? (
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    ) : (
                                        <Send className="w-4 h-4 mr-2" />
                                    )}
                                    {t("partnerVet.form.submit")}
                                </Button>
                            </form>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}
