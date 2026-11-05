import type { ReactNode } from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaYoutube } from "react-icons/fa6";
import {
  PiChatCircleDuotone,
  PiCheckBold,
  PiDevicesDuotone,
  PiEnvelopeSimpleBold,
  PiGlobeDuotone,
  PiImagesDuotone,
  PiListBulletsDuotone,
  PiMagnifyingGlassDuotone,
  PiPaletteDuotone,
  PiPencilLineDuotone,
  PiShareNetworkDuotone,
  PiWhatsappLogoDuotone,
} from "react-icons/pi";
import { CatalogDemo } from "@/components/catalog-demo";
import { ContactModal } from "@/components/contact-modal";
import { EarlyAccessLink } from "@/components/early-access-link";
import { HeroPreview } from "@/components/hero-preview";
import { PortalPreview } from "@/components/portal-preview";
import { SetHtmlLang } from "@/components/set-html-lang";
import { shell } from "@/components/shell";
import { SiteHeader } from "@/components/site-header";
import { Wordmark } from "@/components/wordmark";
import type { Dictionary } from "@/lib/dictionary";
import { htmlLang, type Locale } from "@/lib/i18n";
import { getContactEmail, getSocialLinks, type SocialLinks } from "@/lib/site";

const valueIcons = [PiPaletteDuotone, PiListBulletsDuotone, PiShareNetworkDuotone, PiWhatsappLogoDuotone, PiPencilLineDuotone];
const featureIcons = [
  PiDevicesDuotone,
  PiGlobeDuotone,
  PiPaletteDuotone,
  PiListBulletsDuotone,
  PiImagesDuotone,
  PiMagnifyingGlassDuotone,
  PiWhatsappLogoDuotone,
  PiPencilLineDuotone,
];

const footerLinks = [
  ["problema", "problem"],
  ["produto", "product"],
  ["recursos", "features"],
  ["funcionamento", "how"],
  ["integracoes", "integrations"],
  ["expansao", "expansion"],
  ["portal", "portal"],
  ["acesso", "early"],
  ["perguntas", "faq"],
] as const;

export function LandingPage({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const email = getContactEmail();
  const socials = getSocialLinks();

  return (
    <ContactModal locale={locale} dict={dict}>
      <SetHtmlLang lang={htmlLang[locale]} />
      <a href="#conteudo" className="skip-link">
        {dict.a11y.skip}
      </a>
      <SiteHeader locale={locale} dict={dict} />
      <main id="conteudo">
        <Hero dict={dict} />
        <Problem dict={dict} />
        <Value dict={dict} />
        <Demo dict={dict} />
        <Features dict={dict} />
        <HowItWorks dict={dict} />
        <Expansion dict={dict} />
        <Integrations dict={dict} />
        <Portal dict={dict} />
        <EarlyAccess dict={dict} />
        <Faq dict={dict} />
      </main>
      <Footer dict={dict} email={email} socials={socials} />
    </ContactModal>
  );
}

function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section className="overflow-hidden pb-6 pt-6 lg:flex lg:h-[calc(100dvh-4.25rem)] lg:items-center lg:py-4">
      <div className={`${shell} grid items-center gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-10`}>
        <div className="motion-safe:animate-[rise_800ms_cubic-bezier(0.32,0.72,0,1)]">
          <h1 className="max-w-xl text-balance text-[2.35rem] font-medium leading-[1.05] tracking-[-0.045em] text-ink sm:text-5xl lg:text-[2.7rem]">
            {dict.hero.title}
          </h1>
          <p className="mt-4 max-w-md text-pretty text-base leading-6 text-muted">{dict.hero.description}</p>
          <div className="mt-5 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <EarlyAccessLink
              label={dict.hero.primary}
            />
            <a
              href="#produto"
              className="inline-flex min-h-12 items-center justify-center rounded-full px-5 text-sm font-medium text-ink hover:bg-paper sm:whitespace-nowrap"
            >
              {dict.hero.secondary}
            </a>
          </div>
          <p className="mt-3 max-w-md text-sm leading-6 text-muted">{dict.hero.support}</p>
        </div>
        <HeroPreview dict={dict} />
      </div>
    </section>
  );
}

function Problem({ dict }: { dict: Dictionary }) {
  return (
    <section id="problema" className="scroll-mt-[4.25rem] py-16 sm:py-24">
      <div className={shell}>
        <div className="reveal">
        <h2 className="max-w-3xl text-balance text-3xl font-medium leading-[1.08] tracking-[-0.04em] text-ink sm:text-5xl">
          {dict.problem.title}
        </h2>
        <p className="mt-5 max-w-xl text-pretty text-base leading-7 text-muted sm:text-lg">{dict.problem.intro}</p>
        </div>
        <ol className="mt-10 grid gap-4 md:grid-cols-3">
          {dict.problem.items.map((item, index) => (
            <li key={item.title} className="reveal">
              <div className="surface h-full p-6">
              <p className="text-sm font-medium tracking-wide text-blue">0{index + 1}</p>
              <h3 className="mt-3 text-xl font-medium tracking-tight text-ink">{item.title}</h3>
              <p className="mt-2 text-pretty leading-7 text-muted">{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-16 max-w-2xl text-balance text-2xl font-medium leading-snug tracking-[-0.03em] text-ink sm:text-3xl">
          {dict.problem.closing}
        </p>
      </div>
    </section>
  );
}

function Value({ dict }: { dict: Dictionary }) {
  return (
    <section id="proposta" className="scroll-mt-[4.25rem] py-8 sm:py-12">
      <div className={shell}>
        <div className="reveal grid gap-10 rounded-[2rem] bg-paper px-6 py-8 shadow-[0_30px_80px_-48px_rgba(18,28,48,0.45)] ring-1 ring-line sm:px-10 sm:py-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <div>
            <p className="text-sm font-medium text-blue">{dict.value.status}</p>
            <h2 className="mt-3 max-w-md text-balance text-3xl font-medium leading-[1.08] tracking-[-0.04em] text-ink sm:text-4xl">
              {dict.value.title}
            </h2>
            <p className="mt-4 max-w-md text-pretty leading-7 text-muted">{dict.value.intro}</p>
          </div>
          <ul className="grid gap-8">
            {dict.value.points.map((point, index) => {
              const Icon = valueIcons[index] ?? PiChatCircleDuotone;
              return (
                <li key={point.title} className="grid grid-cols-[auto_minmax(0,1fr)] gap-4">
                  <span className="flex size-10 items-center justify-center rounded-2xl bg-blue-soft text-blue">
                    <Icon className="size-6" />
                  </span>
                  <div>
                    <h3 className="font-medium tracking-tight text-ink">{point.title}</h3>
                    <p className="mt-1 leading-7 text-muted">{point.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Demo({ dict }: { dict: Dictionary }) {
  return (
    <section id="produto" className="scroll-mt-[4.25rem] py-16 sm:py-24">
      <div className={`${shell} reveal`}>
        <h2 className="max-w-3xl text-balance text-3xl font-medium leading-[1.08] tracking-[-0.04em] text-ink sm:text-5xl">
          {dict.demo.title}
        </h2>
        <p className="mt-5 max-w-2xl text-pretty leading-7 text-muted">{dict.demo.text}</p>
        <p className="mt-3 max-w-2xl text-sm font-medium text-ink">{dict.demo.disclaimer}</p>
        <div className="mt-8">
          <CatalogDemo dict={dict} />
        </div>
        <p className="mt-4 text-sm text-muted">{dict.preview.photoCredit}</p>
        <div className="mt-8">
          <EarlyAccessLink
            label={dict.demo.cta}
          />
        </div>
      </div>
    </section>
  );
}

function Features({ dict }: { dict: Dictionary }) {
  return (
    <section id="recursos" className="scroll-mt-[4.25rem] py-8 sm:py-12">
      <div className={shell}>
        <div className="reveal flex flex-wrap items-end justify-between gap-4">
          <h2 className="max-w-xl text-balance text-3xl font-medium leading-[1.08] tracking-[-0.04em] text-ink sm:text-5xl">
            {dict.features.title}
          </h2>
          <p className="text-sm font-medium text-blue">{dict.features.planned}</p>
        </div>
        <p className="mt-5 max-w-2xl text-pretty leading-7 text-muted">{dict.features.intro}</p>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {dict.features.items.map((item, index) => {
            const Icon = featureIcons[index] ?? PiChatCircleDuotone;
            return (
              <li key={item.title} className="reveal">
              <div className="surface grid h-full grid-cols-[auto_minmax(0,1fr)] gap-4 p-5">
                <span className="flex size-10 items-center justify-center rounded-2xl bg-blue-soft text-blue">
                  <Icon className="size-6" />
                </span>
                <div>
                  <h3 className="font-medium tracking-tight text-ink">{item.title}</h3>
                  <p className="mt-1 leading-7 text-muted">{item.detail}</p>
                </div>
              </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function HowItWorks({ dict }: { dict: Dictionary }) {
  return (
    <section id="funcionamento" className="scroll-mt-[4.25rem] py-16 sm:py-24">
      <div className={shell}>
        <div className="reveal">
        <h2 className="mx-auto max-w-3xl text-balance text-center text-3xl font-medium leading-[1.08] tracking-[-0.04em] text-ink sm:text-5xl">
          {dict.how.title}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-pretty text-center leading-7 text-muted">{dict.how.note}</p>
        </div>
        <ol className="mt-12 grid gap-4 md:grid-cols-3">
          {dict.how.steps.map((step, index) => (
            <li key={step.title} className="reveal">
              <div className="surface h-full p-6">
              <p className="text-4xl font-medium tracking-[-0.05em] text-blue/30">0{index + 1}</p>
              <h3 className="mt-4 text-xl font-medium tracking-tight text-ink">{step.title}</h3>
              <p className="mt-2 text-pretty leading-7 text-muted">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Expansion({ dict }: { dict: Dictionary }) {
  return (
    <section id="expansao" className="scroll-mt-[4.25rem] py-8 sm:py-12">
      <div className={shell}>
        <div className="reveal grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div>
            <p className="text-sm font-medium text-blue">{dict.expansion.badge}</p>
            <h2 className="mt-3 text-balance text-3xl font-medium leading-[1.08] tracking-[-0.04em] text-ink sm:text-4xl">
              {dict.expansion.title}
            </h2>
            <p className="mt-4 text-pretty leading-7 text-muted">{dict.expansion.intro}</p>
            <p className="mt-6 text-sm leading-6 text-ink">{dict.expansion.note}</p>
          </div>
          <ul className="divide-y divide-line">
            {dict.expansion.items.map((item) => (
              <li key={item.title} className="grid gap-1 rounded-2xl px-4 py-5 transition-colors duration-300 hover:bg-paper sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-6">
                <div>
                  <h3 className="font-medium tracking-tight text-ink">{item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted">{item.text}</p>
                </div>
                <p className="text-sm font-medium text-blue">{dict.expansion.badge}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Integrations({ dict }: { dict: Dictionary }) {
  return (
    <section id="integracoes" className="scroll-mt-[4.25rem] py-16 sm:py-24">
      <div className={`${shell} reveal grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]`}>
        <div>
          <p className="text-sm font-medium text-blue">{dict.integrations.badge}</p>
          <h2 className="mt-3 max-w-xl text-balance text-3xl font-medium leading-[1.08] tracking-[-0.04em] text-ink sm:text-4xl">
            {dict.integrations.title}
          </h2>
          <p className="mt-4 max-w-xl text-pretty leading-7 text-muted">{dict.integrations.text}</p>
          <ul className="mt-6 grid gap-3">
            {dict.integrations.points.map((point) => (
              <li key={point} className="flex gap-3 text-sm leading-6 text-ink">
                <PiCheckBold className="mt-0.5 size-5 shrink-0 text-blue" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-xl text-sm leading-6 text-ink">{dict.integrations.note}</p>
        </div>
        <div className="rounded-[1.8rem] bg-paper p-6 shadow-[0_30px_80px_-48px_rgba(18,36,72,0.4)] ring-1 ring-line sm:p-8">
          <p className="text-sm font-medium text-muted">{dict.integrations.diagramLabel}</p>
          <p className="mx-auto mt-6 w-fit rounded-full bg-blue-soft px-4 py-2 text-sm font-semibold text-blue">
            {dict.integrations.source}
          </p>
          <span aria-hidden="true" className="mx-auto mt-3 block h-8 w-px bg-line" />
          <ul className="grid grid-cols-2 gap-3">
            {dict.integrations.destinations.map((name) => (
              <li key={name} className="rounded-2xl bg-background px-4 py-4 text-sm font-medium leading-5 text-ink ring-1 ring-line">
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Portal({ dict }: { dict: Dictionary }) {
  return (
    <section id="portal" className="scroll-mt-[4.25rem] py-16 sm:py-24">
      <div className={`${shell} reveal grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(16rem,0.85fr)]`}>
        <div>
          <p className="text-sm font-medium text-blue">{dict.portal.kicker}</p>
          <h2 className="mt-3 max-w-xl text-balance text-3xl font-medium leading-[1.08] tracking-[-0.04em] text-ink sm:text-4xl">
            {dict.portal.title}
          </h2>
          <p className="mt-4 max-w-xl text-pretty leading-7 text-muted">{dict.portal.text}</p>
          <ul className="mt-6 grid gap-3">
            {dict.portal.points.map((point) => (
              <li key={point} className="flex gap-3 text-sm leading-6 text-ink">
                <PiCheckBold className="mt-0.5 size-5 shrink-0 text-blue" />
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

function EarlyAccess({ dict }: { dict: Dictionary }) {
  return (
    <section id="acesso" className="scroll-mt-[4.25rem] py-8 sm:py-12">
      <div className={shell}>
        <div className="reveal flex flex-col items-start gap-6 overflow-hidden rounded-[2rem] bg-[radial-gradient(32rem_16rem_at_100%_0%,rgb(255_255_255/0.2),transparent_58%),linear-gradient(135deg,#2f66f3,#1d45c8)] px-6 py-12 text-white sm:px-12 sm:py-14 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <h2 className="text-balance text-3xl font-medium leading-[1.08] tracking-[-0.04em] sm:text-4xl">
              {dict.early.title}
            </h2>
            <p className="mt-4 text-pretty text-base leading-7 text-white/75">{dict.early.description}</p>
          </div>
          <EarlyAccessLink label={dict.nav.cta} variant="inverse" className="shrink-0" />
        </div>
      </div>
    </section>
  );
}

function Faq({ dict }: { dict: Dictionary }) {
  return (
    <section id="perguntas" className="scroll-mt-[4.25rem] py-16 sm:py-24">
      <div className={`${shell} reveal grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-16`}>
        <h2 className="text-balance text-3xl font-medium tracking-[-0.04em] text-ink sm:text-5xl">{dict.faq.title}</h2>
        <div>
          {dict.faq.items.map((item) => (
            <details key={item.question} className="group border-b border-line transition-colors duration-300 open:bg-paper/70">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                <h3 className="text-lg font-medium tracking-tight text-ink">{item.question}</h3>
                <span className="faq-icon mt-1 text-xl leading-none text-blue" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="max-w-xl pb-5 leading-7 text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

const socialIcons: {
  key: keyof SocialLinks;
  label: string;
  Icon: typeof FaFacebook;
}[] = [
  { key: "facebook", label: "Facebook", Icon: FaFacebook },
  { key: "instagram", label: "Instagram", Icon: FaInstagram },
  { key: "linkedin", label: "LinkedIn", Icon: FaLinkedin },
  { key: "youtube", label: "YouTube", Icon: FaYoutube },
  { key: "tiktok", label: "TikTok", Icon: FaTiktok },
];

function Footer({
  dict,
  email,
  socials,
}: {
  dict: Dictionary;
  email: string | null;
  socials: SocialLinks;
}) {
  const links = footerLinks.map(([id, key]) => ({
    href: `#${id}`,
    label: key === "how" || key === "expansion" || key === "early" ? dict.footer[key] : dict.nav[key],
  }));

  return (
    <footer className="py-10">
      <div className={`${shell} grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]`}>
        <div>
          <Wordmark />
          <p className="mt-4 max-w-md leading-7 text-muted">{dict.footer.description}</p>
          <p className="mt-3 text-sm font-medium text-ink">{dict.footer.status}</p>
          <nav aria-label={dict.footer.social} className="mt-5">
            <ul className="flex flex-wrap items-center gap-2">
              {socialIcons.map(({ key, label, Icon }) => (
                <li key={key}>
                  <SocialIcon href={socials[key]} label={label} newTab={dict.form.newTab}>
                    <Icon className="size-5" />
                  </SocialIcon>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-5">
            <EarlyAccessLink
              label={dict.footer.early}
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
                  <a href={link.href} className="text-sm text-muted transition-colors duration-300 hover:text-ink">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          {email ? (
            <div>
              <p className="text-sm font-semibold text-ink">{dict.footer.contact}</p>
              <a href={`mailto:${email}`} className="mt-3 inline-flex items-center gap-2 text-sm text-muted hover:text-ink">
                <PiEnvelopeSimpleBold className="size-4" />
                {email}
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({
  href,
  label,
  newTab,
  children,
}: {
  href: string | null;
  label: string;
  newTab: string;
  children: ReactNode;
}) {
  const className =
    "flex size-11 items-center justify-center rounded-full text-ink ring-1 ring-line transition-[transform,background-color] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 hover:bg-paper";

  if (!href) {
    return (
      <span className={className} role="img" aria-label={label}>
        {children}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label}. ${newTab}`}
      className={className}
    >
      {children}
    </a>
  );
}
