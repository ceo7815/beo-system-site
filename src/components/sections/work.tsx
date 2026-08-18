"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { work } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Work() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;
      gsap.from("[data-work]", {
        y: 36,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 78%" },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="work" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
        <p data-work className="text-[12px] tracking-[0.28em] text-brand-hot uppercase">
          עבודות
        </p>
        <h2
          data-work
          className="mt-4 max-w-2xl text-3xl leading-tight font-semibold tracking-tight md:text-5xl"
        >
          מה יוצא מהסטודיו
        </h2>
        <p data-work className="mt-4 max-w-xl text-sm leading-7 text-muted">
          שלושה סוגי פרויקטים שאנחנו בונים שוב ושוב. שמות לקוחות ומספרים —
          נעלה לכאן ברגע שיש אישור לפרסום.
        </p>
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {work.map((item) => (
            <article
              key={item.title}
              data-work
              className="min-h-[280px] rounded-2xl border border-line bg-bg-elev p-6 md:p-7"
            >
              <p className="text-[11px] tracking-[0.2em] text-brand-hot uppercase">
                {item.tag}
              </p>
              <h3 className="mt-8 text-xl leading-snug font-medium tracking-tight">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
