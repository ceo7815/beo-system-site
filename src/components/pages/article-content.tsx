"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Field } from "@/components/canvas/field";
import { TalkButton } from "@/components/layout/talk-button";
import { ContentImage } from "@/components/media/content-image";
import { useI18n } from "@/components/providers/i18n-provider";
import type { BlogBlock, BlogCard, BlogLang, BlogPost } from "@/lib/blog";

const HERO_SIZES = "(min-width: 768px) 672px, calc(100vw - 2.5rem)";
const RELATED_SIZES = "(min-width: 768px) 380px, calc(100vw - 2.5rem)";

function inlineNodes(text: string) {
  const MD_LINK = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;
  const nodes: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(MD_LINK)) {
    const index = match.index ?? 0;
    if (index > last) nodes.push(text.slice(last, index));
    const label = match[1];
    const href = match[2];
    const internal = href.startsWith("https://beosystem.com");
    const path = internal ? href.replace("https://beosystem.com", "") || "/" : href;
    nodes.push(
      internal ? (
        <Link key={index} href={path}>
          {label}
        </Link>
      ) : (
        <a key={index} href={href} target="_blank" rel="noopener">
          {label}
        </a>
      ),
    );
    last = index + match[0].length;
  }
  if (last === 0) return text;
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function proseBlock(
  block: BlogBlock,
  i: number,
  lang: BlogLang,
  titles: Record<string, { he: string; en: string }>,
) {
  if (block.type === "h2") return <h2 key={i}>{block.text}</h2>;
  const url = block.text.trim();
  if (/^https?:\/\/\S+$/.test(url)) {
    const internal = url.startsWith("https://beosystem.com");
    const path = internal ? url.replace("https://beosystem.com", "") || "/" : url;
    const slug = path.startsWith("/blog/") ? path.slice("/blog/".length) : null;
      const label = slug
      ? (titles[slug]?.[lang] ?? path)
      : url.includes("wa.me/")
        ? lang === "he"
          ? "כתבו לנו בוואטסאפ"
          : "Message us on WhatsApp"
        : path === "/#contact"
          ? lang === "he"
            ? "טופס יצירת קשר"
            : "Contact form"
          : url;
    return (
      <p key={i}>
        {internal ? (
          <Link href={path}>{label}</Link>
        ) : (
          <a href={url} target="_blank" rel="noopener">
            {label}
          </a>
        )}
      </p>
    );
  }
  return <p key={i}>{inlineNodes(block.text)}</p>;
}

export function ArticleContent({
  post,
  related,
  titles,
}: {
  post: BlogPost;
  related: BlogCard[];
  titles: Record<string, { he: string; en: string }>;
}) {
  const { lang, t } = useI18n();
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
            <ContentImage
              src={post.image}
              alt={post.imageAlt[lang]}
              width={1600}
              height={900}
              sizes={HERO_SIZES}
              priority
              className="h-full w-full object-cover"
            />
          </figure>
          <div className="blog-prose">
            {post.body[lang].map((block, i) => proseBlock(block, i, lang, titles))}
          </div>
          <nav className="blog-article-next" aria-label={lang === "he" ? "עמודים נוספים" : "More pages"}>
            <Link href="/projects" prefetch={false}>{t.projectsTitle}</Link>
            <Link href="/about">{t.aboutTitle}</Link>
            <Link href="/#contact" prefetch={false}>{t.talk}</Link>
          </nav>
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
                      <ContentImage
                        src={item.image}
                        alt={item.imageAlt[lang]}
                        fill
                        sizes={RELATED_SIZES}
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

