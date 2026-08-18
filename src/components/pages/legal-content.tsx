"use client";

import { Field } from "@/components/canvas/field";
import { useI18n } from "@/components/providers/i18n-provider";
import { legal } from "@/lib/legal";

export function LegalContent({ kind }: { kind: keyof typeof legal }) {
  const { lang, t } = useI18n();
  const doc = legal[kind][lang];
  const date = formatLegalDate(legal[kind].updated, lang);

  return (
    <main className="relative min-h-svh">
        <div className="pointer-events-none fixed inset-0 z-0">
          <Field />
        </div>
        <div className="pointer-events-none fixed inset-0 z-[1] bg-[linear-gradient(180deg,rgba(6,4,10,0.28)_0%,rgba(6,4,10,0.55)_48%,rgba(6,4,10,0.94)_100%)]" />
        <article className="relative z-10 mx-auto w-full max-w-[46rem] px-5 pb-24 pt-36 md:px-8 md:pt-40">
          <p className="text-[12px] tracking-[0.28em] text-brand-hot uppercase">
            {doc.kicker}
          </p>
          <h1 className="blog-article-title">{doc.title}</h1>
          <p className="blog-article-lead">{doc.lead}</p>
          <p className="mb-8 text-[13px] text-muted">
            {t.legalUpdated}: {date}
          </p>
          <div className="blog-prose">
            {doc.body.map((block, i) =>
              block.type === "h2" ? (
                <h2 key={i}>{block.text}</h2>
              ) : (
                <p key={i}>{block.text}</p>
              ),
            )}
          </div>
        </article>
    </main>
  );
}

function formatLegalDate(iso: string, lang: "he" | "en") {
  return new Intl.DateTimeFormat(lang === "he" ? "he-IL" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${iso}T00:00:00`));
}
