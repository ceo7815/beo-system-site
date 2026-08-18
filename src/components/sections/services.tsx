"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { services } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Services() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;
      gsap.from("[data-svc]", {
        y: 32,
        opacity: 0,
        duration: 0.85,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 78%" },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="services" className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
      <p data-svc className="text-[12px] tracking-[0.28em] text-brand-hot uppercase">
        מה בונים
      </p>
      <h2
        data-svc
        className="mt-4 max-w-3xl text-3xl leading-tight font-semibold tracking-tight md:text-5xl"
      >
        חברת פיתוח תוכנה.
        <span className="text-muted"> AI במרכז, מערכת מאחור, מוצר מלפנים.</span>
      </h2>
      <ul className="mt-14 divide-y divide-line border-y border-line">
        {services.map((item) => (
          <li
            key={item.n}
            data-svc
            className="group grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 py-7 md:grid-cols-[4.5rem_minmax(0,14rem)_1fr] md:items-baseline md:py-8"
          >
            <span className="font-mono text-[12px] text-brand-hot">{item.n}</span>
            <h3 className="text-xl font-medium tracking-tight md:text-2xl">{item.title}</h3>
            <p className="col-span-2 max-w-xl text-sm leading-7 text-muted md:col-span-1 md:justify-self-end md:text-start">
              {item.body}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
