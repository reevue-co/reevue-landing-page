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
  const specific =
    locale === "pt-br"
      ? process.env.NEXT_PUBLIC_GOOGLE_FORM_URL_PT
      : locale === "es"
        ? process.env.NEXT_PUBLIC_GOOGLE_FORM_URL_ES
        : process.env.NEXT_PUBLIC_GOOGLE_FORM_URL_EN;

  return (
    httpUrl(specific) ??
    httpUrl(process.env.NEXT_PUBLIC_GOOGLE_FORM_URL_PT) ??
    httpUrl(process.env.NEXT_PUBLIC_GOOGLE_FORM_URL_ES)
  );
}

const googleAnalyticsId = /^G-[A-Z0-9]+$/;

export function getGoogleAnalyticsId(): string | null {
  const value = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim().toUpperCase();
  if (!value || !googleAnalyticsId.test(value)) return null;
  return value;
}

export function getContactEmail(): string | null {
  const value = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();
  if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return null;
  return value;
}

export type SocialLinks = {
  facebook: string | null;
  instagram: string | null;
  linkedin: string | null;
  youtube: string | null;
  tiktok: string | null;
};

export function getSocialLinks(): SocialLinks {
  return {
    facebook: httpUrl(process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK),
    instagram: httpUrl(process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM),
    linkedin: httpUrl(process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN),
    youtube: httpUrl(process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE),
    tiktok: httpUrl(process.env.NEXT_PUBLIC_SOCIAL_TIKTOK),
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
