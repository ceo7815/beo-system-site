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
      <section className="relative mx-auto flex min-h-[100svh] max-w-3xl flex-col items-center justify-center px-5 py-36 text-center md:px-10">
        <div className="about-type">
          <p className="about-type-kicker">נשלח</p>
          <h1 className="about-type-title">קיבלנו.</h1>
          <p className="about-type-p">
            אם וואטסאפ נפתח — שולחים משם. אם לא, חוזרים אליכם לפי הפרטים שהשארתם.
          </p>
          <p className="lp-thanks-fallback">
            <a href={href} data-source={source} target="_blank" rel="noreferrer">
              פתיחת וואטסאפ
            </a>
          </p>
        </div>
      </section>
    </LpShell>
  );
}
