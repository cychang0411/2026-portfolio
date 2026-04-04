import type { Locale } from "@/data/portfolio-content";

export const DEFAULT_LOCALE: Locale = "zh";
export const LOCALE_STORAGE_KEY = "portfolio-locale";

export function isLocale(value: string | null): value is Locale {
  return value === "zh" || value === "en";
}

export function readStoredLocale(): Locale {
  if (typeof window === "undefined") {
    return DEFAULT_LOCALE;
  }

  const storedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  return isLocale(storedLocale) ? storedLocale : DEFAULT_LOCALE;
}

export function persistLocale(locale: Locale) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
}
