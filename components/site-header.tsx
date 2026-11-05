import { DetailsDismiss } from "@/components/details-dismiss";
import { DismissLink } from "@/components/dismiss-link";
import { EarlyAccessLink } from "@/components/early-access-link";
import { PiCaretDownBold, PiListBold, PiXBold } from "react-icons/pi";
import { LocaleLink } from "@/components/locale-link";
import { shell } from "@/components/shell";
import { ThemeToggle } from "@/components/theme-toggle";
import { Wordmark } from "@/components/wordmark";
import type { Dictionary } from "@/lib/dictionary";
import { htmlLang, locales, type Locale } from "@/lib/i18n";

const sectionIds = [
  ["problem", "problema"],
  ["product", "produto"],
  ["features", "recursos"],
  ["portal", "portal"],
  ["faq", "perguntas"],
] as const;

const languageNames = {
  "pt-br": "pt",
  es: "es",
  en: "en",
} as const;

type SiteHeaderProps = {
  locale: Locale;
  dict: Dictionary;
  formUrl: string | null;
};

export function SiteHeader({ locale, dict, formUrl }: SiteHeaderProps) {
  const sections = sectionIds.map(([key, id]) => ({
    id,
    label: dict.nav[key],
  }));
  const currentLanguage = dict.language[languageNames[locale]];

  return (
    <header className="sticky top-0 z-40">
      <div className={`${shell} pt-3`}>
        <div className="flex h-14 items-center gap-2 rounded-full bg-paper/95 px-2 shadow-[0_16px_40px_-28px_rgba(18,28,48,0.55)] ring-1 ring-line sm:px-3">
          <a href={`/${locale}`} className="shrink-0 rounded-full">
            <Wordmark />
          </a>

          <nav aria-label={dict.nav.primary} className="ml-4 hidden xl:block">
            <ul className="flex items-center gap-0.5">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="rounded-full px-3 py-2 text-sm font-medium text-ink/80 hover:text-ink"
                  >
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-1">
            <LanguageMenu locale={locale} dict={dict} currentLanguage={currentLanguage} />
            <ThemeToggle toDark={dict.theme.toDark} toLight={dict.theme.toLight} />
            <div className="hidden xl:block">
              <EarlyAccessLink
                href={formUrl}
                label={dict.nav.cta}
                unavailable={dict.form.unavailable}
                newTab={dict.form.newTab}
                variant="nav"
              />
            </div>
            <MobileMenu dict={dict} formUrl={formUrl} sections={sections} />
          </div>
        </div>
      </div>
    </header>
  );
}

function LanguageMenu({
  locale,
  dict,
  currentLanguage,
}: {
  locale: Locale;
  dict: Dictionary;
  currentLanguage: string;
}) {
  return (
    <details id="language-menu" className="relative">
      <DetailsDismiss id="language-menu" />
      <summary
        className="flex min-h-11 cursor-pointer list-none items-center gap-1 rounded-full px-3 text-sm font-medium text-ink hover:bg-background [&::-webkit-details-marker]:hidden"
        aria-label={`${dict.language.choose}. ${dict.language.current}: ${currentLanguage}`}
      >
        <span aria-hidden="true">{currentLanguage}</span>
        <PiCaretDownBold className="chevron size-4" />
      </summary>
      <ul
        aria-label={dict.language.list}
        className="absolute right-0 z-50 mt-3 min-w-44 rounded-2xl bg-paper p-1.5 shadow-[0_18px_50px_-28px_rgba(18,28,48,0.45)] ring-1 ring-line"
      >
        {locales.map((code) => {
          const name = dict.language[languageNames[code]];
          const current = code === locale;
          return (
            <li key={code}>
              <LocaleLink
                locale={code}
                lang={htmlLang[code]}
                hrefLang={htmlLang[code]}
                current={current}
                className={`flex min-h-11 items-center rounded-xl px-3 text-sm font-medium ${
                  current ? "bg-blue-soft text-blue" : "text-ink hover:bg-background"
                }`}
              >
                {name}
              </LocaleLink>
            </li>
          );
        })}
      </ul>
    </details>
  );
}

function MobileMenu({
  dict,
  formUrl,
  sections,
}: {
  dict: Dictionary;
  formUrl: string | null;
  sections: { id: string; label: string }[];
}) {
  return (
    <details id="mobile-nav" className="xl:hidden">
      <DetailsDismiss id="mobile-nav" />
      <summary
        className="flex size-11 cursor-pointer list-none items-center justify-center rounded-full text-ink hover:bg-background [&::-webkit-details-marker]:hidden"
        aria-label={dict.nav.menu}
      >
        <PiListBold className="icon-open size-5" />
        <PiXBold className="icon-close size-5" />
      </summary>
      <nav
        aria-label={dict.nav.mobile}
        className="fixed inset-x-0 bottom-0 top-[4.25rem] z-30 overflow-y-auto bg-background px-6 py-8"
      >
        <ul className="grid gap-1">
          {sections.map((section) => (
            <li key={section.id}>
              <DismissLink
                href={`#${section.id}`}
                detailsId="mobile-nav"
                className="flex min-h-12 items-center rounded-xl px-1 text-2xl font-medium tracking-tight text-ink"
              >
                {section.label}
              </DismissLink>
            </li>
          ))}
        </ul>
        <EarlyAccessLink
          href={formUrl}
          label={dict.nav.cta}
          unavailable={dict.form.unavailable}
          newTab={dict.form.newTab}
          className="mt-6 w-full"
        />
      </nav>
    </details>
  );
}
