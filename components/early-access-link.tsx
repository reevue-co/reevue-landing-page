import { ExternalIcon } from "@/components/icons";

type EarlyAccessLinkProps = {
  href: string | null;
  label: string;
  unavailable: string;
  newTab: string;
  variant?: "primary" | "inverse" | "nav";
  className?: string;
};

const available: Record<NonNullable<EarlyAccessLinkProps["variant"]>, string> = {
  primary: "bg-blue text-white hover:bg-[#082f69]",
  inverse: "bg-white text-blue hover:bg-blue-soft",
  nav: "bg-blue px-4 py-2 text-sm text-white hover:bg-[#082f69]",
};

const missing: Record<NonNullable<EarlyAccessLinkProps["variant"]>, string> = {
  primary: "bg-[#e4ebf3] text-muted",
  inverse: "bg-white/15 text-white",
  nav: "bg-[#e4ebf3] px-4 py-2 text-sm text-muted",
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
      className={`${shape} ${available[variant]} motion-safe:transition-colors motion-safe:active:translate-y-px ${className}`}
    >
      <span aria-hidden="true">{label}</span>
      <ExternalIcon className="size-4 shrink-0" />
    </a>
  );
}
