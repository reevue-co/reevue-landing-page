"use server";

import { countries, hasSiteOptions, interests, profiles, solutions, type ContactState } from "@/lib/contact";
import { hasLocale } from "@/lib/i18n";
import { appendLocalLead } from "@/lib/local-sheet";

const text = (data: FormData, key: string) => String(data.get(key) ?? "").trim();
const oneOf = (list: readonly string[], value: string) => list.includes(value);
const between = (value: string, min: number, max: number) => value.length >= min && value.length <= max;

// Accepts "tusitio.com" or a full URL; returns a normalized http(s) URL or null.
function normalizeUrl(value: string): string | null {
  try {
    const url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
    if (!/^https?:$/.test(url.protocol) || !url.hostname.includes(".")) return null;
    return url.toString();
  } catch {
    return null;
  }
}

export async function submitContact(_prev: ContactState, data: FormData): Promise<ContactState> {
  const fields = Object.fromEntries(
    [
      "name", "profile", "agencyName", "country", "dial", "state", "city", "phone", "email",
      "interest", "solution", "hasSite", "site", "difficulty", "locale", "consent",
    ].map((k) => [k, text(data, k)]),
  );
  const invalid: ContactState = { status: "invalid", fields };

  // Honeypot: bots fill the hidden field; pretend success and drop it.
  if (text(data, "hp")) return { status: "ok", fields: {} };

  const phone = fields.phone.replace(/\D/g, "");
  const isAgency = fields.profile === "agency";
  // With "yes" the address is required; otherwise any typed value is ignored.
  const site = fields.hasSite === "yes" ? normalizeUrl(fields.site) : "";

  const valid =
    between(fields.name, 2, 100) &&
    oneOf(profiles, fields.profile) &&
    (!isAgency || between(fields.agencyName, 2, 120)) &&
    countries.some(([iso]) => iso === fields.country) &&
    countries.some(([, dial]) => dial === fields.dial) &&
    between(fields.state, 2, 80) &&
    between(fields.city, 2, 80) &&
    between(phone, 6, 14) &&
    // Email is optional, but if present it must be valid.
    (!fields.email || (fields.email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))) &&
    oneOf(interests, fields.interest) &&
    oneOf(solutions, fields.solution) &&
    (!fields.hasSite || oneOf(hasSiteOptions, fields.hasSite)) &&
    site !== null && (site ?? "").length <= 300 &&
    fields.difficulty.length <= 500 &&
    fields.consent === "yes" &&
    hasLocale(fields.locale);
  if (!valid) return invalid;

  const lead = {
    name: fields.name,
    profile: fields.profile,
    agencyName: isAgency ? fields.agencyName : "",
    country: fields.country,
    state: fields.state,
    city: fields.city,
    phone: `+${fields.dial} ${phone}`,
    email: fields.email,
    interest: fields.interest,
    solution: fields.solution,
    hasSite: fields.hasSite,
    site: site ?? "",
    difficulty: fields.difficulty,
    consent: true,
    locale: fields.locale,
  };

  if (process.env.NODE_ENV !== "production") {
    try {
      await appendLocalLead([
        new Date().toISOString(),
        lead.name,
        lead.profile,
        lead.agencyName,
        lead.country,
        lead.state,
        lead.city,
        lead.phone,
        lead.email,
        lead.interest,
        lead.solution,
        lead.hasSite,
        lead.site,
        lead.difficulty,
        lead.locale,
      ]);
    } catch (error) {
      console.error("[contact] Local sheet write failed:", error);
      return { status: "error", fields };
    }
    return { status: "ok", fields: {} };
  }

  const url = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (!url) {
    console.error("[contact] GOOGLE_SHEET_WEBHOOK_URL is empty");
    return { status: "error", fields };
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" }, // Apps Script reads the raw body
      body: JSON.stringify({
        secret: process.env.GOOGLE_SHEET_WEBHOOK_SECRET ?? "",
        ...lead,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    const raw = await res.text();
    let body: { ok?: boolean } | null = null;
    try {
      body = JSON.parse(raw);
    } catch {}
    if (!res.ok || body?.ok !== true) {
      // Never log the secret; the response body is Google's, not ours.
      console.error(`[contact] Sheet webhook failed: HTTP ${res.status}, response: ${raw.slice(0, 200)}`);
      return { status: "error", fields };
    }
  } catch (error) {
    console.error("[contact] Sheet webhook request failed:", error);
    return { status: "error", fields };
  }
  return { status: "ok", fields: {} };
}
