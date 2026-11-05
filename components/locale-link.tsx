"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

type LocaleLinkProps = {
  locale: string;
  lang: string;
  hrefLang: string;
  current?: boolean;
  className?: string;
  children: ReactNode;
};

export function LocaleLink({
  locale,
  lang,
  hrefLang,
  current = false,
  className,
  children,
}: LocaleLinkProps) {
  const router = useRouter();

  return (
    <Link
      href={`/${locale}`}
      lang={lang}
      hrefLang={hrefLang}
      aria-current={current ? "true" : undefined}
      className={className}
      onClick={(event) => {
        const hash = window.location.hash;
        if (!hash) return;
        event.preventDefault();
        router.push(`/${locale}${hash}`);
      }}
    >
      {children}
    </Link>
  );
}
