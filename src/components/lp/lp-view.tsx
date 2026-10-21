"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { TalkButton } from "@/components/layout/talk-button";
import { LpExamples } from "@/components/lp/lp-examples";
import { LpForm } from "@/components/lp/lp-form";
import { benefitIcon, LpIcon } from "@/components/lp/lp-icons";
import { LpShell } from "@/components/lp/lp-shell";
import { LpStage } from "@/components/lp/lp-stage";
import type { LpPage } from "@/lib/lp";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function SectionHead({ kicker, title }: { kicker: string; title: string }) {
  return (
    <header className="lp-section-head">
      <p data-lp className="lp-kicker">
        {kicker}
      </p>
      <h2 data-lp className="lp-section-title">
        {title}
      </h2>
    </header>
  );
}

export function LpView({ page }: { page: LpPage }) {
  const root = useRef<HTMLDivElement>(null);
  const compact = page.id === "ai-video-realestate";

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce || !root.current) return;
      root.current.querySelectorAll<HTMLElement>("[data-lp-block]").forEach((block) => {
        const items = block.querySelectorAll("[data-lp]");
        if (!items.length) return;
        gsap.from(items, {
          y: 36,
          opacity: 0,
          duration: 0.9,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: { trigger: block, start: "top 80%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <LpShell source={page.path} waText={`${page.waIntro}\nדף: ${page.path}`}>
      <div ref={root} className={compact ? "lp-compact" : undefined}>
        <section className="lp-hero" data-page={page.id}>
          <div className="lp-hero-orb" aria-hidden />
          {compact ? null : <div className="lp-hero-orb lp-hero-orb-b" aria-hidden />}
          <div className="lp-hero-grid">
            <div className="lp-hero-copy">
              {compact ? null : <p className="lp-kicker lp-rise">{page.kicker}</p>}
              <h1 className="lp-hero-title lp-rise-title">{page.title}</h1>
              <p className="lp-hero-line lp-rise">{page.line}</p>
              {compact ? null : <p className="lp-hero-lead lp-rise">{page.lead}</p>}
              {!compact && page.audiences ? (
                <ul className="lp-audiences lp-rise">
                  {page.audiences.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
              <div className="lp-hero-cta lp-rise">
                <TalkButton href="#lp-lead" className="hud-talk-film" label={page.cta} />
              </div>
            </div>
            {compact ? null : (
              <div className="lp-hero-stage lp-rise">
                <LpStage page={page} />
              </div>
            )}
          </div>
        </section>

        {page.examples && page.examplesKicker && page.examplesTitle ? (
          <LpExamples
            kicker={page.examplesKicker}
            title={page.examplesTitle}
            lead={page.examplesLead}
            items={page.examples}
          />
        ) : null}

        <section className="lp-section" data-lp-block>
          <SectionHead kicker={page.benefitsKicker} title={page.benefitsTitle} />
          <ul className="lp-benefits">
            {page.benefits.map((item, index) => (
              <li key={item.n} data-lp className="lp-benefit">
                <span className="lp-benefit-icon">
                  <LpIcon name={benefitIcon(page.id, index)} />
                </span>
                <span className="lp-benefit-n">{item.n}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="lp-section" data-lp-block>
          <SectionHead kicker={page.stepsKicker} title={page.stepsTitle} />
          <ol className="lp-timeline">
            {page.steps.map((item) => (
              <li key={item.n} data-lp className="lp-step">
                <span className="lp-step-index">{item.n}</span>
                <div className="lp-step-body">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="lp-section lp-section-faq" data-lp-block>
          <SectionHead kicker={page.faqKicker} title={page.faqTitle} />
          <div className="lp-faq" data-lp>
            {page.faq.map((item) => (
              <details key={item.q} className="lp-faq-item">
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
