"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginAnalytics, type LoginState } from "@/lib/analytics-login";
import { ThemeToggle } from "@/components/theme-toggle";
import { Wordmark } from "@/components/wordmark";
import type { Dictionary } from "@/lib/dictionary";
import { htmlLang, locales, type Locale } from "@/lib/i18n";

const initial: LoginState = { error: false };
const languageNames = { "pt-br": "pt", es: "es", en: "en" } as const;

export function AnalyticsLogin({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const a = dict.analytics;
  const [state, action, pending] = useActionState(loginAnalytics.bind(null, locale), initial);

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="flex h-[4.25rem] items-center justify-between px-4 sm:px-6">
        <Link href={`/${locale}`} className="rounded-full" aria-label={a.home}>
          <Wordmark />
        </Link>
        <nav aria-label={dict.language.list} className="flex items-center gap-1">
          {locales.map((code) => {
            const current = code === locale;
            return (
              <Link
                key={code}
                href={`/${code}/analytics`}
                lang={htmlLang[code]}
                hrefLang={htmlLang[code]}
                aria-label={dict.language[languageNames[code]]}
                aria-current={current ? "page" : undefined}
                className={`flex min-h-11 items-center rounded-full px-2.5 text-sm font-medium sm:px-3 ${
                  current ? "bg-blue-soft text-blue" : "text-ink hover:bg-paper"
                }`}
              >
                <span className="sm:hidden">{code === "pt-br" ? "PT" : code.toUpperCase()}</span>
                <span className="hidden sm:inline">{dict.language[languageNames[code]]}</span>
              </Link>
            );
          })}
          <ThemeToggle toDark={dict.theme.toDark} toLight={dict.theme.toLight} />
        </nav>
      </header>
      <main className="flex flex-1 items-center justify-center px-4 pb-16">
        <form action={action} className="w-full max-w-sm rounded-[1.5rem] bg-paper px-6 py-6 ring-1 ring-line">
          <h1 className="text-2xl font-medium tracking-[-0.03em] text-ink">{a.loginTitle}</h1>
          <p className="mt-2 text-sm leading-6 text-muted">{a.loginText}</p>
          <label className="mt-5 grid gap-1.5 text-sm font-medium text-ink">
            {a.loginPassword}
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="min-h-12 rounded-xl border border-line bg-background px-3 text-base font-normal text-ink"
            />
          </label>
          {state.error ? (
            <p role="alert" className="mt-3 text-sm text-blue">
              {a.loginInvalid}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={pending}
            className="mt-5 flex min-h-12 w-full items-center justify-center rounded-full bg-blue-solid px-4 text-sm font-medium text-white disabled:opacity-70"
          >
            {pending ? a.loginPending : a.loginSubmit}
          </button>
        </form>
      </main>
    </div>
  );
}
