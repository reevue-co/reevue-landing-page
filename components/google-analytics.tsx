"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function GoogleAnalytics({ measurementId }: { measurementId: string | null }) {
  const pathname = usePathname();
  const initialView = useRef(true);

  useEffect(() => {
    if (!measurementId) return;
    if (initialView.current) {
      initialView.current = false;
      return;
    }

    window.gtag?.("config", measurementId, { page_path: pathname });
  }, [measurementId, pathname]);

  if (!measurementId) return null;

  const id = JSON.stringify(measurementId);

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', ${id});
        `}
      </Script>
    </>
  );
}
