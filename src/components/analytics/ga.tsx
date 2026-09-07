"use client";

import { useEffect } from "react";
import { cookieAllowed, readCookieConsent } from "@/lib/cookies";

const MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const SCRIPT_FLAG = "data-beo-ga";

type Gtag = (...args: unknown[]) => void;

type GaWindow = Window & {
  dataLayer?: unknown[];
  gtag?: Gtag;
};

function gaWindow() {
  return window as GaWindow;
}

function analyticsAllowed() {
  return Boolean(readCookieConsent() && cookieAllowed("analytics"));
}

function setGaDisabled(id: string, disabled: boolean) {
  Object.assign(window, { [`ga-disable-${id}`]: disabled });
}

function ensureGtag(w: GaWindow) {
  w.dataLayer = w.dataLayer || [];
  if (typeof w.gtag === "function") return;
  w.gtag = function gtag() {
    // Standard GA4 snippet pushes the Arguments object.
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer!.push(arguments);
  };
  w.gtag("js", new Date());
}

function loadGa(id: string) {
  const w = gaWindow();
  setGaDisabled(id, false);
  ensureGtag(w);

  const src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  if (!document.querySelector(`script[${SCRIPT_FLAG}]`)) {
    const script = document.createElement("script");
    script.async = true;
    script.src = src;
    script.setAttribute(SCRIPT_FLAG, "");
    document.head.appendChild(script);
  }

  w.gtag?.("config", id);
}

function unloadGa(id: string) {
  const w = gaWindow();
  setGaDisabled(id, true);
  if (typeof w.gtag === "function") {
    w.gtag("consent", "update", { analytics_storage: "denied" });
  }
  document.querySelectorAll(`script[${SCRIPT_FLAG}]`).forEach((el) => el.remove());
}

export function Ga() {
  useEffect(() => {
    if (!MEASUREMENT_ID) return;

    const sync = () => {
      if (analyticsAllowed()) loadGa(MEASUREMENT_ID);
      else unloadGa(MEASUREMENT_ID);
    };

    sync();
    window.addEventListener("beo-cookies", sync);
    return () => window.removeEventListener("beo-cookies", sync);
  }, []);

  return null;
}
