import type { Metadata } from "next";
import Link from "next/link";
import { GoogleAnalytics } from "@/components/google-analytics";
import { ThemeScript } from "@/components/theme-script";
import { en } from "@/lib/dictionaries/en";
import { es } from "@/lib/dictionaries/es";
import { ptBr } from "@/lib/dictionaries/pt-br";
import { fontClassName } from "@/lib/fonts";
import { getGoogleAnalyticsId } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reevue",
  robots: { index: false, follow: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="pt-BR" className={`${fontClassName} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full bg-background font-sans text-foreground">
        <ThemeScript />
        <GoogleAnalytics measurementId={getGoogleAnalyticsId()} />
        <main className="mx-auto flex min-h-full w-full max-w-xl flex-col justify-center px-5 py-16">
          <p className="text-sm font-semibold text-blue">Reevue</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink">{ptBr.notFound.title}</h1>
          <p className="mt-3 leading-7 text-muted">{ptBr.notFound.text}</p>
          <p className="mt-2 leading-7 text-muted" lang="es-419">
            {es.notFound.text}
          </p>
          <p className="mt-2 leading-7 text-muted" lang="en">
            {en.notFound.text}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/pt-br" className="inline-flex min-h-11 items-center rounded-full bg-blue-solid px-4 text-sm font-semibold text-white">
              Português
            </Link>
            <Link
              href="/es"
              lang="es-419"
              hrefLang="es-419"
              className="inline-flex min-h-11 items-center rounded-full border border-line bg-paper px-4 text-sm font-semibold text-ink"
            >
              Español
            </Link>
            <Link
              href="/en"
              lang="en"
              hrefLang="en"
              className="inline-flex min-h-11 items-center rounded-full border border-line bg-paper px-4 text-sm font-semibold text-ink"
            >
              English
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
