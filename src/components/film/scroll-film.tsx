"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Field, type FilmProgress } from "@/components/canvas/field";
import { ShotMedia } from "@/components/film/shot-media";
import { TalkButton } from "@/components/layout/talk-button";
import { shots } from "@/lib/film";
import { useI18n } from "@/components/providers/i18n-provider";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const progress: FilmProgress = { current: 0 };
const BEAT = 1.4;

export function ScrollFilm() {
  const stage = useRef<HTMLElement>(null);
  const { lang, t } = useI18n();

  useGSAP(
    () => {
      if (!stage.current) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const hint = stage.current.querySelector("[data-hint]");
      const lastCopy = `[data-copy="${shots.length - 1}"]`;
      const cta = stage.current.querySelector<HTMLElement>(lastCopy);

      if (reduce) {
        gsap.set("[data-shot], [data-copy]", { opacity: 1, y: 0, position: "relative", height: "100svh" });
        gsap.set("[data-shot-img]", { scale: 1 });
        gsap.set(stage.current, { height: "auto", overflow: "visible" });
        return;
      }

      gsap.set("[data-shot]", { opacity: 0 });
      gsap.set("[data-shot='0']", { opacity: 1 });
      gsap.set("[data-shot-img]", { scale: 1.015 });
      gsap.set("[data-shot-img='0']", { scale: 1 });
      gsap.set("[data-copy]", { opacity: 0, y: 22 });
      gsap.set("[data-copy='0']", { opacity: 1, y: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: stage.current,
          start: "top top",
          end: `+=${shots.length * 95}%`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            progress.current = self.progress;
            if (cta) cta.style.pointerEvents = self.progress > 0.88 ? "auto" : "none";
          },
        },
      });

      tl.to(hint, { opacity: 0, duration: 0.35 }, 0.25);

      shots.forEach((shot, i) => {
        const t = i * BEAT;
        const layer = `[data-shot="${i}"]`;
        const img = `[data-shot-img="${i}"]`;
        const copy = `[data-copy="${i}"]`;
        const isLast = i === shots.length - 1;

        if (i === 0) {
          tl.to(img, { scale: 1.01, duration: BEAT * 0.7 }, 0);
          tl.to(img, { scale: 1.03, duration: BEAT * 0.3 }, BEAT * 0.7);
          tl.to(copy, { opacity: 0, y: -18, duration: 0.22 }, BEAT - 0.28);
          tl.to(layer, { opacity: 0, duration: 0.28 }, BEAT - 0.26);
          return;
        }

        tl.to(layer, { opacity: 1, duration: 0.32 }, t);
        tl.to(copy, { opacity: 1, y: 0, duration: 0.32 }, t + 0.12);

        if (shot.move === "enter") {
          tl.fromTo(img, { scale: 1.035 }, { scale: 1.01, duration: BEAT * 0.72 }, t);
          tl.to(img, { scale: 1.025, duration: BEAT * 0.28 }, t + BEAT * 0.72);
        } else if (shot.move === "through") {
          tl.fromTo(img, { scale: 1 }, { scale: 1.035, duration: BEAT }, t);
        } else {
          tl.fromTo(
            layer,
            { clipPath: "inset(12% 12% 12% 12% round 20px)" },
            { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: BEAT * 0.42 },
            t,
          );
          tl.fromTo(img, { scale: 1.02 }, { scale: 1, duration: BEAT * 0.42 }, t);
          tl.to(img, { scale: 1.03, duration: BEAT * 0.58 }, t + BEAT * 0.42);
          if (!isLast) {
            tl.to(
              layer,
              { clipPath: "inset(24% 24% 24% 24% round 36px)", duration: 0.28 },
              t + BEAT - 0.28,
            );
          }
        }

        if (!isLast) {
          tl.to(copy, { opacity: 0, y: -18, duration: 0.22 }, t + BEAT - 0.28);
          tl.to(layer, { opacity: 0, duration: 0.28 }, t + BEAT - 0.26);
        }
      });

      ScrollTrigger.refresh();
    },
    { scope: stage },
  );

  useEffect(() => {
    const id = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => window.cancelAnimationFrame(id);
  }, [lang]);

  return (
    <section ref={stage} id="top" className="film-stage relative h-svh overflow-hidden">
      <Field progress={progress} />

      <div className="absolute inset-0 z-[1]">
        {shots.map((shot, i) => (
          <ShotMedia
            key={shot.file}
            index={i}
            src={shot.file}
            srcMobile={shot.fileMobile}
            still={shot.file.replace("/film/", "").replace(".webp", "")}
            label={shot.kicker[lang]}
          />
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 z-[2] film-veil bg-[linear-gradient(180deg,rgba(6,4,10,0.12)_0%,rgba(6,4,10,0.08)_38%,rgba(6,4,10,0.78)_100%)]" />

      <div
        data-hint
        className="scroll-hint"
      >
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

      {shots.map((shot, i) => {
        const isApps = shot.file === "/film/06.webp";
        const isClose = shot.file === "/film/08.webp";
        const isOpen = shot.file === "/film/01.webp";
        const isCentered = shot.file === "/film/05.webp" || shot.file === "/film/04.webp";
        const copyTop = shot.file === "/film/05.webp";
        return (
        <div
          key={shot.file}
          data-copy={i}
          id={i === 1 ? "services" : i === shots.length - 1 ? "contact-film" : undefined}
          className={
            isOpen
              ? "film-copy film-copy--open film-copy--bottom absolute inset-0 z-10 flex flex-col justify-end px-5 pb-24 md:px-16 md:pb-28"
              : isCentered
              ? `film-copy film-copy--center ${copyTop ? "film-copy--top" : "film-copy--bottom"} absolute inset-0 z-10 flex flex-col items-center justify-end px-5 pb-28 text-center md:px-16 md:pb-32`
              : isApps
              ? `film-copy film-copy--apps ${copyTop ? "film-copy--top" : "film-copy--bottom"} absolute inset-0 z-10 flex flex-col justify-end pb-28 md:pb-32`
              : isClose
              ? `film-copy film-copy--close ${copyTop ? "film-copy--top" : "film-copy--bottom"} absolute inset-0 z-10 flex flex-col justify-end px-5 pb-28 md:px-16 md:pb-32`
              : `film-copy ${copyTop ? "film-copy--top" : "film-copy--bottom"} absolute inset-0 z-10 flex flex-col justify-end px-5 pb-28 md:px-16 md:pb-32`
          }
        >
          <div
            className={
              isOpen
                ? "film-copy-inner film-copy-inner--open"
                : isCentered
                ? "film-copy-inner film-copy-inner--center mx-auto flex max-w-3xl flex-col items-center"
                : isApps
                ? "film-copy-inner film-copy-inner--apps ms-auto w-[min(20rem,58vw)] px-5 pe-20 md:pe-24"
                : isClose
                ? "film-copy-inner flex w-fit flex-col items-start"
                : "film-copy-inner"
            }
          >
            {shot.kicker[lang] ? (
              <p className="text-[12px] font-medium tracking-[0.28em] text-brand-hot uppercase">
                {shot.kicker[lang]}
              </p>
            ) : null}
            <h2
              className={`film-title mt-4 font-semibold tracking-tight leading-[1.06] text-[clamp(1.8rem,5vw,3.4rem)] ${
                isCentered
                  ? "film-title--center whitespace-nowrap"
                  : isClose
                  ? "whitespace-pre-line"
                  : "max-w-sm whitespace-pre-line"
              }`}
            >
              {shot.title[lang]}
            </h2>
            {shot.line ? (
              <p className="film-line mt-5 max-w-sm text-base leading-8 text-muted md:text-lg">
                {shot.line[lang]}
              </p>
            ) : null}
            {i === shots.length - 1 ? (
              <div className="film-talk mt-6">
                <TalkButton href="#contact" className="hud-talk-film" />
              </div>
            ) : null}
          </div>
        </div>
        );
      })}
    </section>
  );
}
