/**
 * First-touch source attribution for the current browser session.
 * Stored in sessionStorage only (cleared when the tab/session ends), no cookies.
 */
export const ATTR_KEY = "beo-attr";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;
const CLICK_KEYS = ["gclid", "gbraid", "wbraid", "fbclid"] as const;

export type Attribution = {
  landing_page: string;
  referrer: string;
  lead_source: string;
} & Partial<Record<(typeof UTM_KEYS)[number] | (typeof CLICK_KEYS)[number], string>>;

const clip = (v: string, n = 100) => v.slice(0, n);

function referrerHost(ref: string): string {
  if (!ref) return "";
  try {
    const host = new URL(ref).hostname.toLowerCase().replace(/^www\./, "");
    return host === window.location.hostname.toLowerCase().replace(/^www\./, "") ? "" : host;
  } catch {
    return "";
  }
}

function deriveSource(a: Omit<Attribution, "lead_source">): string {
  if (a.gclid || a.gbraid || a.wbraid) return "google / cpc";
  if (a.utm_source) return `${a.utm_source} / ${a.utm_medium || "(none)"}`;
  if (a.fbclid) return "facebook / paid";
  const host = a.referrer;
  if (!host) return "direct";
  if (/(^|\.)google\./.test(host)) return "google / organic";
  if (/(^|\.)bing\.com$/.test(host)) return "bing / organic";
  if (/chatgpt\.com|openai\.com|perplexity\.ai|claude\.ai|gemini\.google|copilot\.microsoft/.test(host)) {
    return `${host} / ai`;
  }
  return `${host} / referral`;
}

export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  try {
    if (window.sessionStorage.getItem(ATTR_KEY)) return;
    const params = new URLSearchParams(window.location.search);
    const base: Omit<Attribution, "lead_source"> = {
      landing_page: clip(window.location.pathname),
      referrer: clip(referrerHost(document.referrer)),
    };
    for (const k of [...UTM_KEYS, ...CLICK_KEYS]) {
      const v = params.get(k);
      if (v) base[k] = clip(v);
    }
    const attr: Attribution = { ...base, lead_source: deriveSource(base) };
    window.sessionStorage.setItem(ATTR_KEY, JSON.stringify(attr));
  } catch {
    /* storage blocked: attribution is best effort */
  }
}

export function readAttribution(): Attribution | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(ATTR_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : null;
  } catch {
    return null;
  }
}

/** Flat string params for GA4 events (empty values dropped). */
export function attributionParams(): Record<string, string> {
  const a = readAttribution();
  if (!a) return {};
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(a)) if (v) out[k] = String(v);
  return out;
}
