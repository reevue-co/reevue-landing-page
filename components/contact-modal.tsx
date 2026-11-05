"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { PiXBold } from "react-icons/pi";
import { ContactForm } from "@/components/contact-form";
import type { Dictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

export const contactDialogId = "contato";

export function openContactDialog() {
  const dialog = document.getElementById(contactDialogId) as HTMLDialogElement | null;
  if (dialog && !dialog.open) dialog.showModal();
}

export function ContactModal({
  locale,
  dict,
  children,
}: {
  locale: Locale;
  dict: Dictionary;
  children: ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a[href='#acesso']");
      if (!anchor) return;
      event.preventDefault();
      document.getElementById("acesso")?.scrollIntoView({ block: "start" });
      openContactDialog();
    };

    document.addEventListener("click", onClick);
    if (window.location.hash === "#acesso") openContactDialog();
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <>
      {children}
      <dialog
        ref={dialogRef}
        id={contactDialogId}
        aria-labelledby={titleId}
        className="contact-dialog"
        onClose={() => {
          if (window.location.hash === "#acesso") {
            window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
          }
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current?.close();
        }}
      >
        <div className="flex max-h-[calc(100dvh-2rem)] w-full flex-col overflow-hidden rounded-[1.75rem] bg-paper text-ink shadow-[0_40px_90px_-36px_rgba(18,21,26,0.55)] ring-1 ring-line">
          <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4 sm:px-7">
            <div>
              <h2 id={titleId} className="text-balance text-2xl font-medium leading-snug tracking-[-0.03em]">
                {dict.early.title}
              </h2>
              <p className="mt-2 text-pretty text-sm leading-6 text-muted">{dict.early.description}</p>
            </div>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label={dict.form.close}
              className="-mr-2 -mt-1 flex size-11 shrink-0 items-center justify-center rounded-full text-ink hover:bg-background"
            >
              <PiXBold className="size-5" />
            </button>
          </div>
          <div data-contact-scroll className="min-h-0 overflow-y-auto overscroll-contain px-5 py-5 sm:px-7">
            <ContactForm locale={locale} dict={dict} />
          </div>
        </div>
      </dialog>
    </>
  );
}
