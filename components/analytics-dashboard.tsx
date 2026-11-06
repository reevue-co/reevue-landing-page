import { AnalyticsCharts, type ChartPanel } from "@/components/analytics-charts";
import { AnalyticsFrame, type LeadField, type LeadRow, type LeadSection } from "@/components/analytics-frame";
import type { Dictionary } from "@/lib/dictionary";
import { htmlLang, type Locale } from "@/lib/i18n";
import type { Lead, LeadStats, Share } from "@/lib/lead-stats";

const languageNames = { "pt-br": "pt", es: "es", en: "en" } as const;

export function AnalyticsDashboard({
  locale,
  dict,
  stats,
  leads,
}: {
  locale: Locale;
  dict: Dictionary;
  stats: LeadStats | null;
  leads: Lead[] | null;
}) {
  const a = dict.analytics;
  const number = new Intl.NumberFormat(htmlLang[locale]);
  const percent = new Intl.NumberFormat(htmlLang[locale], { style: "percent", maximumFractionDigits: 1 });
  const regions = new Intl.DisplayNames([htmlLang[locale]], { type: "region" });
  const profileLabel = labelMap({
    agency: dict.form.profileAgency,
    independent: dict.form.profileIndependent,
    agent: dict.form.profileAgent,
    owner: dict.form.profileOwner,
  });
  const interestLabel = labelMap({
    rent: dict.form.interestRent,
    sale: dict.form.interestSale,
    both: dict.form.interestBoth,
  });
  const solutionLabel = labelMap({
    portal: dict.form.solutionPortal,
    site: dict.form.solutionSite,
    both: dict.form.solutionBoth,
  });
  const countryLabel = (key: string) => regions.of(key) ?? key;
  const unit = (count: number) => (count === 1 ? a.registration : a.registrations);
  const rows = leads?.map((lead) =>
    toLeadRow(lead, dict, htmlLang[locale], profileLabel, interestLabel, solutionLabel, countryLabel),
  ) ?? null;

  return (
    <AnalyticsFrame locale={locale} dict={dict} leads={rows} nameLabel={dict.form.name} emailLabel={dict.form.email}>
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-sm font-medium text-blue">{a.kicker}</p>
          <h1 className="mt-1 max-w-3xl text-balance text-3xl font-medium leading-tight tracking-[-0.03em] text-ink">
            {a.title}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{a.description}</p>
        </div>

        {stats === null ? (
          <div className="grid gap-3 sm:grid-cols-4" aria-hidden="true">
            {Array.from({ length: 4 }, (_, index) => (
              <div key={index} className="h-20 animate-pulse rounded-2xl bg-paper ring-1 ring-line" />
            ))}
          </div>
        ) : stats.total === 0 ? (
          <section className="rounded-[1.5rem] bg-paper px-6 py-8 ring-1 ring-line">
            <h2 className="text-xl font-medium tracking-tight text-ink">{a.emptyTitle}</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-muted">{a.emptyText}</p>
          </section>
        ) : (
          <>
            <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <Kpi label={a.total} value={number.format(stats.total)} detail={unit(stats.total)} />
              <Kpi
                label={a.interests}
                value={interestLabel(leader(stats.interests).key)}
                detail={percent.format(leader(stats.interests).ratio)}
              />
              <Kpi
                label={a.profiles}
                value={profileLabel(leader(stats.profiles).key)}
                detail={percent.format(leader(stats.profiles).ratio)}
              />
              <Kpi
                label={a.countries}
                value={stats.countries[0] ? countryLabel(stats.countries[0].key) : "—"}
                detail={percent.format(stats.countries[0]?.ratio ?? 0)}
              />
            </section>
            <AnalyticsCharts
              panels={[
                panel("profiles", a.profiles, a.profilesHint, stats.profiles, profileLabel, percent, number, unit),
                panel("interests", a.interests, a.interestsHint, stats.interests, interestLabel, percent, number, unit),
                panel("solutions", a.solutions, a.solutionsHint, stats.solutions, solutionLabel, percent, number, unit),
                panel("countries", a.countries, a.countriesHint, stats.countries, countryLabel, percent, number, unit),
              ]}
            />
          </>
        )}
      </div>
    </AnalyticsFrame>
  );
}

function toLeadRow(
  lead: Lead,
  dict: Dictionary,
  locale: string,
  profileLabel: (key: string) => string,
  interestLabel: (key: string) => string,
  solutionLabel: (key: string) => string,
  countryLabel: (key: string) => string,
): LeadRow {
  const a = dict.analytics;
  const f = dict.form;
  const shown = (value: string) => value || "—";
  const profile = shown(lead.profile ? profileLabel(lead.profile) : "");
  const country = lead.country ? countryLabel(lead.country) : "";
  const place = lead.city || lead.state || country || "—";
  const interest = shown(lead.interest ? interestLabel(lead.interest) : "");
  const date = formatDate(lead.date, locale);
  const hasSite = lead.hasSite === "yes" ? f.yes : lead.hasSite === "no" ? f.no : shown(lead.hasSite);
  const language = languageNames[lead.locale as Locale] ? dict.language[languageNames[lead.locale as Locale]] : shown(lead.locale);

  return {
    id: lead.id,
    date,
    name: shown(lead.name),
    profile,
    place,
    interest,
    email: shown(lead.email),
    openLabel: a.openLead.replace("{name}", shown(lead.name)),
    sections: leadSections(lead, dict, country, interest, solutionLabel, hasSite, language),
  };
}

function leadSections(
  lead: Lead,
  dict: Dictionary,
  country: string,
  interest: string,
  solutionLabel: (key: string) => string,
  hasSite: string,
  language: string,
): LeadSection[] {
  const f = dict.form;
  const phone = lead.phone.replace(/\s/g, "");
  const sections: LeadSection[] = [
    {
      id: "contact",
      title: dict.footer.contact,
      items: compact([
        detail(f.phone, lead.phone, { href: phone.startsWith("+") ? `tel:${phone}` : undefined }),
        detail(f.email, lead.email, { href: lead.email.includes("@") ? `mailto:${lead.email}` : undefined }),
        detail(f.agencyName, lead.agency, { wide: true }),
      ]),
    },
    {
      id: "location",
      title: f.stepLocation,
      items: compact([detail(f.city, lead.city), detail(f.state, lead.state), detail(f.country, country)]),
    },
    {
      id: "interest",
      title: f.stepInterest,
      items: compact([
        detail(f.interest, interest === "—" ? "" : interest),
        detail(f.solution, lead.solution ? solutionLabel(lead.solution) : ""),
        detail(f.hasSite, hasSite === "—" ? "" : hasSite),
        detail(dict.analytics.locale, language === "—" ? "" : language),
        detail(f.site, lead.site, { wide: true, href: /^https?:\/\//i.test(lead.site) ? lead.site : undefined }),
        detail(f.difficulty, lead.difficulty, { wide: true, note: true }),
      ]),
    },
  ];
  return sections.filter((section) => section.items.length > 0);
}

function detail(label: string, value: string, extra?: Partial<LeadField>): LeadField | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  return { label, value: trimmed, ...extra };
}

function compact(items: Array<LeadField | null>): LeadField[] {
  return items.filter((item): item is LeadField => item !== null);
}

function formatDate(value: string, locale: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value || "—";
  return new Intl.DateTimeFormat(locale, { dateStyle: "short", timeStyle: "short" }).format(date);
}

function Kpi({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <article className="rounded-2xl bg-paper px-4 py-3 ring-1 ring-line">
      <p className="text-xs font-medium text-muted">{label}</p>
      <p className="mt-1 truncate text-xl font-medium tracking-[-0.03em] text-ink">{value}</p>
      <p className="text-xs tabular-nums text-blue">{detail}</p>
    </article>
  );
}

function panel(
  id: string,
  title: string,
  hint: string,
  items: Share[],
  label: (key: string) => string,
  percent: Intl.NumberFormat,
  number: Intl.NumberFormat,
  unit: (count: number) => string,
): ChartPanel {
  return {
    id,
    title,
    hint,
    items: items.map((item) => ({
      ...item,
      name: label(item.key),
      percent: percent.format(item.ratio),
      countLabel: `${number.format(item.count)} ${unit(item.count)}`,
    })),
  };
}

function leader(items: Share[]) {
  return items.find((item) => item.count > 0) ?? { key: "—", count: 0, ratio: 0 };
}

function labelMap(map: Record<string, string>) {
  return (key: string) => map[key] ?? key;
}
