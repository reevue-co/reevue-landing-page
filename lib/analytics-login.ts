"use server";

import { redirect } from "next/navigation";
import { clearAnalyticsSession, openAnalyticsSession, passwordsMatch } from "@/lib/analytics-session";
import { hasLocale } from "@/lib/i18n";

export type LoginState = { error: boolean };

export async function loginAnalytics(locale: string, _state: LoginState, formData: FormData): Promise<LoginState> {
  const password = formData.get("password");
  if (!hasLocale(locale) || typeof password !== "string" || !passwordsMatch(password)) {
    return { error: true };
  }
  await openAnalyticsSession();
  redirect(`/${locale}/analytics`);
}

export async function logoutAnalytics(locale: string) {
  if (!hasLocale(locale)) return;
  await clearAnalyticsSession();
  redirect(`/${locale}/analytics`);
}
