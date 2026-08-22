"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Field, type FilmProgress } from "@/components/canvas/field";
import { TalkButton } from "@/components/layout/talk-button";
import { DeviceStage } from "@/components/projects/device-stage";
import { StoreBadges } from "@/components/projects/store-badges";
import { projects } from "@/lib/projects";
import { useI18n } from "@/components/providers/i18n-provider";

gsap.registerPlugin(ScrollTrigger);

const progress: FilmProgress = { current: 0 };
const BEAT = 1.05;

export function ProjectsContent() {
  const stage = useRef<HTMLElement>(null);
  const { lang, t } = useI18n();
  const [active, setActive] = useState(0);
  const scenes = projects.length + 1;

  useLayoutEffect(() => {
    if (!stage.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hint = stage.current.querySelector("[data-hint]");

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set("[data-cinema]", { opacity: 1, position: "relative", height: "100svh" });
        gsap.set(stage.current, { height: "auto", overflow: "visible" });
        setActive(0);
        return;
      }

      gsap.set("[data-cinema]", { opacity: 0 });
      gsap.set("[data-cinema='0']", { opacity: 1 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: stage.current,
          start: "top top",
          end: `+=${scenes * (window.matchMedia("(max-width: 767.98px)").matches ? 100 : 82)}%`,
          pin: true,
          scrub: window.matchMedia("(max-width: 767.98px)").matches ? 0.72 : 0.55,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            progress.current = self.progress * 0.35;
            const next = Math.min(
              scenes - 1,
              Math.max(0, Math.round(self.progress * (scenes - 1) - 0.18)),
            );
            setActive((cur) => (cur === next ? cur : next));
          },
        },
      });

      tl.to(hint, { opacity: 0, duration: 0.22 }, 0.1);

      for (let i = 0; i < scenes; i++) {
        const t0 = i * BEAT;
        const layer = `[data-cinema="${i}"]`;
        const isLast = i === scenes - 1;
        if (i === 0) {
          if (!isLast) tl.to(layer, { opacity: 0, duration: 0.42 }, BEAT - 0.42);
          continue;
        }
        tl.fromTo(layer, { opacity: 0 }, { opacity: 1, duration: 0.42 }, t0);
        if (!isLast) tl.to(layer, { opacity: 0, duration: 0.38 }, t0 + BEAT - 0.38);
      }

      ScrollTrigger.refresh();
    }, stage);

    return () => ctx.revert();
  }, [scenes]);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => window.cancelAnimationFrame(id);
  }, [lang]);

  return (
    <section ref={stage} className="cinema-stage relative h-svh overflow-hidden">
      <Field progress={progress} lite />
      <div className="pointer-events-none absolute inset-0 z-[1] cinema-veil" />

      <div data-hint className="scroll-hint">
        <span className="scroll-hint-label">{t.scroll}</span>
        <span className="scroll-hint-arrows" aria-hidden>
          <svg viewBox="0 0 24 14">
            <path d="M2 2l10 10L22 2" />
          </svg>
          <svg viewBox="0 0 24 14">
            <path d="M2 2l10 10L22 2" />
          </svg>
        </span>
      </div>

      <div data-cinema={0} className={`cinema-scene cinema-scene--intro${active === 0 ? " is-on" : ""}`}>
        <p className="cinema-kicker">03</p>
        <h1 className="cinema-title">{t.projectsTitle}</h1>
        <p className="cinema-lead">{t.projectsLead}</p>
      </div>

      {projects.map((project, i) => (
        <div
          key={project.slug}
          data-cinema={i + 1}
          className={`cinema-scene cinema-scene--${project.kind}${active === i + 1 ? " is-on" : ""}`}
        >
          <div className="cinema-copy">
            <p className="cinema-kicker">{project.n}</p>
            <h2 className="cinema-name">{project.title[lang]}</h2>
            {project.role ? <p className="cinema-role">{project.role[lang]}</p> : null}
            <p className="cinema-line">{project.line[lang]}</p>
            {project.credit ? <p className="cinema-credit">{project.credit[lang]}</p> : null}
            {project.stores ? (
              <StoreBadges
                apple={project.stores.apple}
                google={project.stores.google}
                download={t.projectsDownload}
              />
            ) : project.live ? (
              <div className="cinema-live">
                <TalkButton
                  href={project.live}
                  className="hud-talk-film"
                  label={project.liveLabel?.[lang] ?? t.projectsLive}
                  awake={active === i + 1}
                />
              </div>
            ) : null}
          </div>
          <DeviceStage
            kind={project.kind}
            poster={project.poster}
            video={project.video}
            videoWebm={project.videoWebm}
            active={active === i + 1}
            armed={active === 0 ? i === 0 : Math.abs(active - (i + 1)) <= 1}
            title={project.title[lang]}
          />
        </div>
      ))}
    </section>
  );
}
