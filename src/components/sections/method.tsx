"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { method } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Method() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;
      gsap.from("[data-step]", {
        y: 28,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 78%" },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="method" className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
      <p data-step className="text-[12px] tracking-[0.28em] text-brand-hot uppercase">
        איך עובדים
      </p>
      <h2
        data-step
        className="mt-4 max-w-2xl text-3xl leading-tight font-semibold tracking-tight md:text-5xl"
      >
        קצר, ברור, בלי תיאטרון.
      </h2>
      <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
        {method.map((item) => (
          <li key={item.n} data-step className="bg-bg p-6 md:min-h-[280px] md:p-7">
            <span className="font-mono text-[12px] text-brand-hot">{item.n}</span>
            <h3 className="mt-6 text-xl font-medium">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-muted">{item.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
