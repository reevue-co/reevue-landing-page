import { htmlLang, type Locale } from "@/lib/i18n";

function httpUrl(value: string | undefined): string | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;

  try {
    const url = new URL(trimmed);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    return url.toString();
  } catch {
    return null;
  }
}

export function getSiteUrl(): string | null {
  const url = httpUrl(process.env.NEXT_PUBLIC_SITE_URL);
  if (!url) return null;
  return new URL(url).origin;
}

export function getFormUrl(locale: Locale): string | null {
  const value =
    locale === "pt-br"
      ? process.env.NEXT_PUBLIC_GOOGLE_FORM_URL_PT
      : process.env.NEXT_PUBLIC_GOOGLE_FORM_URL_ES;

  return httpUrl(value);
}

export function getContactEmail(): string | null {
  const value = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();
  if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return null;
  return value;
}

export function getSocialLinks(): { instagram: string | null; linkedin: string | null } {
  return {
    instagram: httpUrl(process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM),
    linkedin: httpUrl(process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN),
  };
}

export function absoluteLocaleUrl(locale: Locale): string | null {
  const siteUrl = getSiteUrl();
  if (!siteUrl) return null;
  return `${siteUrl}/${locale}`;
}

export function openGraphLocale(locale: Locale): string {
  return htmlLang[locale].replace("-", "_");
}
