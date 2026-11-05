"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { PiCaretDownBold } from "react-icons/pi";
import { countries, hasSiteOptions, interests, profiles, solutions, type ContactState } from "@/lib/contact";
import { submitContact } from "@/lib/contact-action";
import type { Dictionary } from "@/lib/dictionary";
import { htmlLang, type Locale } from "@/lib/i18n";

const input =
  "min-h-12 w-full rounded-xl border border-line bg-paper px-3 text-base text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue";
const label = "grid gap-1.5 text-sm font-medium";
const initial: ContactState = { status: "idle", fields: {} };
const defaultCountry = { "pt-br": "BR", es: "MX", en: "US" } as const;
const dialOf = (iso: string) => countries.find(([c]) => c === iso)?.[1] ?? "55";

export function ContactForm({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [state, action, pending] = useActionState(submitContact, initial);
  const v = state.fields;
  const [country, setCountry] = useState(v.country || defaultCountry[locale]);
  const [dial, setDial] = useState(v.dial || dialOf(country));
  const [profile, setProfile] = useState(v.profile ?? "");
  const [hasSite, setHasSite] = useState(v.hasSite ?? "");

  const message = useRef<HTMLParagraphElement>(null);
  // On success the form shrinks, so show the whole section (title + message); errors scroll to the alert.
  useEffect(() => {
    if (state.status === "ok") document.getElementById("acesso")?.scrollIntoView({ block: "start" });
    else if (state.status !== "idle") message.current?.scrollIntoView({ block: "start" });
  }, [state]);

  const f = dict.form;
  const regions = new Intl.DisplayNames([htmlLang[locale]], { type: "region" });
  const options = {
    profile: { agency: f.profileAgency, independent: f.profileIndependent, agent: f.profileAgent, owner: f.profileOwner },
    interest: { rent: f.interestRent, sale: f.interestSale },
    solution: { portal: f.solutionPortal, site: f.solutionSite, both: f.solutionBoth },
    hasSite: { yes: f.yes, no: f.no },
  };

  if (state.status === "ok") {
    return (
      <p ref={message} role="status" className="scroll-mt-28 rounded-2xl bg-paper p-6 text-base font-medium text-ink">
        {f.success}
      </p>
    );
  }

  const select = (name: string, value: string, onChange: (value: string) => void, children: React.ReactNode) => (
    <span className="relative block">
      <select name={name} value={value} onChange={(e) => onChange(e.target.value)} className={`${input} appearance-none pr-11`}>
        {children}
      </select>
      <PiCaretDownBold className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
    </span>
  );

  const radios = (
    name: "profile" | "interest" | "solution" | "hasSite",
    legend: string,
    values: readonly string[],
    opts: { required: boolean; value?: string; onChange?: (value: string) => void },
  ) => (
    <fieldset className="grid gap-2">
      <legend className="mb-1 text-sm font-medium">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {values.map((value) => (
          <label
            key={value}
            className="flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-line px-4 text-sm has-[:checked]:border-blue has-[:checked]:bg-blue-soft has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-blue"
          >
            <input
              type="radio"
              name={name}
              value={value}
              required={opts.required}
              {...(opts.onChange
                ? { checked: opts.value === value, onChange: () => opts.onChange?.(value) }
                : { defaultChecked: v[name] === value })}
              className="accent-blue"
            />
            {(options[name] as Record<string, string>)[value]}
          </label>
        ))}
      </div>
    </fieldset>
  );

  return (
    <form action={action} className="grid gap-5 rounded-2xl bg-paper p-5 text-ink sm:p-7">
      <input type="hidden" name="locale" value={locale} />
      {/* Honeypot: hidden from people, bots fill it. */}
      <input type="text" name="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <label className={label}>
        {f.name}
        <input name="name" required minLength={2} maxLength={100} autoComplete="name" defaultValue={v.name} className={input} />
      </label>

      {radios("profile", f.profile, profiles, { required: true, value: profile, onChange: setProfile })}

      {profile === "agency" && (
        <label className={label}>
          {f.agencyName}
          <input name="agencyName" required minLength={2} maxLength={120} autoComplete="organization" defaultValue={v.agencyName} className={input} />
        </label>
      )}

      <div className="grid gap-5 sm:grid-cols-3">
        <label className={label}>
          {f.country}
          {select(
            "country",
            country,
            (iso) => {
              setCountry(iso);
              setDial(dialOf(iso)); // the dial code follows the country, but stays editable
            },
            countries.map(([iso]) => (
              <option key={iso} value={iso}>
                {regions.of(iso)}
              </option>
            )),
          )}
        </label>
        <label className={label}>
          {f.state}
          <input name="state" required minLength={2} maxLength={80} autoComplete="address-level1" defaultValue={v.state} className={input} />
        </label>
        <label className={label}>
          {f.city}
          <input name="city" required minLength={2} maxLength={80} autoComplete="address-level2" defaultValue={v.city} className={input} />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <label className={label}>
          {f.dial}
          {select(
            "dial",
            dial,
            setDial,
            countries.map(([iso, code]) => (
              <option key={iso} value={code}>
                {regions.of(iso)} (+{code})
              </option>
            )),
          )}
        </label>
        <label className={label}>
          {f.phone}
          <input
            name="phone"
            type="tel"
            required
            inputMode="tel"
            autoComplete="tel-national"
            pattern="[0-9 ()\-]{6,20}"
            defaultValue={v.phone}
            className={input}
          />
        </label>
      </div>

      <label className={label}>
        {f.email} <span className="font-normal text-muted">{f.optional}</span>
        <input name="email" type="email" maxLength={254} pattern="[^\s@]+@[^\s@]+\.[^\s@]+" autoComplete="email" defaultValue={v.email} className={input} />
      </label>

      {radios("interest", f.interest, interests, { required: true })}
      {radios("solution", f.solution, solutions, { required: true })}
      {radios("hasSite", `${f.hasSite} ${f.optional}`, hasSiteOptions, { required: false, value: hasSite, onChange: setHasSite })}

      {hasSite === "yes" && (
        <label className={label}>
          {f.site}
          <input
            name="site"
            required
            inputMode="url"
            maxLength={300}
            placeholder={f.sitePlaceholder}
            pattern="\S+\.\S+"
            autoComplete="url"
            defaultValue={v.site}
            className={input}
          />
        </label>
      )}

      <label className={label}>
        {f.difficulty} <span className="font-normal text-muted">{f.optional}</span>
        <textarea name="difficulty" rows={3} maxLength={500} defaultValue={v.difficulty} className={`${input} py-3`} />
      </label>

      {(state.status === "invalid" || state.status === "error") && (
        <p ref={message} role="alert" className="scroll-mt-28 text-sm font-medium text-red-700">
          {state.status === "invalid" ? f.errorInvalid : f.errorSend}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-12 items-center justify-center rounded-full bg-blue px-5 py-3 text-sm font-semibold text-white hover:bg-[#082f69] disabled:opacity-60"
      >
        {pending ? f.sending : f.submit}
      </button>
    </form>
  );
}
