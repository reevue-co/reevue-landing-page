import type { Metadata } from "next";
import Link from "next/link";
import { es } from "@/lib/dictionaries/es";
import { ptBr } from "@/lib/dictionaries/pt-br";
import { fontClassName } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reevue",
  robots: { index: false, follow: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="pt-BR" className={`${fontClassName} h-full antialiased`}>
      <body className="min-h-full bg-background font-sans text-foreground">
        <main className="mx-auto flex min-h-full w-full max-w-xl flex-col justify-center px-5 py-16">
          <p className="text-sm font-semibold text-blue">Reevue</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink">{ptBr.notFound.title}</h1>
          <p className="mt-3 leading-7 text-muted">{ptBr.notFound.text}</p>
          <p className="mt-2 leading-7 text-muted" lang="es-419">
            {es.notFound.text}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/pt-br" className="inline-flex min-h-11 items-center rounded-full bg-blue px-4 text-sm font-semibold text-white">
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
          </div>
        </main>
      </body>
    </html>
  );
}
