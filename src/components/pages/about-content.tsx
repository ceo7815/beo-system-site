"use client";

import { useEffect, useMemo, useState } from "react";
import { Field } from "@/components/canvas/field";
import { TalkButton } from "@/components/layout/talk-button";
import { useI18n } from "@/components/providers/i18n-provider";

type Block = { kind: "p" | "cta" | "place"; text: string };

export function AboutContent() {
  const { lang, t } = useI18n();
  const blocks = useMemo<Block[]>(
    () => [
      ...t.aboutParas.map((text) => ({ kind: "p" as const, text })),
      { kind: "cta", text: t.aboutCta },
      ...t.aboutPlaces.map((text) => ({ kind: "place" as const, text })),
    ],
    [t],
  );

  const [index, setIndex] = useState(0);
  const [chars, setChars] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setIndex(0);
    setChars(0);
    setDone(false);
  }, [lang]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setIndex(blocks.length);
      setDone(true);
      return;
    }

    if (index >= blocks.length) {
      setDone(true);
      return;
    }

    const full = blocks[index].text;
    if (chars >= full.length) {
      const pause = window.setTimeout(() => {
        setIndex((v) => v + 1);
        setChars(0);
      }, blocks[index].kind === "p" && index === 0 ? 220 : 280);
      return () => window.clearTimeout(pause);
    }

    const delay = full[chars] === " " ? 18 : 22;
    const id = window.setTimeout(() => setChars((v) => v + 1), delay);
    return () => window.clearTimeout(id);
  }, [blocks, chars, index]);

  function skip() {
    setIndex(blocks.length);
    setDone(true);
  }

  return (
    <main className="relative min-h-svh" onClick={skip}>
        <div className="pointer-events-none fixed inset-0 z-0">
          <Field />
        </div>
        <div className="pointer-events-none fixed inset-0 z-[1] bg-[linear-gradient(180deg,rgba(6,4,10,0.22)_0%,rgba(6,4,10,0.18)_40%,rgba(6,4,10,0.86)_100%)]" />
        <div className="about-page relative z-10 mx-auto flex min-h-svh max-w-4xl flex-col items-center justify-center px-5 py-36 text-center md:px-10">
          <div className="about-type">
            <h1 className="about-type-title">{t.aboutTitle}</h1>
            {blocks.map((block, i) => {
              if (i > index) return null;
              const shown = i < index || done ? block.text : block.text.slice(0, chars);
              const caret = !done && i === index;
              return (
                <p key={`${block.kind}-${i}`} className={`about-type-${block.kind}`}>
                  {shown}
                  {caret ? <span className="about-caret" aria-hidden /> : null}
                </p>
              );
            })}
          </div>
          {done ? (
            <div className="about-type-action">
              <TalkButton href="/#contact" className="hud-talk-film" />
            </div>
          ) : null}
        </div>
    </main>
  );
}
