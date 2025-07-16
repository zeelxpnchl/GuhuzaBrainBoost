"use client";
import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import DarkModeToggle from "./DarkModeToggle";
import { LangContext } from "@/app/context/langContext";
import { useTranslation } from "react-i18next";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { lang, setLang } = useContext(LangContext);
    const { t } = useTranslation();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true); // ✅ prevent hydration error
    }, []);

    if (!mounted) return null; // ⛔ avoid SSR mismatch

    const LanguageSelector = () => (
        <div className="relative">
            <select
                value={lang}
                onChange={(e) => setLang(e.target.value as "en" | "fr" | "es" | "de")}
                className="appearance-none bg-black text-white border border-white px-4 py-[6px] text-sm rounded-md hover:bg-white hover:text-black transition-all pr-6"
            >
                <option value="en">English</option>
                <option value="fr">Français</option>
                <option value="es">Español</option>
                <option value="de">Deutsch</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-white text-xs">
                ▼
            </div>
        </div>
    );

    return (
        <header className="sticky top-0 z-50 bg-black dark:bg-black py-6 border-b border-neutral-700/60">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <Link href="/quiz">
                    <img src="/logo/logo_white_large.png" alt="Logo" className="h-10" />
                </Link>

                <div className="hidden md:flex items-center space-x-4">
                    <Link href="/quiz"><span className="text-white hover:underline">{t("navbar.quiz")}</span></Link>
                    <Link href="/"><span className="text-white hover:underline">{t("navbar.login")}</span></Link>
                    <Link href="/profile"><span className="text-white hover:underline">{t("navbar.profile")}</span></Link>
                    <a href="https://guhuza.com/" target="_blank">
                        <p className="text-white hover:underline flex items-center gap-1 group">
                            {t("navbar.guhuza")}{" "}
                            <Image
                                src="/icons/AnotherWebsite.svg"
                                className="transition-transform duration-300 group-hover:rotate-12"
                                alt="Guhuza Icon"
                                width={20}
                                height={20}
                            />
                        </p>
                    </a>
                    <DarkModeToggle />
                    <LanguageSelector />
                </div>

                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>

                <div className={`fixed inset-y-0 right-0 w-64 bg-black transition-transform duration-300 z-50 ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
                    <div className="flex justify-end p-4">
                        <button onClick={() => setIsMenuOpen(false)} className="text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex flex-col space-y-4 p-4 gap-8">
                        <Link href="/quiz"><span className="text-white hover:underline text-center">{t("navbar.quiz")}</span></Link>
                        <Link href="/"><span className="text-white hover:underline text-center">{t("navbar.login")}</span></Link>
                        <Link href="/profile"><span className="text-white hover:underline text-center">{t("navbar.profile")}</span></Link>
                        <a href="https://guhuza.com/" target="_blank" className="flex justify-center">
                            <p className="text-white hover:underline flex gap-1 group">
                                {t("navbar.guhuza")}{" "}
                                <Image src="/icons/AnotherWebsite.svg" className="transition-transform duration-300 group-hover:rotate-12" alt="" width={20} height={20} />
                            </p>
                        </a>
                        <div className="text-center mt-4"><DarkModeToggle /></div>
                        <div className="text-center"><LanguageSelector /></div>
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsMenuOpen(false)} />
                )}
            </div>
        </header>
    );
}

export default Navbar;
