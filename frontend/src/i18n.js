import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation files
import enTranslations from './locales/en.json';
import afTranslations from './locales/af.json';
import zuTranslations from './locales/zu.json';
import xhTranslations from './locales/xh.json';

const resources = {
  en: {
    translation: enTranslations
  },
  af: {
    translation: afTranslations
  },
  zu: {
    translation: zuTranslations
  },
  xh: {
    translation: xhTranslations
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'regulaease-language'
    }
  });

export default i18n; 