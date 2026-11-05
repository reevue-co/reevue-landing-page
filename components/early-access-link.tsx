import { PiArrowUpRightBold } from "react-icons/pi";

type EarlyAccessLinkProps = {
  href: string | null;
  label: string;
  unavailable: string;
  newTab: string;
  variant?: "primary" | "inverse" | "nav";
  className?: string;
};

const available: Record<NonNullable<EarlyAccessLinkProps["variant"]>, string> = {
  primary: "bg-blue-solid text-white shadow-[0_12px_30px_-16px_rgba(36,87,230,0.9)] hover:brightness-110",
  inverse: "bg-white text-[#12151a] hover:bg-white",
  nav: "bg-ink px-4 py-2 text-sm text-background hover:opacity-85",
};

const missing: Record<NonNullable<EarlyAccessLinkProps["variant"]>, string> = {
  primary: "bg-line text-muted",
  inverse: "bg-white/12 text-panel-fg",
  nav: "bg-line px-4 py-2 text-sm text-muted",
};

export function EarlyAccessLink({
  href,
  label,
  unavailable,
  newTab,
  variant = "primary",
  className = "",
}: EarlyAccessLinkProps) {
  const shape =
    variant === "nav"
      ? "inline-flex min-h-11 items-center justify-center gap-2 rounded-full font-semibold"
      : "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 py-3 text-center text-sm font-semibold leading-tight sm:whitespace-nowrap";

  if (!href) {
    return (
      <p className={`${shape} ${missing[variant]} cursor-default ${className}`}>{unavailable}</p>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label}. ${newTab}`}
      className={`${shape} ${available[variant]} motion-safe:transition-[transform,background-color] motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.32,0.72,0,1)] motion-safe:active:scale-[0.98] ${className}`}
    >
      <span aria-hidden="true">{label}</span>
      <PiArrowUpRightBold className="size-4 shrink-0" />
    </a>
  );
}
