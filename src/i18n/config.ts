export type Locale = "en" | "nl";
export const locales: Locale[] = ["en", "nl"];
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  nl: "Nederlands",
};
