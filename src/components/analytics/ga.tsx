"use client";

import { useEffect } from "react";
import { cookieAllowed } from "@/lib/cookies";

const MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-FNQR0XYR54";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function loadGtag(id: string) {
  if (typeof window === "undefined") return;
  if (document.getElementById("beo-ga4")) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", id);

  const script = document.createElement("script");
  script.id = "beo-ga4";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(script);
}

export function GaAnalytics() {
  useEffect(() => {
    function sync() {
      if (!MEASUREMENT_ID) return;
      if (!cookieAllowed("analytics")) return;
      loadGtag(MEASUREMENT_ID);
    }

    sync();
    window.addEventListener("beo-cookies", sync);
    return () => window.removeEventListener("beo-cookies", sync);
  }, []);

  return null;
}
