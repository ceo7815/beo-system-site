"use client";

import Image from "next/image";
import Link from "next/link";
import { Field } from "@/components/canvas/field";
import { TalkButton } from "@/components/layout/talk-button";
import { useI18n } from "@/components/providers/i18n-provider";
import { getPost, getRelated } from "@/lib/blog";

export function ArticleContent({ slug }: { slug: string }) {
  const { lang, t } = useI18n();
  const post = getPost(slug);
  if (!post) return null;
  const related = getRelated(slug);
  const date = formatDate(post.date, lang);

  return (
    <main className="relative min-h-svh">
        <div className="pointer-events-none fixed inset-0 z-0">
          <Field />
        </div>
        <div className="pointer-events-none fixed inset-0 z-[1] bg-[linear-gradient(180deg,rgba(6,4,10,0.28)_0%,rgba(6,4,10,0.55)_48%,rgba(6,4,10,0.94)_100%)]" />
        <article className="relative z-10 mx-auto w-full max-w-[46rem] px-5 pb-24 pt-36 md:px-8 md:pt-40">
          <Link href="/blog" className="blog-back">
            {t.blogBack}
          </Link>
          <p className="mt-8 text-[12px] tracking-[0.28em] text-brand-hot uppercase">
            {post.n} · {date} · {post.minutes} {t.blogRead}
          </p>
          <h1 className="blog-article-title">{post.title[lang]}</h1>
          <p className="blog-article-lead">{post.excerpt[lang]}</p>
          <figure className="blog-article-hero">
            <Image
              src={post.image}
              alt={post.imageAlt[lang]}
              width={1600}
              height={900}
              priority
              className="h-full w-full object-cover"
            />
          </figure>
          <div className="blog-prose">
            {post.body[lang].map((block, i) =>
              block.type === "h2" ? (
                <h2 key={i}>{block.text}</h2>
              ) : (
                <p key={i}>{block.text}</p>
              ),
            )}
          </div>
          <div className="film-talk mt-12">
            <TalkButton href="/#contact" className="hud-talk-film" />
          </div>
        </article>
        {related.length ? (
          <section className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-28 md:px-10">
            <h2 className="text-center text-[12px] tracking-[0.28em] text-brand-hot uppercase">
              {t.blogMore}
            </h2>
            <ul className="blog-grid blog-grid-related mt-8">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link href={`/blog/${item.slug}`} className="blog-card">
                    <span className="blog-card-media">
                      <Image
                        src={item.image}
                        alt={item.imageAlt[lang]}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                    </span>
                    <span className="blog-card-body">
                      <span className="blog-card-meta">
                        {item.n} · {item.minutes} {t.blogRead}
                      </span>
                      <span className="blog-card-title">{item.title[lang]}</span>
                      <span className="blog-card-excerpt">{item.excerpt[lang]}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
    </main>
  );
}

function formatDate(iso: string, lang: "he" | "en") {
  return new Intl.DateTimeFormat(lang === "he" ? "he-IL" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${iso}T00:00:00`));
}

