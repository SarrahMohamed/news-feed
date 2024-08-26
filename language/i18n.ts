import en from './en.json';
import ar from './ar.json';

import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {translation: en},
    ar: {translation: ar},
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  pluralSeparator: '_',
  keySeparator: false,
});

export default i18n;
