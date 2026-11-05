import { DetailsDismiss } from "@/components/details-dismiss";
import { DismissLink } from "@/components/dismiss-link";
import { EarlyAccessLink } from "@/components/early-access-link";
import { ChevronIcon, CloseIcon, MenuIcon } from "@/components/icons";
import { LocaleLink } from "@/components/locale-link";
import { shell } from "@/components/shell";
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
    <header className="sticky top-0 z-40 border-b border-line/80 bg-background/90 backdrop-blur-md">
      <div className={`${shell} flex h-16 items-center gap-3`}>
        <a href={`/${locale}`} className="shrink-0 rounded-md">
          <Wordmark />
        </a>

        <nav aria-label={dict.nav.primary} className="ml-6 hidden xl:block">
          <ul className="flex items-center gap-1">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="rounded-full px-3 py-2 text-sm font-medium text-ink hover:bg-blue-soft"
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <LanguageMenu locale={locale} dict={dict} currentLanguage={currentLanguage} />
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
        className="flex min-h-11 cursor-pointer list-none items-center gap-1 rounded-full px-3 text-sm font-medium text-ink hover:bg-blue-soft [&::-webkit-details-marker]:hidden"
        aria-label={`${dict.language.choose}. ${dict.language.current}: ${currentLanguage}`}
      >
        <span aria-hidden="true">{currentLanguage}</span>
        <ChevronIcon className="chevron size-4" />
      </summary>
      <ul
        aria-label={dict.language.list}
        className="absolute right-0 z-50 mt-2 min-w-44 rounded-2xl border border-line bg-paper p-1.5 shadow-[0_16px_40px_-24px_rgba(16,32,51,0.45)]"
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
        className="flex size-11 cursor-pointer list-none items-center justify-center rounded-full text-ink hover:bg-blue-soft [&::-webkit-details-marker]:hidden"
        aria-label={dict.nav.menu}
      >
        <MenuIcon className="icon-open size-5" />
        <CloseIcon className="icon-close size-5" />
      </summary>
      <nav
        aria-label={dict.nav.mobile}
        className="absolute inset-x-0 top-full z-30 h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-background px-5 py-6"
      >
        <ul className="grid gap-1">
          {sections.map((section) => (
            <li key={section.id}>
              <DismissLink
                href={`#${section.id}`}
                detailsId="mobile-nav"
                className="flex min-h-12 items-center rounded-xl px-3 text-lg font-medium text-ink hover:bg-blue-soft"
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
