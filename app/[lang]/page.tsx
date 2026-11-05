import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingPage } from "@/components/landing-page";
import { getDictionary } from "@/lib/get-dictionary";
import { hasLocale, htmlLang } from "@/lib/i18n";
import { absoluteLocaleUrl, getSiteUrl, openGraphLocale } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = getDictionary(lang);
  const siteUrl = getSiteUrl();
  const pageUrl = absoluteLocaleUrl(lang);

  return {
    title: { absolute: dict.meta.title },
    description: dict.meta.description,
    applicationName: "Reevue",
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      type: "website",
      siteName: "Reevue",
      locale: openGraphLocale(lang),
      ...(pageUrl ? { url: pageUrl } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
    alternates: siteUrl
      ? {
          canonical: pageUrl ?? undefined,
          languages: {
            "pt-BR": `${siteUrl}/pt-br`,
            "es-419": `${siteUrl}/es`,
            en: `${siteUrl}/en`,
            "x-default": `${siteUrl}/pt-br`,
          },
        }
      : undefined,
    ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  };
}

export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = getDictionary(lang);
  const siteUrl = getSiteUrl();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", name: "Reevue", description: dict.meta.description, ...(siteUrl ? { url: siteUrl } : {}) },
      { "@type": "WebSite", name: "Reevue", inLanguage: htmlLang[lang], ...(siteUrl ? { url: absoluteLocaleUrl(lang) } : {}) },
    ],
  };

  return (
    <>
      {/* "<" is escaped so page text can never close the script tag. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <LandingPage locale={lang} dict={dict} />
    </>
  );
}
