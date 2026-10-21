"use client";

import { useSyncExternalStore } from "react";
import { LpShell } from "@/components/lp/lp-shell";
import { lpPages, lpThanksPath, lpWhatsappUrl } from "@/lib/lp";

const lpSources = new Set<string>([
  lpPages.realEstate.path,
  lpPages.agent.path,
  lpPages.automation.path,
  lpThanksPath,
]);

function readThanksSource() {
  const from = new URLSearchParams(window.location.search).get("source");
  return from && lpSources.has(from) ? from : lpThanksPath;
}

function subscribeThanksSource() {
  return () => {};
}

function thanksSourceSnapshot() {
  return lpThanksPath;
}

function useThanksSource() {
  return useSyncExternalStore(subscribeThanksSource, readThanksSource, thanksSourceSnapshot);
}

export function LpThanks() {
  const source = useThanksSource();
  const href = lpWhatsappUrl(`היי, השארתי פנייה בדף ${source}`);

  return (
    <LpShell source={source} waText={`היי, השארתי פנייה בדף ${source}`}>
      <section className="lp-hero lp-hero-thanks">
        <div className="lp-hero-orb" aria-hidden />
        <div className="lp-hero-orb lp-hero-orb-b" aria-hidden />
        <div className="lp-thanks-mark" aria-hidden>
          <span />
        </div>
        <div className="lp-hero-copy">
          <p className="lp-kicker lp-rise">נשלח</p>
          <h1 className="lp-hero-title lp-rise-title">קיבלנו.</h1>
          <p className="lp-hero-lead lp-rise">
            אם וואטסאפ נפתח — שולחים משם. אם לא, חוזרים אליכם לפי הפרטים שהשארתם.
          </p>
          <p className="lp-thanks-fallback lp-rise">
            <a href={href} data-source={source} target="_blank" rel="noreferrer">
              פתיחת וואטסאפ
            </a>
          </p>
        </div>
      </section>
    </LpShell>
  );
}
