export const COOKIE_KEY = "beo-cookies";

export type CookieConsent = {
  necessary: true;
  preferences: boolean;
  analytics: boolean;
  marketing: boolean;
};

export const cookieDefaults: CookieConsent = {
  necessary: true,
  preferences: true,
  analytics: false,
  marketing: false,
};

export function readCookieConsent(): CookieConsent | null {
  try {
    const raw = window.localStorage.getItem(COOKIE_KEY);
    if (!raw) return null;
    if (raw === "all") {
      return { necessary: true, preferences: true, analytics: true, marketing: true };
    }
    if (raw === "reject") {
      return { necessary: true, preferences: false, analytics: false, marketing: false };
    }
    const parsed = JSON.parse(raw) as Partial<CookieConsent>;
    return {
      necessary: true,
      preferences: !!parsed.preferences,
      analytics: !!parsed.analytics,
      marketing: !!parsed.marketing,
    };
  } catch {
    return null;
  }
}

export function cookieAllowed(kind: keyof CookieConsent) {
  const consent = readCookieConsent();
  if (!consent) return kind === "necessary";
  return Boolean(consent[kind]);
}

export function writeCookieConsent(consent: CookieConsent) {
  window.localStorage.setItem(COOKIE_KEY, JSON.stringify(consent));
  if (consent.preferences) {
    const lang = document.documentElement.lang;
    if (lang === "he" || lang === "en") window.localStorage.setItem("beo-lang", lang);
  } else {
    window.localStorage.removeItem("beo-lang");
    window.localStorage.removeItem("beo-a11y");
  }
  window.dispatchEvent(new Event("beo-cookies"));
}
