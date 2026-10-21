"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { TalkButton } from "@/components/layout/talk-button";
import { LpForm } from "@/components/lp/lp-form";
import { LpShell } from "@/components/lp/lp-shell";
import { LpVideo } from "@/components/lp/lp-video";
import type { LpPage } from "@/lib/lp";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function LpView({ page }: { page: LpPage }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce || !root.current) return;
      root.current.querySelectorAll<HTMLElement>("[data-lp-block]").forEach((block) => {
        const items = block.querySelectorAll("[data-lp]");
        if (!items.length) return;
        gsap.from(items, {
          y: 28,
          opacity: 0,
          duration: 0.8,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: { trigger: block, start: "top 78%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <LpShell source={page.path} waText={`${page.waIntro}\nדף: ${page.path}`}>
      <div ref={root}>
        <section className="relative mx-auto flex min-h-[100svh] max-w-4xl flex-col items-center justify-center px-5 pb-16 pt-36 text-center md:px-10 md:pb-24 md:pt-44">
          <div className="about-type">
            <p className="about-type-kicker">{page.kicker}</p>
            <h1 className="about-type-title">{page.title}</h1>
            <p className="about-type-cta">{page.line}</p>
            <p className="about-type-p">{page.lead}</p>
            {page.audiences ? (
              <ul className="lp-audiences">
                {page.audiences.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
            <div className="about-type-action">
              <TalkButton href="#lp-lead" className="hud-talk-film" label={page.cta} />
            </div>
          </div>
        </section>

        {page.video ? <LpVideo src={page.video.src} poster={page.video.poster} /> : null}

        <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28" data-lp-block>
          <p data-lp className="text-[12px] tracking-[0.28em] text-brand-hot uppercase">
            {page.benefitsKicker}
          </p>
          <h2
            data-lp
            className="mt-4 max-w-3xl text-3xl leading-tight font-semibold tracking-tight md:text-5xl"
          >
            {page.benefitsTitle}
          </h2>
          <ul className="mt-12 divide-y divide-line border-y border-line">
            {page.benefits.map((item) => (
              <li
                key={item.n}
                data-lp
                className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 py-7 md:grid-cols-[4.5rem_minmax(0,16rem)_1fr] md:items-baseline md:py-8"
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

        <section className="mx-auto max-w-6xl px-5 pb-20 md:px-8 md:pb-28" data-lp-block>
          <p data-lp className="text-[12px] tracking-[0.28em] text-brand-hot uppercase">
            {page.stepsKicker}
          </p>
          <h2
            data-lp
            className="mt-4 max-w-3xl text-3xl leading-tight font-semibold tracking-tight md:text-5xl"
          >
            {page.stepsTitle}
          </h2>
          <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
            {page.steps.map((item) => (
              <li key={item.n} data-lp className="bg-bg p-6 md:min-h-[240px] md:p-7">
                <span className="font-mono text-[12px] text-brand-hot">{item.n}</span>
                <h3 className="mt-6 text-xl font-medium">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{item.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="lp-faq mx-auto max-w-6xl px-5 pb-8 md:px-8" data-lp-block>
          <p data-lp className="text-[12px] tracking-[0.28em] text-brand-hot uppercase">
            {page.faqKicker}
          </p>
          <h2
            data-lp
            className="mt-4 max-w-3xl text-3xl leading-tight font-semibold tracking-tight md:text-5xl"
          >
            {page.faqTitle}
          </h2>
          <div data-lp className="mt-8 border-t border-line">
            {page.faq.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <LpForm page={page} />
      </div>
    </LpShell>
  );
}
