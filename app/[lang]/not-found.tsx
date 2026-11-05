import Link from "next/link";
import { es } from "@/lib/dictionaries/es";
import { ptBr } from "@/lib/dictionaries/pt-br";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-xl flex-col justify-center px-5 py-16">
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
  );
}
