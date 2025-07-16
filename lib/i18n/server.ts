import { createInstance, i18n } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import { translations } from "../translations";

// Define supported languages
type SupportedLang = "en" | "fr" | "es" | "de";

/**
 * Creates a fresh i18n instance for server-side translations
 * @param lng Language code (default: "en")
 * @returns Bound translation function
 */
export async function getI18n(lng: SupportedLang = "en") {
    const i18nInstance: i18n = createInstance();

    await i18nInstance
        .use(initReactI18next)
        .init({
            lng,
            fallbackLng: "en",
            ns: ["translation"],
            defaultNS: "translation",
            interpolation: {
                escapeValue: false,
            },
            resources: {
                en: { translation: translations.en },
                fr: { translation: translations.fr },
                es: { translation: translations.es },
                de: { translation: translations.de },
            },
        });

    return i18nInstance.t.bind(i18nInstance);
}
