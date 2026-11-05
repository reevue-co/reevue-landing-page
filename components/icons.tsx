import type { ReactNode } from "react";

type IconProps = {
  className?: string;
};

function Icon({ className, children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className ?? "size-5"}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

export function MenuIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Icon>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M6 6l12 12M18 6 6 18" />
    </Icon>
  );
}

export function ChevronIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="m6 9 6 6 6-6" />
    </Icon>
  );
}

export function ExternalIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M14 6h4v4" />
      <path d="M18 6 10 14" />
      <path d="M16 13.5V17a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h3.5" />
    </Icon>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="m5 12 5 5L20 7" />
    </Icon>
  );
}

export function BrandIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <rect x="4" y="5" width="16" height="14" rx="2" />
      <path d="M8 15.5 10.4 12l1.8 2 2.2-3.2L16.5 15.5" />
    </Icon>
  );
}

export function CatalogIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M5 6.5h14M5 12h14M5 17.5h9" />
    </Icon>
  );
}

export function ShareIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <circle cx="7" cy="12" r="2.25" />
      <circle cx="16.5" cy="7.5" r="2.25" />
      <circle cx="16.5" cy="16.5" r="2.25" />
      <path d="m9 11 5.2-2.6M9 13l5.2 2.6" />
    </Icon>
  );
}

export function MessageIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M6 16.5 4.8 19.5c-.2.5.3 1 .8.8L9 19.2A8 8 0 1 0 6 16.5Z" />
    </Icon>
  );
}

export function PenIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M13.5 6.5 17.5 10.5" />
      <path d="M5 19h4L18.2 9.8a1.8 1.8 0 0 0-2.5-2.5L6.5 16.5 5 19Z" />
    </Icon>
  );
}
