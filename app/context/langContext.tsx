"use client";
import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import i18n from "i18next";

type Lang = "en" | "fr" | "es" | "de";

interface LangContextType {
    lang: Lang;
    setLang: (lang: Lang) => void;
}

export const LangContext = createContext<LangContextType>({
    lang: "en",
    setLang: () => { },
});

export const LangProvider = ({ children }: { children: ReactNode }) => {
    const [lang, setLangState] = useState<Lang>("en");

    useEffect(() => {
        const storedLang = (typeof window !== "undefined" && localStorage.getItem("lang")) as Lang | null;
        const initialLang = storedLang || "en";
        setLangState(initialLang);
        i18n.changeLanguage(initialLang);
    }, []);

    const setLang = (newLang: Lang) => {
        setLangState(newLang);
        if (typeof window !== "undefined") {
            localStorage.setItem("lang", newLang);
        }
        i18n.changeLanguage(newLang);
    };

    return (
        <LangContext.Provider value={{ lang, setLang }}>
            {children}
        </LangContext.Provider>
    );
};

export const useLang = () => useContext(LangContext);
