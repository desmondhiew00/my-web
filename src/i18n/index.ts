import { i18n } from "@lingui/core";

import { messages as en } from "@/locales/en/messages.po";

/** en ships with the bundle; the rest are fetched on demand. */
const catalogs = {
  en: async () => en,
  ja: async () => (await import("@/locales/ja/messages.po")).messages,
  "zh-CN": async () => (await import("@/locales/zh-CN/messages.po")).messages,
};

export type Locale = keyof typeof catalogs;

i18n.loadAndActivate({ locale: "en", messages: en });

export async function activateLocale(locale: Locale) {
  i18n.loadAndActivate({ locale, messages: await catalogs[locale]() });
}
