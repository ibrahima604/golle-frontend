// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationFR from './locales/fr/translation.json';
import translationEN from './locales/en/translation.json';
import translationPE from './locales/pe/translation.json';

const resources = {
  fr: { translation: translationFR },
  en: { translation: translationEN },
  pe: { translation: translationPE }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('lang') || 'fr',
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false,
    },
  });

// Sauvegarde automatique de la langue
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('lang', lng);
});

export default i18n;
