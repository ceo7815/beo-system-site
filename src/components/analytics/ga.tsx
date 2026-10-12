"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { cookieAllowed } from "@/lib/cookies";
import {
  GA_MEASUREMENT_ID,
  analyticsEventForHref,
  currentPagePath,
  ensureGtag,
  trackEvent,
} from "@/lib/analytics";

export function GaAnalytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    function sync() {
      setEnabled(Boolean(GA_MEASUREMENT_ID) && cookieAllowed("analytics"));
    }
    sync();
    window.addEventListener("beo-cookies", sync);
    return () => window.removeEventListener("beo-cookies", sync);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    ensureGtag();
  }, [enabled]);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href) return;
      const kind = analyticsEventForHref(href, window.location.href);
      if (!kind) return;
      let link_url = href;
      try {
        link_url = new URL(href, window.location.href).href;
      } catch {
        /* keep the raw href */
      }
      trackEvent(kind, { page_path: currentPagePath(), link_url });
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  if (!enabled) return null;

  const config = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = window.gtag || gtag;
    if (!window.__beoGa) {
      window.__beoGa = true;
      window.gtag('js', new Date());
      window.gtag('config', '${GA_MEASUREMENT_ID}');
    }
  `;

  return (
    <>
      <Script
        id="beo-ga4-src"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="beo-ga4" strategy="afterInteractive">
        {config}
      </Script>
    </>
  );
}
