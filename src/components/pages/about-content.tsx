"use client";

import Link from "next/link";
import { Field } from "@/components/canvas/field";
import { TalkButton } from "@/components/layout/talk-button";
import { useI18n } from "@/components/providers/i18n-provider";
import { aboutFaq, whatsappUrl } from "@/lib/site";

export function AboutContent() {
  const { lang, t } = useI18n();
  const faq = aboutFaq[lang];
  const he = lang === "he";
  const waText = he
    ? "היי, הגעתי מדף ״מי אנחנו״. אשמח לשמוע איך ביו סיסטם יכולה לעזור לעסק שלי"
    : "Hi, I came from your About page. I'd like to hear how Beo System can help my business";
  const serviceLinks = he
    ? [
        { href: "/blog/whatsapp-ai-agent", label: "בוט לוואטסאפ לעסק" },
        { href: "/blog/inquiry-management", label: "מערכת לניהול פניות" },
        { href: "/blog/voice-ai-phone-agent", label: "סוכן AI טלפוני" },
        { href: "/blog/ai-automation-start", label: "אוטומציה לעסק" },
        { href: "/blog/ai-agent-custom-system-cost", label: "כמה עולה סוכן AI" },
        { href: "/projects", label: "פרויקטים" },
      ]
    : [
        { href: "/blog/whatsapp-ai-agent", label: "WhatsApp bot for business" },
        { href: "/blog/inquiry-management", label: "Inquiry management system" },
        { href: "/blog/voice-ai-phone-agent", label: "AI phone agent" },
        { href: "/blog/ai-automation-start", label: "Business automation" },
        { href: "/blog/ai-agent-custom-system-cost", label: "What an AI agent costs" },
        { href: "/projects", label: "Projects" },
      ];

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
            <Link href="/projects" prefetch={false}>{t.projectsTitle}</Link>
            <Link href="/blog">{t.blogTitle}</Link>
            <Link href="/blog/whatsapp-ai-agent" prefetch={false}>
              {lang === "he" ? "בוט לוואטסאפ לעסק" : "WhatsApp bot for business"}
            </Link>
            <Link href="/blog/ai-automation-start" prefetch={false}>
              {lang === "he" ? "אוטומציה לעסק" : "Business automation"}
            </Link>
          </nav>
        </div>
        <section id="faq" className="about-faq" aria-labelledby="about-faq-title">
          <h2 id="about-faq-title" className="about-faq-title">
            {he ? "שאלות נפוצות" : "FAQ"}
          </h2>
          <dl className="about-faq-list">
            {faq.map((item) => (
              <div key={item.q} className="about-faq-item">
                <dt>{item.q}</dt>
                <dd>{item.a}</dd>
              </div>
            ))}
          </dl>
          <div className="about-faq-cta">
            <p>{he ? "רוצים לבדוק מה מתאים לעסק שלכם?" : "Want to check what fits your business?"}</p>
            <div className="about-faq-buttons">
              <a href={whatsappUrl(waText)} target="_blank" rel="noopener noreferrer">
                {he ? "דברו איתנו בוואטסאפ" : "Message us on WhatsApp"}
              </a>
              <Link href="/#contact" prefetch={false}>
                {he ? "לטופס יצירת קשר" : "Contact form"}
              </Link>
            </div>
          </div>
          <nav className="about-faq-links" aria-label={he ? "שירותים" : "Services"}>
            {serviceLinks.map((l) => (
              <Link key={l.href} href={l.href} prefetch={false}>
                {l.label}
              </Link>
            ))}
          </nav>
        </section>
      </div>
    </main>
  );
}
