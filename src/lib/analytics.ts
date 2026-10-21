import { cookieAllowed } from "@/lib/cookies";

const GA_ID_PATTERN = /^G-[A-Z0-9]+$/;

export const GA_MEASUREMENT_ID = GA_ID_PATTERN.test(
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "",
)
  ? process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!
  : "G-FNQR0XYR54";

const CONTACT_HOSTS = new Set(["beosystem.com", "www.beosystem.com"]);

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __beoGa?: boolean;
  }
}

export type AnalyticsClick = "whatsapp_click" | "contact_click" | "phone_click" | "email_click";

export function analyticsEventForHref(href: string, pageHref: string): AnalyticsClick | null {
  let url: URL;
  let page: URL;
  try {
    page = new URL(pageHref);
    url = new URL(href, page);
  } catch {
    return null;
  }

  if (url.protocol === "tel:") return "phone_click";
  if (url.protocol === "mailto:") return "email_click";

  const host = url.hostname.toLowerCase();
  if (host === "wa.me" || host.endsWith(".wa.me")) return "whatsapp_click";

  if (url.hash !== "#contact") return null;
  const path = url.pathname.replace(/\/+$/, "") || "/";
  if (path !== "/") return null;

  const pageHost = page.hostname.toLowerCase();
  if (host === pageHost || CONTACT_HOSTS.has(host)) return "contact_click";
  return null;
}

export function ensureGtag() {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag === "function") return;
  window.gtag = function gtag() {
    // gtag.js consumes queued commands as an Arguments object.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer?.push(arguments);
  };
}

export function currentPagePath() {
  return `${window.location.pathname}${window.location.search}`;
}

type ConsentState = "granted" | "denied";

/**
 * Google Consent Mode v2 state from the visitor's cookie choice.
 * Without consent everything stays "denied": gtag sends cookieless pings only
 * (no _ga cookies, no ad identifiers), so visits and leads are still counted.
 */
export function consentState(): Record<string, ConsentState> {
  const analytics: ConsentState = cookieAllowed("analytics") ? "granted" : "denied";
  const marketing: ConsentState = cookieAllowed("marketing") ? "granted" : "denied";
  return {
    analytics_storage: analytics,
    ad_storage: marketing,
    ad_user_data: marketing,
    ad_personalization: marketing,
  };
}

export function updateConsent() {
  if (typeof window === "undefined") return;
  ensureGtag();
  const state = consentState();
  window.gtag?.("consent", "update", state);
  window.gtag?.("set", "ads_data_redaction", state.ad_storage === "denied");
}

/** Events fire in every consent state; Consent Mode decides cookies vs cookieless. */
export function trackEvent(name: string, params: Record<string, string>) {
  if (typeof window === "undefined") return;
  ensureGtag();
  window.gtag?.("event", name, { ...params, transport_type: "beacon" });
}
