"use client";

import Link from "next/link";
import { Field } from "@/components/canvas/field";
import { TalkButton } from "@/components/layout/talk-button";
import { useI18n } from "@/components/providers/i18n-provider";

export function AboutContent() {
  const { t } = useI18n();

  return (
    <main className="relative min-h-svh">
      <div className="pointer-events-none fixed inset-0 z-0">
        <Field />
      </div>
      <div className="pointer-events-none fixed inset-0 z-[1] bg-[linear-gradient(180deg,rgba(6,4,10,0.22)_0%,rgba(6,4,10,0.18)_40%,rgba(6,4,10,0.86)_100%)]" />
      <div className="about-page relative z-10 mx-auto flex min-h-svh max-w-4xl flex-col items-center justify-center px-5 py-36 text-center md:px-10">
        <div className="about-type">
          <p className="about-type-kicker">{t.aboutKicker}</p>
          <h1 className="about-type-title">{t.aboutTitle}</h1>
          {t.aboutParas.map((text) => (
            <p key={text.slice(0, 40)} className="about-type-p">
              {text}
            </p>
          ))}
          <p className="about-type-cta">{t.aboutCta}</p>
          {t.aboutPlaces.map((text) => (
            <p key={text} className="about-type-place">
              {text}
            </p>
          ))}
        </div>
        <div className="about-type-action">
          <TalkButton href="/#contact" className="hud-talk-film" />
          <nav className="about-type-links">
            <Link href="/projects">{t.projectsTitle}</Link>
            <Link href="/blog">{t.blogTitle}</Link>
          </nav>
        </div>
      </div>
    </main>
  );
}
