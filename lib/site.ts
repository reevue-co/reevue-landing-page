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

const googleAnalyticsId = /^G-[A-Z0-9]+$/;

export function getGoogleAnalyticsId(): string | null {
  const value = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim().toUpperCase();
  if (!value || !googleAnalyticsId.test(value)) return null;
  return value;
}

export function getContactEmail(): string | null {
  const value = process.env.NEXT_PUBLIC_EMAIL?.trim();
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
    facebook: httpUrl(process.env.NEXT_PUBLIC_FACEBOOK_URL),
    instagram: httpUrl(process.env.NEXT_PUBLIC_INSTAGRAM_URL),
    linkedin: httpUrl(process.env.NEXT_PUBLIC_LINKEDIN_URL),
    youtube: httpUrl(process.env.NEXT_PUBLIC_YOUTUBE_URL),
    tiktok: httpUrl(process.env.NEXT_PUBLIC_TIKTOK_URL),
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
