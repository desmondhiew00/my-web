import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en.json";
import ja from "./ja.json";
import zh from "./zh-cn.json";

i18next.use(initReactI18next).init({
  lng: "en",
  debug: false,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  resources: {
    en: { translation: en },
    ja: { translation: ja },
    zh: { translation: zh },
  },
});
