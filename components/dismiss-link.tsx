"use client";

type DismissLinkProps = {
  href: string;
  detailsId: string;
  className?: string;
  children: React.ReactNode;
};

export function DismissLink({ href, detailsId, className, children }: DismissLinkProps) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => {
        const menu = document.getElementById(detailsId) as HTMLDetailsElement | null;
        if (menu) menu.open = false;
      }}
    >
      {children}
    </a>
  );
}
