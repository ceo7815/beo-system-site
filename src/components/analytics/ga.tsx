"use client";

import { useEffect } from "react";
import Script from "next/script";
import {
  GA_MEASUREMENT_ID,
  analyticsEventForHref,
  currentPagePath,
  trackEvent,
  updateConsent,
} from "@/lib/analytics";
import { attributionParams, captureAttribution } from "@/lib/attribution";

/**
 * GA4 with Google Consent Mode v2.
 * gtag.js always loads. Consent defaults to "denied" for analytics and ads, so before
 * (or without) consent Google receives cookieless pings only. Accepting analytics in the
 * cookie bar flips analytics_storage to "granted"; marketing flips the ad_* signals.
 */
export function GaAnalytics() {
  useEffect(() => {
    captureAttribution();
    window.addEventListener("beo-cookies", updateConsent);
    return () => window.removeEventListener("beo-cookies", updateConsent);
  }, []);

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
      const params: Record<string, string> = { page_path: currentPagePath(), link_url };
      if (kind !== "contact_click") Object.assign(params, attributionParams());
      trackEvent(kind, params);
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  if (!GA_MEASUREMENT_ID) return null;

  // Runs before gtag.js processes the queue: consent default first, then the stored choice.
  const config = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = window.gtag || gtag;
    if (!window.__beoGa) {
      window.__beoGa = true;
      var c = null;
      try {
        var raw = localStorage.getItem('beo-cookies');
        if (raw === 'all') c = { analytics: true, marketing: true };
        else if (raw === 'reject') c = { analytics: false, marketing: false };
        else if (raw) c = JSON.parse(raw);
      } catch (e) { c = null; }
      var a = c && c.analytics ? 'granted' : 'denied';
      var m = c && c.marketing ? 'granted' : 'denied';
      window.gtag('consent', 'default', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        wait_for_update: 500
      });
      window.gtag('set', 'ads_data_redaction', m === 'denied');
      if (a === 'granted' || m === 'granted') {
        window.gtag('consent', 'update', {
          analytics_storage: a,
          ad_storage: m,
          ad_user_data: m,
          ad_personalization: m
        });
      }
      window.gtag('js', new Date());
      window.gtag('config', '${GA_MEASUREMENT_ID}');
    }
  `;

  return (
    <>
      <Script id="beo-ga4" strategy="afterInteractive">
        {config}
      </Script>
      <Script
        id="beo-ga4-src"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
    </>
  );
}
