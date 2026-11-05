"use client";

import { useActionState, useEffect, useLayoutEffect, useRef, useState } from "react";
import { PiArrowLeftBold, PiArrowRightBold, PiCaretDownBold } from "react-icons/pi";
import { countries, hasSiteOptions, interests, profiles, solutions, type ContactState } from "@/lib/contact";
import { submitContact } from "@/lib/contact-action";
import { caretForDigitCount, formatPhone, phoneExample, phonePattern } from "@/lib/phone-mask";
import type { Dictionary } from "@/lib/dictionary";
import { htmlLang, type Locale } from "@/lib/i18n";

const input =
  "min-h-12 w-full rounded-xl border border-line bg-background px-3 text-base text-ink placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue";
const label = "grid gap-1.5 text-sm font-medium";
const initial: ContactState = { status: "idle", fields: {} };
const defaultCountry = { "pt-br": "BR", es: "MX", en: "US" } as const;
const dialOf = (iso: string) => countries.find(([c]) => c === iso)?.[1] ?? "55";

export function ContactForm({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [state, action, pending] = useActionState(submitContact, initial);
  const v = state.fields;
  const [country, setCountry] = useState(v.country || defaultCountry[locale]);
  const [dial, setDial] = useState(v.dial || dialOf(country));
  const [phone, setPhone] = useState(() => formatPhone(v.phone ?? "", v.dial || dialOf(v.country || defaultCountry[locale])));
  const [profile, setProfile] = useState(v.profile ?? "");
  const [hasSite, setHasSite] = useState(v.hasSite ?? "");
  const [step, setStep] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const phoneCaret = useRef<number | null>(null);

  useLayoutEffect(() => {
    const field = phoneRef.current;
    if (!field || phoneCaret.current == null) return;
    const position = caretForDigitCount(phone, phoneCaret.current);
    field.setSelectionRange(position, position);
    phoneCaret.current = null;
  }, [phone]);

  function changeDial(code: string) {
    setDial(code);
    setPhone((current) => formatPhone(current, code));
  }

  function onPhoneChange(event: React.ChangeEvent<HTMLInputElement>) {
    const field = event.target;
    field.setCustomValidity("");
    phoneCaret.current = field.value.slice(0, field.selectionStart ?? field.value.length).replace(/\D/g, "").length;
    setPhone(formatPhone(field.value, dial));
  }

  const message = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (state.status === "idle") return;
    if (state.status === "invalid") {
      const general =
        v.name.trim().length < 2 ||
        !profiles.includes(v.profile as (typeof profiles)[number]) ||
        v.phone.replace(/\D/g, "").length < 6 ||
        (v.profile === "agency" && v.agencyName.trim().length < 2);
      const location = v.state.trim().length < 2 || v.city.trim().length < 2;
      setStep(general ? 0 : location ? 1 : 2);
    }
    message.current?.scrollIntoView({ block: "nearest" });
  }, [state, v]);

  function showStep(nextStep: number) {
    setStep(nextStep);
    formRef.current?.closest("[data-contact-scroll]")?.scrollTo({ top: 0 });
  }

  function nextStep() {
    const form = formRef.current;
    if (!form) return;

    const field = phoneRef.current;
    if (field && step === 0) {
      const formatted = formatPhone(field.value, dial);
      field.value = formatted;
      setPhone(formatted);
      const complete = new RegExp(`^(?:${phonePattern(dial)})$`).test(formatted);
      field.setCustomValidity(complete ? "" : dict.form.phoneInvalid);
    }

    const invalid = [...form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("input, select, textarea")].find(
      (el) => el.name !== "hp" && !el.closest("[hidden]") && !el.checkValidity(),
    );
    if (invalid) {
      invalid.reportValidity();
      invalid.focus();
      return;
    }

    showStep(step + 1);
  }

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
      <p ref={message} role="status" className="text-base font-medium text-ink">
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

  const steps = [f.stepGeneral, f.stepLocation, f.stepInterest];

  return (
    <form ref={formRef} action={action} className="grid gap-5 text-ink">
      <input type="hidden" name="locale" value={locale} />
      {/* Honeypot: hidden from people, bots fill it. */}
      <input type="text" name="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <ol aria-label={f.steps} className="grid grid-cols-3 gap-3">
        {steps.map((title, index) => (
          <li key={title} aria-current={index === step ? "step" : undefined}>
            <p className={`text-sm font-medium ${index === step ? "text-ink" : index < step ? "text-blue" : "text-muted"}`}>
              {title}
            </p>
            <span className={`mt-2 block h-0.5 rounded-full ${index <= step ? "bg-blue" : "bg-line"}`} />
          </li>
        ))}
      </ol>

      <div hidden={step !== 0}>
        <div className="grid gap-5">
      <label className={label}>
        {f.name}
        <input
          name="name"
          required={step === 0}
          minLength={2}
          maxLength={100}
          autoComplete="name"
          placeholder={f.namePlaceholder}
          defaultValue={v.name}
          className={input}
        />
      </label>

      {radios("profile", f.profile, profiles, { required: step === 0, value: profile, onChange: setProfile })}

      {profile === "agency" && (
        <label className={label}>
          {f.agencyName}
          <input
            name="agencyName"
            required={step === 0}
            minLength={2}
            maxLength={120}
            autoComplete="organization"
            placeholder={f.agencyPlaceholder}
            defaultValue={v.agencyName}
            className={input}
          />
        </label>
      )}
        </div>
      </div>

      <div hidden={step !== 1}>
        <div className="grid gap-5 sm:grid-cols-3">
        <label className={label}>
          {f.country}
          {select(
            "country",
            country,
            (iso) => {
              setCountry(iso);
              changeDial(dialOf(iso));
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
          <input
            name="state"
            required={step === 1}
            minLength={2}
            maxLength={80}
            autoComplete="address-level1"
            placeholder={f.statePlaceholder}
            defaultValue={v.state}
            className={input}
          />
        </label>
        <label className={label}>
          {f.city}
          <input
            name="city"
            required={step === 1}
            minLength={2}
            maxLength={80}
            autoComplete="address-level2"
            placeholder={f.cityPlaceholder}
            defaultValue={v.city}
            className={input}
          />
        </label>
        </div>
      </div>

      <div hidden={step !== 0}>
        <div className="grid gap-5">
          <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
            <label className={label}>
              {f.dial}
              {select(
                "dial",
                dial,
                changeDial,
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
                ref={phoneRef}
                name="phone"
                type="tel"
                required={step === 0}
                onBlur={onPhoneChange}
                inputMode="tel"
                autoComplete="tel-national"
                pattern={phonePattern(dial)}
                placeholder={phoneExample(dial)}
                value={phone}
                onChange={onPhoneChange}
                className={input}
              />
            </label>
          </div>

          <label className={label}>
            {f.email} <span className="font-normal text-muted">{f.optional}</span>
            <input
              name="email"
              type="email"
              maxLength={254}
              pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
              autoComplete="email"
              placeholder={f.emailPlaceholder}
              defaultValue={v.email}
              className={input}
            />
          </label>
        </div>
      </div>

      <div hidden={step !== 2}>
        <div className="grid gap-5">
          {radios("interest", f.interest, interests, { required: step === 2 })}
          {radios("solution", f.solution, solutions, { required: step === 2 })}
          {radios("hasSite", `${f.hasSite} ${f.optional}`, hasSiteOptions, { required: false, value: hasSite, onChange: setHasSite })}

          {hasSite === "yes" && (
            <label className={label}>
              {f.site}
              <input
                name="site"
                required={step === 2}
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
            <textarea
              name="difficulty"
              rows={3}
              maxLength={500}
              placeholder={f.difficultyPlaceholder}
              defaultValue={v.difficulty}
              className={`${input} py-3`}
            />
          </label>

          <label className="flex items-start gap-3 rounded-xl bg-background px-4 py-3 text-sm leading-6 text-ink">
            <input
              name="consent"
              type="checkbox"
              value="yes"
              required={step === 2}
              defaultChecked={v.consent === "yes"}
              className="mt-1 size-4 shrink-0 accent-blue-solid"
            />
            <span>{dict.early.support}</span>
          </label>
        </div>
      </div>

      {(state.status === "invalid" || state.status === "error") && (
        <p ref={message} role="alert" className="text-sm font-medium text-red-700">
          {state.status === "invalid" ? f.errorInvalid : f.errorSend}
        </p>
      )}

      <div className="flex gap-3">
        {step > 0 && (
          <button
            type="button"
            onClick={() => showStep(step - 1)}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-line px-5 text-sm font-semibold text-ink hover:bg-background"
          >
            <PiArrowLeftBold aria-hidden="true" className="size-4" />
            {f.back}
          </button>
        )}
        {step < 2 ? (
          <button
            type="button"
            onClick={nextStep}
            className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-blue-solid px-5 py-3 text-sm font-semibold text-white hover:brightness-110"
          >
            {f.next}
            <PiArrowRightBold aria-hidden="true" className="size-4" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={pending}
            className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-blue-solid px-5 py-3 text-sm font-semibold text-white hover:brightness-110 disabled:opacity-60"
          >
            {pending ? f.sending : f.submit}
          </button>
        )}
      </div>
    </form>
  );
}
