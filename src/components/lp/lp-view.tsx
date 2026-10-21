"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { TalkButton } from "@/components/layout/talk-button";
import { LpExamples } from "@/components/lp/lp-examples";
import { LpForm } from "@/components/lp/lp-form";
import { benefitIcon, LpIcon } from "@/components/lp/lp-icons";
import { LpChatMock, LpFlowMock } from "@/components/lp/lp-mocks";
import { LpShell } from "@/components/lp/lp-shell";
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

  const showExamples = Boolean(page.examples && page.examplesKicker && page.examplesTitle);

  return (
    <LpShell source={page.path} waText={`${page.waIntro}\nדף: ${page.path}`}>
      <div ref={root} className="lp-compact">
        <div className={showExamples ? undefined : "lp-open"}>
          <section className="lp-hero" data-page={page.id}>
            <div className="lp-hero-orb" aria-hidden />
            <div className="lp-hero-grid">
              <div className="lp-hero-copy">
                <h1 className="lp-hero-title lp-rise-title">{page.title}</h1>
                <p className="lp-hero-line lp-rise">{page.line}</p>
                <div className="lp-hero-cta lp-rise">
                  <TalkButton href="#lp-lead" className="hud-talk-film" label={page.cta} />
                </div>
              </div>
            </div>
          </section>

          {showExamples ? (
            <LpExamples
              kicker={page.examplesKicker ?? ""}
              title={page.examplesTitle ?? ""}
              lead={page.examplesLead}
              items={page.examples ?? []}
            />
          ) : page.id === "ai-agent" ? (
            <LpChatMock />
          ) : (
            <LpFlowMock />
          )}
        </div>

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
