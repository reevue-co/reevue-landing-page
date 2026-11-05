import { GoogleAnalytics } from "@/components/google-analytics";
import { ThemeScript } from "@/components/theme-script";
import { fontClassName } from "@/lib/fonts";
import { hasLocale, htmlLang, locales } from "@/lib/i18n";
import { getGoogleAnalyticsId } from "@/lib/site";
import "../globals.css";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  const locale = hasLocale(lang) ? lang : "pt-br";

  return (
    <html lang={htmlLang[locale]} className={`${fontClassName} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full bg-background font-sans text-foreground">
        <ThemeScript />
        <GoogleAnalytics measurementId={getGoogleAnalyticsId()} />
        {children}
      </body>
    </html>
  );
}
