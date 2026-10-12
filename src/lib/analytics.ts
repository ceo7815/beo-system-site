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

export type AnalyticsClick = "whatsapp_click" | "contact_click";

export function analyticsEventForHref(href: string, pageHref: string): AnalyticsClick | null {
  let url: URL;
  let page: URL;
  try {
    page = new URL(pageHref);
    url = new URL(href, page);
  } catch {
    return null;
  }

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

export function trackEvent(name: string, params: Record<string, string>) {
  if (typeof window === "undefined") return;
  if (!cookieAllowed("analytics")) return;
  ensureGtag();
  window.gtag?.("event", name, params);
}
