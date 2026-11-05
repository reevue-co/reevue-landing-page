import { CatalogDemo } from "@/components/catalog-demo";
import { EarlyAccessLink } from "@/components/early-access-link";
import { HeroPreview } from "@/components/hero-preview";
import { BrandIcon, CatalogIcon, CheckIcon, MessageIcon, PenIcon, ShareIcon } from "@/components/icons";
import { PortalPreview } from "@/components/portal-preview";
import { SetHtmlLang } from "@/components/set-html-lang";
import { shell } from "@/components/shell";
import { SiteHeader } from "@/components/site-header";
import { Wordmark } from "@/components/wordmark";
import type { Dictionary } from "@/lib/dictionary";
import { htmlLang, type Locale } from "@/lib/i18n";
import { getContactEmail, getFormUrl, getSocialLinks } from "@/lib/site";

const valueIcons = [BrandIcon, CatalogIcon, ShareIcon, MessageIcon, PenIcon];

const footerLinks = [
  ["problema", "problem"],
  ["produto", "product"],
  ["recursos", "features"],
  ["funcionamento", "how"],
  ["expansao", "expansion"],
  ["portal", "portal"],
  ["acesso", "early"],
  ["perguntas", "faq"],
] as const;

export function LandingPage({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const formUrl = getFormUrl(locale);
  const email = getContactEmail();
  const socials = getSocialLinks();
  const hasContact = Boolean(email || socials.instagram || socials.linkedin);

  return (
    <>
      <SetHtmlLang lang={htmlLang[locale]} />
      <a href="#conteudo" className="skip-link">
        {dict.a11y.skip}
      </a>
      <SiteHeader locale={locale} dict={dict} formUrl={formUrl} />
      <main id="conteudo">
        <Hero dict={dict} formUrl={formUrl} />
        <Problem dict={dict} />
        <Value dict={dict} />
        <Demo dict={dict} formUrl={formUrl} />
        <Features dict={dict} />
        <HowItWorks dict={dict} />
        <Expansion dict={dict} />
        <Portal dict={dict} />
        <EarlyAccess dict={dict} formUrl={formUrl} />
        <Faq dict={dict} />
      </main>
      <Footer dict={dict} formUrl={formUrl} email={email} socials={socials} hasContact={hasContact} />
    </>
  );
}

function Hero({ dict, formUrl }: { dict: Dictionary; formUrl: string | null }) {
  return (
    <section className="overflow-hidden pb-16 pt-8 sm:pb-24 sm:pt-12">
      <div className={`${shell} grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12`}>
        <div className="motion-safe:animate-[rise_700ms_ease-out]">
          <h1 className="max-w-xl text-[2rem] font-semibold leading-[1.12] tracking-tight text-ink sm:text-5xl">
            {dict.hero.title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted sm:text-lg">{dict.hero.description}</p>
          <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <EarlyAccessLink
              href={formUrl}
              label={dict.hero.primary}
              unavailable={dict.form.unavailable}
              newTab={dict.form.newTab}
            />
            <a
              href="#produto"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-line bg-paper px-5 text-sm font-semibold text-ink hover:bg-blue-soft sm:whitespace-nowrap"
            >
              {dict.hero.secondary}
            </a>
          </div>
          <p className="mt-4 max-w-md text-sm leading-6 text-muted">{dict.hero.support}</p>
        </div>
        <HeroPreview dict={dict} />
      </div>
    </section>
  );
}

function Problem({ dict }: { dict: Dictionary }) {
  return (
    <section id="problema" className="scroll-mt-20 border-t border-line bg-paper py-16 sm:py-24">
      <div className={shell}>
        <h2 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
          {dict.problem.title}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted sm:text-lg">{dict.problem.intro}</p>
        <ol className="mt-10 border-t border-line">
          {dict.problem.items.map((item, index) => (
            <li key={item.title} className="grid gap-3 border-b border-line py-6 sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:gap-8 sm:py-8">
              <p className="font-mono text-sm font-medium text-blue">0{index + 1}</p>
              <div>
                <h3 className="text-xl font-semibold tracking-tight text-ink">{item.title}</h3>
                <p className="mt-2 max-w-2xl leading-7 text-muted">{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-8 max-w-3xl border-l-4 border-blue pl-5 text-xl font-semibold leading-snug tracking-tight text-ink sm:text-2xl">
          {dict.problem.closing}
        </p>
      </div>
    </section>
  );
}

function Value({ dict }: { dict: Dictionary }) {
  return (
    <section id="proposta" className="scroll-mt-20 py-16 sm:py-24">
      <div className={shell}>
        <p className="text-sm font-semibold text-blue">{dict.value.status}</p>
        <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
          {dict.value.title}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted sm:text-lg">{dict.value.intro}</p>
        <ul className="mt-10 border-t border-line">
          {dict.value.points.map((point, index) => {
            const Icon = valueIcons[index] ?? CheckIcon;
            return (
              <li key={point.title} className="grid gap-4 border-b border-line py-6 md:grid-cols-[auto_minmax(0,16rem)_minmax(0,1fr)] md:items-start md:gap-8">
                <span className="flex size-11 items-center justify-center rounded-full bg-blue-soft text-blue">
                  <Icon className="size-5" />
                </span>
                <h3 className="text-lg font-semibold tracking-tight text-ink">{point.title}</h3>
                <p className="leading-7 text-muted">{point.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function Demo({ dict, formUrl }: { dict: Dictionary; formUrl: string | null }) {
  return (
    <section id="produto" className="scroll-mt-20 border-t border-line bg-paper py-16 sm:py-24">
      <div className={shell}>
        <h2 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
          {dict.demo.title}
        </h2>
        <p className="mt-4 max-w-2xl leading-7 text-muted">{dict.demo.text}</p>
        <p className="mt-3 max-w-2xl text-sm font-medium text-ink">{dict.demo.disclaimer}</p>
        <div className="mt-8">
          <CatalogDemo dict={dict} />
        </div>
        <p className="mt-4 text-sm text-muted">{dict.preview.photoCredit}</p>
        <div className="mt-8">
          <EarlyAccessLink
            href={formUrl}
            label={dict.demo.cta}
            unavailable={dict.form.unavailable}
            newTab={dict.form.newTab}
          />
        </div>
      </div>
    </section>
  );
}

function Features({ dict }: { dict: Dictionary }) {
  return (
    <section id="recursos" className="scroll-mt-20 py-16 sm:py-24">
      <div className={shell}>
        <h2 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
          {dict.features.title}
        </h2>
        <p className="mt-4 max-w-2xl leading-7 text-muted">{dict.features.intro}</p>
        <p className="mt-3 text-sm font-semibold text-blue">{dict.features.planned}</p>
        <ul className="mt-8 border-t border-ink/15">
          {dict.features.items.map((item) => (
            <li
              key={item.title}
              className="grid gap-2 border-b border-line py-5 sm:grid-cols-[minmax(0,16rem)_minmax(0,1fr)_auto] sm:items-baseline sm:gap-8"
            >
              <h3 className="font-semibold text-ink">{item.title}</h3>
              <p className="leading-7 text-muted">{item.detail}</p>
              <p className="text-sm font-semibold text-blue">{dict.features.badge}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function HowItWorks({ dict }: { dict: Dictionary }) {
  return (
    <section id="funcionamento" className="scroll-mt-20 border-t border-line bg-paper py-16 sm:py-24">
      <div className={shell}>
        <h2 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
          {dict.how.title}
        </h2>
        <p className="mt-4 max-w-2xl leading-7 text-muted">{dict.how.note}</p>
        <ol className="mt-10 grid gap-8 md:grid-cols-3">
          {dict.how.steps.map((step, index) => (
            <li key={step.title} className="border-t-2 border-blue pt-5">
              <p className="font-mono text-sm text-blue">0{index + 1}</p>
              <h3 className="mt-3 text-xl font-semibold tracking-tight text-ink">{step.title}</h3>
              <p className="mt-2 leading-7 text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Expansion({ dict }: { dict: Dictionary }) {
  return (
    <section id="expansao" className="scroll-mt-20 py-16 sm:py-24">
      <div className={`${shell}`}>
        <div className="rounded-3xl bg-blue-soft px-5 py-10 sm:px-10 sm:py-12">
          <p className="text-sm font-semibold text-blue">{dict.expansion.badge}</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
            {dict.expansion.title}
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-muted">{dict.expansion.intro}</p>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {dict.expansion.items.map((item) => (
              <li key={item.title} className="rounded-2xl bg-paper p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold text-ink">{item.title}</h3>
                  <span className="shrink-0 text-xs font-semibold text-blue">{dict.expansion.badge}</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-muted">{item.text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-2xl text-sm leading-6 text-ink">{dict.expansion.note}</p>
        </div>
      </div>
    </section>
  );
}

function Portal({ dict }: { dict: Dictionary }) {
  return (
    <section id="portal" className="scroll-mt-20 border-t border-line bg-paper py-16 sm:py-20">
      <div className={`${shell} grid items-center gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(16rem,0.8fr)]`}>
        <div>
          <p className="text-sm font-semibold text-blue">{dict.portal.kicker}</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-ink">
            {dict.portal.title}
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-muted">{dict.portal.text}</p>
          <ul className="mt-6 grid gap-3">
            {dict.portal.points.map((point) => (
              <li key={point} className="flex gap-3 text-sm leading-6 text-ink">
                <CheckIcon className="mt-0.5 size-5 shrink-0 text-blue" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
        <PortalPreview dict={dict} />
      </div>
    </section>
  );
}

function EarlyAccess({ dict, formUrl }: { dict: Dictionary; formUrl: string | null }) {
  return (
    <section id="acesso" className="scroll-mt-20 bg-blue py-16 text-white sm:py-24">
      <div className={shell}>
        <h2 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          {dict.early.title}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-white/85 sm:text-lg">{dict.early.description}</p>
        <div className="mt-7">
          <EarlyAccessLink
            href={formUrl}
            label={dict.early.cta}
            unavailable={dict.form.unavailable}
            newTab={dict.form.newTab}
            variant="inverse"
          />
        </div>
        <p className="mt-4 text-sm text-white/80">{dict.early.support}</p>
      </div>
    </section>
  );
}

function Faq({ dict }: { dict: Dictionary }) {
  return (
    <section id="perguntas" className="scroll-mt-20 py-16 sm:py-24">
      <div className={`${shell} max-w-3xl`}>
        <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{dict.faq.title}</h2>
        <div className="mt-8 border-t border-line">
          {dict.faq.items.map((item) => (
            <details key={item.question} className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-5 [&::-webkit-details-marker]:hidden">
                <h3 className="text-lg font-semibold tracking-tight text-ink">{item.question}</h3>
                <span className="faq-icon mt-1 text-xl leading-none text-blue" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="max-w-2xl pb-5 leading-7 text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer({
  dict,
  formUrl,
  email,
  socials,
  hasContact,
}: {
  dict: Dictionary;
  formUrl: string | null;
  email: string | null;
  socials: { instagram: string | null; linkedin: string | null };
  hasContact: boolean;
}) {
  const links = footerLinks.map(([id, key]) => ({
    href: `#${id}`,
    label: key === "how" || key === "expansion" || key === "early" ? dict.footer[key] : dict.nav[key],
  }));

  return (
    <footer className="border-t border-line bg-paper py-12">
      <div className={`${shell} grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]`}>
        <div>
          <Wordmark />
          <p className="mt-4 max-w-md leading-7 text-muted">{dict.footer.description}</p>
          <p className="mt-3 text-sm font-medium text-ink">{dict.footer.status}</p>
          <div className="mt-5">
            <EarlyAccessLink
              href={formUrl}
              label={dict.footer.early}
              unavailable={dict.form.unavailable}
              newTab={dict.form.newTab}
              variant="nav"
            />
          </div>
        </div>
        <div className="grid gap-8 sm:grid-cols-2">
          <nav aria-label={dict.footer.nav}>
            <p className="text-sm font-semibold text-ink">{dict.footer.nav}</p>
            <ul className="mt-3 grid gap-2">
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-muted hover:text-ink">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          {hasContact ? (
            <div>
              <p className="text-sm font-semibold text-ink">{dict.footer.contact}</p>
              <ul className="mt-3 grid gap-2 text-sm">
                {email ? (
                  <li>
                    <a href={`mailto:${email}`} className="text-muted hover:text-ink">
                      {email}
                    </a>
                  </li>
                ) : null}
                {socials.instagram ? (
                  <li>
                    <a href={socials.instagram} className="text-muted hover:text-ink" target="_blank" rel="noopener noreferrer">
                      Instagram
                      <span className="sr-only">. {dict.form.newTab}</span>
                    </a>
                  </li>
                ) : null}
                {socials.linkedin ? (
                  <li>
                    <a href={socials.linkedin} className="text-muted hover:text-ink" target="_blank" rel="noopener noreferrer">
                      LinkedIn
                      <span className="sr-only">. {dict.form.newTab}</span>
                    </a>
                  </li>
                ) : null}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
