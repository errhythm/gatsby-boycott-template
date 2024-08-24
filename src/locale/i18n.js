import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslation from "../locale/en_gb.json";
import bnTranslation from "../locale/bn_bd.json";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: enTranslation
  },
  bn: {
    translation: bnTranslation
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
