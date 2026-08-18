"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Field } from "@/components/canvas/field";
import { whatsappUrl } from "@/lib/site";

gsap.registerPlugin(useGSAP);

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;
      gsap.from("[data-hero]", {
        y: 28,
        opacity: 0,
        duration: 1.05,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.08,
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="top"
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden"
    >
      <Field />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(6,4,10,0.15)_0%,rgba(6,4,10,0.55)_55%,rgba(6,4,10,0.96)_100%)]" />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 pt-28 md:px-8 md:pb-24">
        <p
          data-hero
          className="text-[12px] font-medium tracking-[0.28em] text-brand-hot uppercase"
        >
          Beo System
        </p>
        <h1
          data-hero
          className="mt-5 max-w-4xl text-[clamp(2.4rem,8vw,5.6rem)] leading-[1.05] font-semibold tracking-tight"
        >
          פיתוח תוכנה
          <br />
          עם בינה מלאכותית.
        </h1>
        <p
          data-hero
          className="mt-6 max-w-xl text-base leading-8 text-muted md:text-lg"
        >
          סוכני AI, צ׳אטבוטים, אוטומציות, מערכות CRM, אפליקציות ואתרים.
          נבנים בהתאמה לעסק — ועובדים בפרודקשן.
        </p>
        <div data-hero className="mt-9 flex flex-wrap items-center gap-3">
          <a
            href="#contact"
            className="rounded-full bg-brand px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-deep"
          >
            שיחת היכרות
          </a>
          <a
            href={whatsappUrl("היי, אשמח לשמוע איך ביו סיסטם יכולה לבנות לנו מערכת / סוכן / אתר")}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-line px-6 py-3 text-sm text-fg transition-colors hover:border-fg/30"
          >
            וואטסאפ
          </a>
        </div>
      </div>
    </section>
  );
}
