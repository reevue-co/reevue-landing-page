"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import {
  PiAddressBookBold,
  PiChartDonutBold,
  PiCaretLeftBold,
  PiCaretRightBold,
  PiMapPinBold,
  PiTargetBold,
  PiWhatsappLogoBold,
  PiXBold,
} from "react-icons/pi";
import { logoutAnalytics } from "@/lib/analytics-login";
import { ThemeToggle } from "@/components/theme-toggle";
import { Wordmark } from "@/components/wordmark";
import type { Dictionary } from "@/lib/dictionary";
import { htmlLang, locales, type Locale } from "@/lib/i18n";

const languageNames = { "pt-br": "pt", es: "es", en: "en" } as const;

export type LeadRow = {
  id: string;
  date: string;
  name: string;
  profile: string;
  place: string;
  interest: string;
  email: string;
  openLabel: string;
  sections: LeadSection[];
};

export type LeadSection = {
  id: "contact" | "location" | "interest";
  title: string;
  items: LeadField[];
};

export type LeadField = {
  label: string;
  value: string;
  href?: string;
  wide?: boolean;
  note?: boolean;
};

export function AnalyticsFrame({
  locale,
  dict,
  leads,
  nameLabel,
  emailLabel,
  children,
}: {
  locale: Locale;
  dict: Dictionary;
  leads: LeadRow[] | null;
  nameLabel: string;
  emailLabel: string;
  children: ReactNode;
}) {
  const a = dict.analytics;
  const [view, setView] = useState<"analytics" | "leads">("analytics");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = leads?.find((lead) => lead.id === selectedId) ?? null;

  function show(next: "analytics" | "leads") {
    setView(next);
    if (next !== "leads") setSelectedId(null);
  }

  return (
    <div className="flex h-dvh flex-col overflow-hidden md:flex-row">
      <aside className="flex shrink-0 border-b border-line bg-paper md:w-44 md:flex-col md:border-r md:border-b-0">
        <div className="flex h-[4.25rem] items-center px-3">
          <Link href={`/${locale}`} className="rounded-full" aria-label={a.home}>
            <Wordmark />
          </Link>
        </div>
        <nav aria-label={a.menu} className="flex gap-1 px-2 pb-3 md:flex-col md:pb-0">
          <SectionButton
            icon={PiChartDonutBold}
            selected={view === "analytics"}
            onClick={() => show("analytics")}
          >
            {a.viewAnalytics}
          </SectionButton>
          <SectionButton icon={PiAddressBookBold} selected={view === "leads"} onClick={() => show("leads")}>
            {a.viewLeads}
          </SectionButton>
        </nav>
        <form action={logoutAnalytics.bind(null, locale)} className="px-2 pb-3 md:mt-auto md:pb-4">
          <button
            type="submit"
            className="flex min-h-11 w-full items-center rounded-xl px-3 text-sm font-medium text-muted hover:bg-background hover:text-ink"
          >
            {a.logout}
          </button>
        </form>
      </aside>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <header className="flex h-[4.25rem] shrink-0 items-center justify-end px-4 sm:px-6">
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

        <div className="min-h-0 flex-1 overflow-auto px-4 pb-5 sm:px-6">
          {view === "analytics" ? (
            children
          ) : (
            <LeadTable
              leads={leads}
              copy={a}
              nameLabel={nameLabel}
              emailLabel={emailLabel}
              selectedId={selectedId}
              onOpen={setSelectedId}
            />
          )}
        </div>
      </div>

      {selected ? <LeadDrawer lead={selected} closeLabel={dict.form.close} onClose={() => setSelectedId(null)} /> : null}
    </div>
  );
}

function SectionButton({
  icon: Icon,
  selected,
  onClick,
  children,
}: {
  icon: typeof PiChartDonutBold;
  selected: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      aria-current={selected ? "page" : undefined}
      onClick={onClick}
      className={`flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-medium ${
        selected ? "bg-blue-soft text-blue" : "text-ink hover:bg-background"
      }`}
    >
      <Icon aria-hidden="true" className="size-4 shrink-0" />
      {children}
    </button>
  );
}

const pageSize = 7;

function LeadTable({
  leads,
  copy,
  nameLabel,
  emailLabel,
  selectedId,
  onOpen,
}: {
  leads: LeadRow[] | null;
  copy: Dictionary["analytics"];
  nameLabel: string;
  emailLabel: string;
  selectedId: string | null;
  onOpen: (id: string) => void;
}) {
  const [page, setPage] = useState(0);
  const pageCount = Math.max(1, Math.ceil((leads?.length ?? 0) / pageSize));
  const currentPage = Math.min(page, pageCount - 1);
  const visible = leads?.slice(currentPage * pageSize, currentPage * pageSize + pageSize) ?? [];
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-3xl font-medium tracking-[-0.03em] text-ink">{copy.leadsTitle}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{copy.leadsDescription}</p>
      </div>
      {leads === null ? (
        <div className="h-64 animate-pulse rounded-[1.5rem] bg-paper ring-1 ring-line" aria-hidden="true" />
      ) : leads.length === 0 ? (
        <section className="rounded-[1.5rem] bg-paper px-6 py-8 ring-1 ring-line">
          <h2 className="text-xl font-medium tracking-tight text-ink">{copy.leadsEmptyTitle}</h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted">{copy.leadsEmptyText}</p>
        </section>
      ) : (
        <div className="overflow-hidden rounded-[1.5rem] bg-paper ring-1 ring-line">
          <table className="w-full table-fixed border-collapse text-left text-sm">
            <colgroup>
              <col className="w-[19%]" />
              <col className="w-[16%]" />
              <col className="w-[18%]" />
              <col className="w-[13%]" />
              <col className="w-[11%]" />
              <col className="w-[23%]" />
            </colgroup>
            <thead className="bg-paper text-xs font-medium text-muted">
              <tr className="border-b border-line">
                <th scope="col" className="px-2.5 py-3 font-medium whitespace-nowrap">{copy.date}</th>
                <th scope="col" className="px-2.5 py-3 font-medium whitespace-nowrap">{nameLabel}</th>
                <th scope="col" className="px-2.5 py-3 font-medium whitespace-nowrap">{copy.profiles}</th>
                <th scope="col" className="px-2.5 py-3 font-medium whitespace-nowrap">{copy.location}</th>
                <th scope="col" className="px-2.5 py-3 font-medium whitespace-nowrap">{copy.interests}</th>
                <th scope="col" className="px-2.5 py-3 font-medium whitespace-nowrap">{emailLabel}</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((lead) => {
                const selected = lead.id === selectedId;
                return (
                  <tr
                    key={lead.id}
                    onClick={() => onOpen(lead.id)}
                    className={`cursor-pointer ${selected ? "bg-blue-soft" : "hover:bg-background"}`}
                  >
                    <td className="truncate border-t border-line px-2.5 py-2.5 tabular-nums text-muted">{lead.date}</td>
                    <th scope="row" className="border-t border-line px-2.5 py-2.5 font-medium">
                      <button
                        type="button"
                        aria-label={lead.openLabel}
                        onClick={() => onOpen(lead.id)}
                        className="block w-full truncate text-left text-ink hover:text-blue"
                      >
                        {lead.name}
                      </button>
                    </th>
                    <td className="truncate border-t border-line px-2.5 py-2.5 text-ink">{lead.profile}</td>
                    <td className="truncate border-t border-line px-2.5 py-2.5 text-ink">{lead.place}</td>
                    <td className="truncate border-t border-line px-2.5 py-2.5 text-ink">{lead.interest}</td>
                    <td className="truncate border-t border-line px-2.5 py-2.5 text-muted">{lead.email}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {pageCount > 1 ? (
            <div className="flex items-center justify-between gap-3 border-t border-line px-3 py-2">
              <p className="text-xs tabular-nums text-muted">
                {copy.pageLabel.replace("{page}", String(currentPage + 1)).replace("{pages}", String(pageCount))}
              </p>
              <div className="flex gap-1">
                <button
                  type="button"
                  aria-label={copy.pagePrevious}
                  disabled={currentPage === 0}
                  onClick={() => setPage(currentPage - 1)}
                  className="flex size-9 items-center justify-center rounded-full text-ink hover:bg-background disabled:pointer-events-none disabled:opacity-40"
                >
                  <PiCaretLeftBold aria-hidden="true" className="size-4" />
                </button>
                <button
                  type="button"
                  aria-label={copy.pageNext}
                  disabled={currentPage === pageCount - 1}
                  onClick={() => setPage(currentPage + 1)}
                  className="flex size-9 items-center justify-center rounded-full text-ink hover:bg-background disabled:pointer-events-none disabled:opacity-40"
                >
                  <PiCaretRightBold aria-hidden="true" className="size-4" />
                </button>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

function LeadDrawer({ lead, closeLabel, onClose }: { lead: LeadRow; closeLabel: string; onClose: () => void }) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCloseRef.current();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lead.id]);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button type="button" aria-label={closeLabel} className="absolute inset-0 bg-[rgb(18_21_26/0.45)]" onClick={onClose} />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="lead-drawer relative flex h-full w-full max-w-md flex-col bg-paper shadow-[-24px_0_60px_-36px_rgba(18,21,26,0.55)] ring-1 ring-line"
      >
        <div className="flex items-start justify-between gap-3 px-5 pt-5">
          <p className="inline-flex min-h-7 items-center rounded-full bg-blue-soft px-2.5 text-xs font-medium text-blue">
            {lead.profile}
          </p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="-mr-2 -mt-1 flex size-11 shrink-0 items-center justify-center rounded-full text-ink hover:bg-background"
          >
            <PiXBold aria-hidden="true" className="size-5" />
          </button>
        </div>
        <div className="px-5 pt-3 pb-4">
          <h2 id={titleId} className="text-2xl font-medium tracking-[-0.03em] text-ink">
            {lead.name}
          </h2>
          <p className="mt-1 text-sm text-muted">{lead.date}</p>
        </div>
        <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-5 pb-6">
          {lead.sections.map((section) => {
            const Icon = sectionIcon[section.id];
            const columns = section.id === "location" && section.items.length > 2 ? "grid-cols-3" : "grid-cols-2";
            return (
              <section key={section.id} className="rounded-2xl bg-background px-4 py-4">
                <h3 className="flex items-center gap-2 text-xs font-medium text-muted">
                  <Icon aria-hidden="true" className="size-3.5 text-blue" />
                  {section.title}
                </h3>
                <dl className={`mt-3 grid gap-x-4 gap-y-4 ${columns}`}>
                  {section.items.map((item) =>
                    item.note ? (
                      <div key={item.label} className="col-span-full rounded-xl bg-paper px-3 py-3 ring-1 ring-line">
                        <dt className="text-xs leading-5 text-muted">{item.label}</dt>
                        <dd className="mt-1.5 text-sm leading-6 break-words whitespace-pre-wrap text-ink">{item.value}</dd>
                      </div>
                    ) : (
                      <div key={item.label} className={item.wide ? "col-span-full" : undefined}>
                        <dt className="text-[11px] font-medium text-muted">{item.label}</dt>
                        <dd className="mt-0.5 text-sm font-medium break-words text-ink">{fieldValue(item)}</dd>
                      </div>
                    ),
                  )}
                </dl>
              </section>
            );
          })}
        </div>
      </aside>
    </div>
  );
}

const sectionIcon = {
  contact: PiWhatsappLogoBold,
  location: PiMapPinBold,
  interest: PiTargetBold,
} as const;

function fieldValue(item: LeadField) {
  if (!item.href) return item.value;
  const external = item.href.startsWith("http");
  return (
    <a
      href={item.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="text-blue underline-offset-2 hover:underline"
    >
      {item.value}
    </a>
  );
}
