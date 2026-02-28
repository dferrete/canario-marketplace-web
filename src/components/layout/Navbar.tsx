"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Bird, ShoppingCart, User, LogOut, Loader2, Globe, Menu, X, Heart, Ticket, Gavel, Package, ShoppingBag, Store } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useI18n } from "@/contexts/I18nContext";
import { Button } from "@/components/ui/button";

export function Navbar() {
    const { user, isAuthenticated, logout, isLoading } = useAuth();
    const { t, locale, setLocale } = useI18n();
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const toggleLanguage = (newLocale: "pt" | "en" | "es") => {
        setLocale(newLocale);
        setIsLangMenuOpen(false);
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border bg-surface/80 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Brand */}
                <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary-hover transition-colors">
                    <Bird className="w-8 h-8" />
                    <span className="font-bold text-xl tracking-tight hidden sm:block">
                        Canário Marketplace
                    </span>
                </Link>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center space-x-8">
                    <Link href="/" className="flex items-center gap-1.5 text-foreground/80 hover:text-primary font-medium transition-colors">
                        <Bird className="w-4 h-4" />
                        {t("nav.birds")}
                    </Link>
                    <Link href="#" className="flex items-center gap-1.5 text-foreground/80 hover:text-primary font-medium transition-colors">
                        <Ticket className="w-4 h-4" />
                        {t("nav.raffles")}
                    </Link>
                    <Link href="#" className="flex items-center gap-1.5 text-foreground/80 hover:text-primary font-medium transition-colors">
                        <Gavel className="w-4 h-4" />
                        {t("nav.auctions")}
                    </Link>
                    <Link href="#" className="flex items-center gap-1.5 text-foreground/80 hover:text-primary font-medium transition-colors">
                        <Package className="w-4 h-4" />
                        {t("nav.batches")}
                    </Link>
                </div>

                {/* User Actions */}
                <div className="flex items-center gap-2 sm:gap-4">
                    {/* Language Switcher */}
                    <div className="relative">
                        <button
                            onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                            className="p-2 flex items-center gap-1 text-foreground/60 hover:text-primary transition-colors rounded-full hover:bg-primary/5 text-sm font-medium"
                        >
                            <Globe className="w-5 h-5" />
                            <span className="hidden sm:inline-block uppercase">{locale}</span>
                        </button>

                        {isLangMenuOpen && (
                            <div className="absolute right-0 mt-2 w-32 bg-surface rounded-xl shadow-lg border border-border py-2 z-50 animate-in fade-in slide-in-from-top-2">
                                <button onClick={() => toggleLanguage('pt')} className={`w-full text-left px-4 py-2 text-sm hover:bg-primary/10 transition-colors ${locale === 'pt' ? 'text-primary font-bold' : 'text-foreground/80'}`}>Português (BR)</button>
                                <button onClick={() => toggleLanguage('en')} className={`w-full text-left px-4 py-2 text-sm hover:bg-primary/10 transition-colors ${locale === 'en' ? 'text-primary font-bold' : 'text-foreground/80'}`}>English (US)</button>
                                <button onClick={() => toggleLanguage('es')} className={`w-full text-left px-4 py-2 text-sm hover:bg-primary/10 transition-colors ${locale === 'es' ? 'text-primary font-bold' : 'text-foreground/80'}`}>Español</button>
                            </div>
                        )}
                    </div>

                    <button className="p-2 text-foreground/60 hover:text-primary transition-colors rounded-full hover:bg-primary/5 hidden sm:block">
                        <ShoppingCart className="w-6 h-6" />
                    </button>

                    <div className="flex items-center gap-3 border-l border-border pl-2 sm:pl-4">
                        {isLoading ? (
                            <div className="flex items-center justify-center p-2">
                                <Loader2 className="w-5 h-5 animate-spin text-primary" />
                            </div>
                        ) : isAuthenticated ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="flex items-center gap-2 hover:bg-primary/5 p-1 pr-2 rounded-full transition-colors focus:outline-none"
                                >
                                    <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 text-primary overflow-hidden border border-primary/20">
                                        {user?.avatarUrl ? (
                                            <img src={`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}${user.avatarUrl}`} alt={user.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <User className="w-4 h-4 sm:w-5 sm:h-5" />
                                        )}
                                    </div>
                                    <div className="hidden sm:flex flex-col text-sm items-start">
                                        <span className="font-semibold text-foreground leading-none">
                                            {t("nav.hello")}, {user?.name?.split(' ')[0] || t("nav.myAccount")}
                                        </span>
                                        <span className="text-muted-foreground text-[10px] mt-0.5 uppercase tracking-wide font-medium">
                                            {t("nav.myAccount")}
                                        </span>
                                    </div>
                                </button>

                                {isUserMenuOpen && (
                                    <>
                                        <div className="fixed inset-0 z-40" onClick={() => setIsUserMenuOpen(false)}></div>
                                        <div className="absolute right-0 mt-2 w-48 bg-surface rounded-xl shadow-lg border border-border py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                                            <Link href="/profile" onClick={() => setIsUserMenuOpen(false)} className="w-full flex items-center px-4 py-2.5 text-sm text-foreground/80 hover:text-primary hover:bg-primary/5 transition-colors">
                                                <User className="w-4 h-4 mr-2" />
                                                {t("nav.myProfile")}
                                            </Link>
                                            <Link href="/favorites" onClick={() => setIsUserMenuOpen(false)} className="w-full flex items-center px-4 py-2.5 text-sm text-foreground/80 hover:text-primary hover:bg-primary/5 transition-colors">
                                                <Heart className="w-4 h-4 mr-2" />
                                                {t("nav.favorites")}
                                            </Link>
                                            <Link href="/orders" onClick={() => setIsUserMenuOpen(false)} className="w-full flex items-center px-4 py-2.5 text-sm text-foreground/80 hover:text-primary hover:bg-primary/5 transition-colors">
                                                <ShoppingBag className="w-4 h-4 mr-2" />
                                                {t("nav.orders")}
                                            </Link>
                                            <Link href="/listings/me" onClick={() => setIsUserMenuOpen(false)} className="w-full flex items-center px-4 py-2.5 text-sm text-foreground/80 hover:text-primary hover:bg-primary/5 transition-colors">
                                                <Store className="w-4 h-4 mr-2" />
                                                {t("nav.myListings")}
                                            </Link>
                                            <div className="h-px bg-border my-1 mx-2" />
                                            <button
                                                onClick={() => {
                                                    setIsUserMenuOpen(false);
                                                    logout();
                                                }}
                                                className="w-full flex items-center px-4 py-2.5 text-sm text-danger hover:bg-danger/10 transition-colors"
                                            >
                                                <LogOut className="w-4 h-4 mr-2" />
                                                {t("nav.logout")}
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link href="/login">
                                    <Button variant="outline" className="hidden sm:flex">{t("nav.login")}</Button>
                                </Link>
                                <Link href="/register">
                                    <Button>{t("nav.register")}</Button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="p-2 ml-1 text-foreground/60 hover:text-primary transition-colors rounded-full hover:bg-primary/5 md:hidden"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t border-border bg-surface/95 backdrop-blur-md animate-in slide-in-from-top-2">
                    <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
                        <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-xl font-medium transition-colors text-lg flex items-center gap-3">
                            <Bird className="w-5 h-5 text-primary/80" />
                            {t("nav.birds")}
                        </Link>
                        <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-xl font-medium transition-colors text-lg flex items-center gap-3">
                            <Ticket className="w-5 h-5 text-primary/80" />
                            {t("nav.raffles")}
                        </Link>
                        <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-xl font-medium transition-colors text-lg flex items-center gap-3">
                            <Gavel className="w-5 h-5 text-primary/80" />
                            {t("nav.auctions")}
                        </Link>
                        <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-xl font-medium transition-colors text-lg flex items-center gap-3">
                            <Package className="w-5 h-5 text-primary/80" />
                            {t("nav.batches")}
                        </Link>

                        {/* Mobile Auth Actions (When not authenticated) */}
                        {!isAuthenticated && !isLoading && (
                            <div className="flex flex-col gap-3 pt-4 border-t border-border/50">
                                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button variant="outline" className="w-full justify-center h-12 text-base">{t("nav.login")}</Button>
                                </Link>
                                <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button className="w-full justify-center h-12 text-base">{t("nav.register")}</Button>
                                </Link>
                            </div>
                        )}

                        {/* Mobile Authenticated Actions */}
                        {isAuthenticated && !isLoading && (
                            <div className="flex flex-col gap-3 pt-4 border-t border-border/50">
                                <button
                                    onClick={() => {
                                        logout();
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="px-4 py-3 text-danger hover:bg-danger/10 rounded-xl font-medium w-full text-left transition-colors flex justify-between items-center"
                                >
                                    <span>{t("nav.logout")}</span>
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
