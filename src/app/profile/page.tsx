"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useI18n } from "@/contexts/I18nContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, User as UserIcon, Mail, Phone, Hash, Save, X, Edit2, Bird, ShoppingCart, Ticket, Gavel, Package, Camera } from "lucide-react";

export default function ProfilePage() {
    const router = useRouter();
    const { user, updateProfile, uploadAvatar, isLoading } = useAuth();
    const { t } = useI18n();

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState({ text: "", type: "" });

    useEffect(() => {
        if (!isLoading && !user) {
            router.push("/login");
        } else if (user) {
            setName(user.name || "");
            setPhone(user.telefone || "");
        }
    }, [user, isLoading, router]);

    if (isLoading || !user) {
        return (
            <div className="flex min-h-[80vh] items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        );
    }

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage({ text: "", type: "" });

        try {
            await updateProfile({
                id: user.id,
                nome: name,
                email: user.email,
                cpf: user.cpf,
                telefone: phone
            });
            setMessage({ text: t("profile.successMessage"), type: "success" });
            setIsEditing(false);
        } catch (err) {
            setMessage({ text: t("profile.errorMessage"), type: "error" });
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        setName(user.name || "");
        setPhone(user.telefone || "");
        setIsEditing(false);
        setMessage({ text: "", type: "" });
    };

    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validation
        const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            setMessage({ text: t("profile.avatarTypeError"), type: "error" });
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            setMessage({ text: t("profile.avatarSizeError"), type: "error" });
            return;
        }

        try {
            setIsUploadingAvatar(true);
            setMessage({ text: "", type: "" });
            await uploadAvatar(file);
            setMessage({ text: t("profile.avatarUpdateSuccess"), type: "success" });
        } catch (err) {
            setMessage({ text: t("profile.avatarUpdateError"), type: "error" });
        } finally {
            setIsUploadingAvatar(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const avatarSource = user.avatarUrl
        ? `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}${user.avatarUrl}`
        : null;

    return (
        <div className="container mx-auto px-4 py-12 max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">{t("profile.title")}</h1>
                    <p className="text-muted-foreground mt-1">{t("profile.description")}</p>
                </div>
            </div>

            <Card className="border-border/50 bg-surface/50 backdrop-blur-xl shadow-xl">
                <CardHeader className="border-b border-border/50 pb-6 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-6">
                            {/* Avatar Upload Container */}
                            <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                                <div className={`w-24 h-24 rounded-full border-4 border-background shadow-lg overflow-hidden bg-muted flex items-center justify-center relative ${isUploadingAvatar ? 'opacity-50' : ''}`}>
                                    {avatarSource ? (
                                        <img src={avatarSource} alt={user.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <UserIcon className="w-10 h-10 text-muted-foreground" />
                                    )}
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Camera className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                                {isUploadingAvatar && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Loader2 className="w-6 h-6 text-primary animate-spin" />
                                    </div>
                                )}
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/jpeg, image/png, image/webp"
                                    onChange={handleAvatarChange}
                                />
                            </div>

                            <div>
                                <CardTitle className="text-xl flex items-center gap-2">
                                    <UserIcon className="w-5 h-5 text-primary" />
                                    {t("profile.personalInfo")}
                                </CardTitle>
                                <CardDescription className="mt-1 flex items-center gap-1">
                                    <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                                    {user.role === 'ROLE_ADMIN' ? 'Administrador' : 'Conta Ativa'}
                                </CardDescription>
                            </div>
                        </div>

                        {!isEditing && (
                            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                                <Edit2 className="w-4 h-4 mr-2" />
                                {t("profile.editButton")}
                            </Button>
                        )}
                    </div>
                </CardHeader>
                <form onSubmit={handleSave}>
                    <CardContent className="space-y-6">
                        {message.text && (
                            <div className={`p-4 rounded-lg border text-sm flex items-center gap-2 ${message.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-600' : 'bg-red-500/10 border-red-500/20 text-red-600'}`}>
                                {message.text}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name Field - Editable */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none flex items-center gap-2 text-foreground/80">
                                    <UserIcon className="w-4 h-4 text-muted-foreground" />
                                    {t("profile.nameLabel")}
                                </label>
                                <input
                                    type="text"
                                    required
                                    disabled={!isEditing}
                                    className="flex h-11 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-60 disabled:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            {/* Phone Field - Editable */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none flex items-center gap-2 text-foreground/80">
                                    <Phone className="w-4 h-4 text-muted-foreground" />
                                    {t("profile.phoneLabel")}
                                </label>
                                <input
                                    type="text"
                                    required
                                    disabled={!isEditing}
                                    className="flex h-11 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-60 disabled:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>

                            {/* Email Field - Read Only */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none flex items-center gap-2 text-foreground/80">
                                    <Mail className="w-4 h-4 text-muted-foreground" />
                                    {t("profile.emailLabel")}
                                </label>
                                <input
                                    type="email"
                                    disabled
                                    className="flex h-11 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm ring-offset-background cursor-not-allowed opacity-60"
                                    value={user.email}
                                />
                                <p className="text-xs text-muted-foreground">O e-mail não pode ser alterado após o cadastro.</p>
                            </div>

                            {/* CPF Field - Read Only */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none flex items-center gap-2 text-foreground/80">
                                    <Hash className="w-4 h-4 text-muted-foreground" />
                                    {t("profile.cpfLabel")}
                                </label>
                                <input
                                    type="text"
                                    disabled
                                    className="flex h-11 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm ring-offset-background cursor-not-allowed opacity-60"
                                    value={user.cpf}
                                />
                                <p className="text-xs text-muted-foreground">Documento fiscal bloqueado para edição.</p>
                            </div>
                        </div>
                    </CardContent>

                    {isEditing && (
                        <CardFooter className="flex justify-end space-x-3 pt-6 border-t border-border/50">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleCancel}
                                disabled={isSaving}
                            >
                                <X className="w-4 h-4 mr-2" />
                                {t("profile.cancelButton")}
                            </Button>
                            <Button
                                type="submit"
                                disabled={isSaving || !name.trim() || !phone.trim()}
                            >
                                {isSaving ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        {t("profile.saving")}
                                    </>
                                ) : (
                                    <>
                                        <Save className="mr-2 h-4 w-4" />
                                        {t("profile.saveButton")}
                                    </>
                                )}
                            </Button>
                        </CardFooter>
                    )}
                </form>
            </Card>

            {/* Account Dashboard Summary */}
            <div className="mt-12 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
                <h2 className="text-2xl font-bold tracking-tight text-foreground mb-6">{t("profile.statsTitle")}</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {/* Birds Sold */}
                    <Card className="border-border/50 bg-surface/50 backdrop-blur-xl shadow-md hover:shadow-lg transition-all">
                        <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-3">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                                <Bird className="w-6 h-6" />
                            </div>
                            <h3 className="font-semibold text-lg leading-tight">0</h3>
                            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{t("profile.birdsSold")}</p>
                        </CardContent>
                    </Card>

                    {/* Birds Bought */}
                    <Card className="border-border/50 bg-surface/50 backdrop-blur-xl shadow-md hover:shadow-lg transition-all">
                        <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-3">
                            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 mb-2">
                                <ShoppingCart className="w-6 h-6" />
                            </div>
                            <h3 className="font-semibold text-lg leading-tight">0</h3>
                            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{t("profile.birdsBought")}</p>
                        </CardContent>
                    </Card>

                    {/* Raffles Won */}
                    <Card className="border-border/50 bg-surface/50 backdrop-blur-xl shadow-md hover:shadow-lg transition-all">
                        <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-3">
                            <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 mb-2">
                                <Ticket className="w-6 h-6" />
                            </div>
                            <h3 className="font-semibold text-lg leading-tight">0</h3>
                            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{t("profile.rafflesWon")}</p>
                        </CardContent>
                    </Card>

                    {/* Auctions Won */}
                    <Card className="border-border/50 bg-surface/50 backdrop-blur-xl shadow-md hover:shadow-lg transition-all">
                        <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-3">
                            <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500 mb-2">
                                <Gavel className="w-6 h-6" />
                            </div>
                            <h3 className="font-semibold text-lg leading-tight">0</h3>
                            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{t("profile.auctionsWon")}</p>
                        </CardContent>
                    </Card>

                    {/* Batches Bought */}
                    <Card className="border-border/50 bg-surface/50 backdrop-blur-xl shadow-md hover:shadow-lg transition-all">
                        <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-3">
                            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-2">
                                <Package className="w-6 h-6" />
                            </div>
                            <h3 className="font-semibold text-lg leading-tight">0</h3>
                            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{t("profile.batchesBought")}</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
