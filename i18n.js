import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '/public/locales/en.json';
import tr from '/public/locales/tr.json';

const resources = {
    en: {
        translation: en,
    },
    tr: {
        translation: tr,
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: 'en',

    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
