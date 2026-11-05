"use client";

import { openContactDialog } from "@/components/contact-modal";

type EarlyAccessLinkProps = {
  label: string;
  detailsId?: string;
  variant?: "primary" | "inverse" | "nav";
  className?: string;
};

const available: Record<NonNullable<EarlyAccessLinkProps["variant"]>, string> = {
  primary: "bg-blue-solid text-white shadow-[0_12px_30px_-16px_rgba(36,87,230,0.9)] hover:brightness-110",
  inverse: "bg-white text-[#12151a] hover:bg-white",
  nav: "bg-ink px-4 py-2 text-sm text-background hover:opacity-85",
};

export function EarlyAccessLink({
  label,
  detailsId,
  variant = "primary",
  className = "",
}: EarlyAccessLinkProps) {
  const shape =
    variant === "nav"
      ? "inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full border-0 font-sans font-semibold"
      : "inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full border-0 px-5 py-3 text-center font-sans text-sm font-semibold leading-tight sm:whitespace-nowrap";
  const classes = `${shape} ${available[variant]} motion-safe:transition-[transform,background-color] motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.32,0.72,0,1)] motion-safe:active:scale-[0.98] ${className}`;

  return (
    <button
      type="button"
      className={classes}
      onClick={() => {
        if (detailsId) {
          const menu = document.getElementById(detailsId) as HTMLDetailsElement | null;
          if (menu) menu.open = false;
        }
        openContactDialog();
      }}
    >
      {label}
    </button>
  );
}
