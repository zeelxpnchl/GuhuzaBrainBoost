'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { translations } from './translations'; // adjust this path if needed

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: translations.en },
            fr: { translation: translations.fr },
            es: { translation: translations.es },
            de: { translation: translations.de },
        },
        lng: typeof window !== 'undefined' ? localStorage.getItem('lang') || 'en' : 'en',
        fallbackLng: 'en',
        supportedLngs: ['en', 'fr', 'es', 'de'],
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
        },
    });

export default i18n;
