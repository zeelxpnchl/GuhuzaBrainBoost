"use client";
import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { LangContext } from "@/app/context/langContext";

export default function Footer() {
    const { lang } = useContext(LangContext);
    const t = (en: string, fr: string, es: string, de: string) =>
        lang === "fr" ? fr : lang === "es" ? es : lang === "de" ? de : en;

    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto">
                <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    <div className="space-y-4">
                        <Image
                            src="/logo/logo_white_small.png"
                            alt="Guhuza Logo"
                            width={150}
                            height={50}
                            className="w-32"
                        />
                        <p className="text-sm">Copyright ©2025 Guhuza.</p>
                        <p className="text-sm">v3.4.4</p>
                    </div>

                    <div className="space-y-4">
                        <p className="font-semibold">{t("GET SOCIAL WITH US!", "SOYEZ SOCIABLE AVEC NOUS !", "¡SÉ SOCIAL CON NOSOTROS!", "WERDE SOZIAL MIT UNS!")}</p>
                        <div className="flex space-x-4">
                            {[
                                { href: "https://www.linkedin.com/company/guhuza", icon: "linkedin" },
                                { href: "https://www.facebook.com/Guhuza-103434808683693", icon: "facebook" },
                                { href: "https://twitter.com/guhuza_", icon: "twitter" },
                                { href: "https://www.instagram.com/guhuza_/", icon: "instagram" },
                                { href: "https://www.youtube.com/watch?v=q8xWi5LYa8E", icon: "youtube" },
                                { href: "https://www.tiktok.com/@guhuza", icon: "tiktok" },
                                { href: "https://open.spotify.com/show/4jQy8DF6ut5lHxpYMjKxA2", icon: "spotify" },
                            ].map(({ href, icon }) => (
                                <Link key={icon} href={href} target="_blank">
                                    <Image src={`/icons/${icon}.svg`} alt={icon} width={24} height={24} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h6 className="font-semibold">{t("Company Info", "Infos sur l’entreprise", "Información de la empresa", "Unternehmensinfo")}</h6>
                        <Link href="https://guhuza.com/about-us" target="_blank" className="block text-sm hover:underline">
                            {t("About Us", "À propos de nous", "Sobre nosotros", "Über uns")}
                        </Link>
                        <Link href="mailto:investors@guhuza.com" className="block text-sm hover:underline">
                            {t("Investor Relations", "Relations investisseurs", "Relaciones con inversores", "Investor Relations")}
                        </Link>
                    </div>

                    <div className="space-y-4">
                        <h6 className="font-semibold">{t("Legal", "Légal", "Legal", "Rechtliches")}</h6>
                        <Link href="https://guhuza.com/privacy-policy" target="_blank" className="block text-sm hover:underline">
                            {t("Privacy Policy", "Politique de confidentialité", "Política de privacidad", "Datenschutzrichtlinie")}
                        </Link>
                        <Link href="https://guhuza.com/terms-of-use" target="_blank" className="block text-sm hover:underline">
                            {t("Terms & Conditions", "Termes et conditions", "Términos y condiciones", "Geschäftsbedingungen")}
                        </Link>
                        <Link href="https://guhuza.com/cookie-policy" target="_blank" className="block text-sm hover:underline">
                            {t("Cookie Policy", "Politique de cookies", "Política de cookies", "Cookie-Richtlinie")}
                        </Link>
                        <Link href="https://guhuza.com/subscription-agreement" target="_blank" className="block text-sm hover:underline">
                            {t("Subscription Agreement", "Accord d’abonnement", "Acuerdo de suscripción", "Abonnementvereinbarung")}
                        </Link>
                    </div>

                    <div className="space-y-4">
                        <h6 className="font-semibold">{t("Support", "Soutien", "Apoyo", "Unterstützung")}</h6>
                        <Link href="https://guhuza.com/contact" target="_blank" className="block text-sm hover:underline">
                            {t("Contact Us", "Contactez-nous", "Contáctenos", "Kontaktiere uns")}
                        </Link>
                        <Link href="https://guhuza.com/help" target="_blank" className="block text-sm hover:underline">
                            {t("Help", "Aide", "Ayuda", "Hilfe")}
                        </Link>
                    </div>
                </div>
            </div>

            <div className="bg-gray-100 dark:bg-black py-8 text-gray-800 dark:text-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h6 className="font-semibold">{t("Powered by:", "Propulsé par :", "Desarrollado por:", "Bereitgestellt von:")}</h6>
                            <Link href="http://www.TorontoJobs.ca" target="_blank">
                                <Image
                                    src="/toronto-jobs/logo3.png"
                                    alt="Toronto Jobs"
                                    width={150}
                                    height={50}
                                    className="w-32"
                                />
                            </Link>
                        </div>
                        <div className="space-y-4">
                            <p className="font-semibold">{t("Download the app", "Téléchargez l’application", "Descarga la aplicación", "Lade die App herunter")}</p>
                            <div className="flex space-x-4">
                                <Link href="https://apps.apple.com/ca/app/guhuza/id1611562767?platform=iphone" target="_blank">
                                    <Image src="/images/footer/download_app_store.png" alt="Download iOS App" width={120} height={40} />
                                </Link>
                                <Link href="https://play.google.com/store/apps/details?id=com.guhuza.app" target="_blank">
                                    <Image src="/images/footer/download_google_play.png" alt="Download Android App" width={120} height={40} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
