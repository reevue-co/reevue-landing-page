export const locales = ["pt-br", "es"] as const;

export type Locale = (typeof locales)[number];

export function hasLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}

export const htmlLang: Record<Locale, string> = {
  "pt-br": "pt-BR",
  es: "es-419",
};
