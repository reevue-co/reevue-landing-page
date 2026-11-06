import type { Metadata } from "next";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { AnalyticsDashboard } from "@/components/analytics-dashboard";
import { AnalyticsLogin } from "@/components/analytics-login";
import { hasAnalyticsSession } from "@/lib/analytics-session";
import { getDictionary } from "@/lib/get-dictionary";
import { hasLocale, type Locale } from "@/lib/i18n";
import { getLeads, getLeadStats } from "@/lib/lead-stats";

export async function generateMetadata({ params }: PageProps<"/[lang]/analytics">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return {
    title: dict.analytics.title,
    description: dict.analytics.description,
    robots: { index: false, follow: false },
  };
}

export default async function AnalyticsPage({ params }: PageProps<"/[lang]/analytics">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = getDictionary(lang);

  return (
    <Suspense fallback={<AnalyticsLogin locale={lang} dict={dict} />}>
      <LiveAnalytics locale={lang} />
    </Suspense>
  );
}

async function LiveAnalytics({ locale }: { locale: Locale }) {
  await connection();
  const dict = getDictionary(locale);
  if (!(await hasAnalyticsSession())) return <AnalyticsLogin locale={locale} dict={dict} />;
  const [stats, leads] = await Promise.all([getLeadStats(), getLeads()]);
  return <AnalyticsDashboard locale={locale} dict={dict} stats={stats} leads={leads} />;
}
