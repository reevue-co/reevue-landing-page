import { DismissLink } from "@/components/dismiss-link";

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
      ? "inline-flex min-h-11 items-center justify-center gap-2 rounded-full font-semibold"
      : "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 py-3 text-center text-sm font-semibold leading-tight sm:whitespace-nowrap";
  const classes = `${shape} ${available[variant]} motion-safe:transition-[transform,background-color] motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.32,0.72,0,1)] motion-safe:active:scale-[0.98] ${className}`;

  // The mobile menu must close when the link scrolls to the form.
  return detailsId ? (
    <DismissLink href="#acesso" detailsId={detailsId} className={classes}>
      {label}
    </DismissLink>
  ) : (
    <a href="#acesso" className={classes}>
      {label}
    </a>
  );
}
