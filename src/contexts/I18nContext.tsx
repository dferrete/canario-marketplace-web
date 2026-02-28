"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import pt from "@/locales/pt.json";
import en from "@/locales/en.json";
import es from "@/locales/es.json";

type Locale = "pt" | "en" | "es";
type Dictionary = typeof pt;

const dictionaries: Record<Locale, Dictionary> = { pt, en, es };

interface I18nContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    // A helper to traverse the JSON tree via dot notation e.g "nav.explore"
    t: (key: string, replacements?: Record<string, string>) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>("pt");
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Carrega o idioma salvo no localStorage no client-side
        const savedLocale = localStorage.getItem("canario_locale") as Locale;
        if (savedLocale && ["pt", "en", "es"].includes(savedLocale)) {
            setLocaleState(savedLocale);
        } // Se não houver, mantém 'pt'
        setIsLoaded(true);
    }, []);

    const setLocale = (newLocale: Locale) => {
        setLocaleState(newLocale);
        localStorage.setItem("canario_locale", newLocale);
    };

    const t = (key: string, replacements?: Record<string, string>): string => {
        const keys = key.split(".");
        let value: any = dictionaries[locale];

        for (const k of keys) {
            if (value && typeof value === "object" && k in value) {
                value = value[k];
            } else {
                return key; // Retorna a chave se não encontrar a tradução
            }
        }

        if (typeof value === "string") {
            if (replacements) {
                let replacedValue = value;
                for (const [k, v] of Object.entries(replacements)) {
                    replacedValue = replacedValue.replace(`{${k}}`, v);
                }
                return replacedValue;
            }
            return value;
        }

        return key;
    };

    // During SSR or before hydration, we must still provide the context to avoid useI18n crashing child components
    return (
        <I18nContext.Provider value={{ locale, setLocale, t }}>
            <div className={!isLoaded ? "opacity-0" : "opacity-100 transition-opacity duration-300"}>
                {children}
            </div>
        </I18nContext.Provider>
    );
}

export function useI18n() {
    const context = useContext(I18nContext);
    if (context === undefined) {
        throw new Error("useI18n must be used within an I18nProvider");
    }
    return context;
}
