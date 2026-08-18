"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Field } from "@/components/canvas/field";
import { useI18n } from "@/components/providers/i18n-provider";
import { posts } from "@/lib/blog";

export function BlogContent() {
  const { lang, t } = useI18n();
  const [chars, setChars] = useState(0);
  const [done, setDone] = useState(false);
  const lead = t.blogLead;

  useEffect(() => {
    setChars(0);
    setDone(false);
  }, [lang, lead]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setChars(lead.length);
      setDone(true);
      return;
    }
    if (chars >= lead.length) {
      setDone(true);
      return;
    }
    const id = window.setTimeout(() => setChars((v) => v + 1), lead[chars] === " " ? 16 : 22);
    return () => window.clearTimeout(id);
  }, [chars, lead]);

  function skip() {
    setChars(lead.length);
    setDone(true);
  }

  return (
    <main className="relative min-h-svh" onClick={skip}>
        <div className="pointer-events-none fixed inset-0 z-0">
          <Field />
        </div>
        <div className="pointer-events-none fixed inset-0 z-[1] bg-[linear-gradient(180deg,rgba(6,4,10,0.22)_0%,rgba(6,4,10,0.14)_42%,rgba(6,4,10,0.88)_100%)]" />
        <div className="relative z-10 mx-auto flex min-h-svh max-w-6xl flex-col items-center px-5 pb-28 pt-36 text-center md:px-10 md:pt-40">
          <h1 className="about-type-title">{t.blogTitle}</h1>
          <p className="blog-lead">
            {lead.slice(0, chars)}
            {!done ? <span className="about-caret" aria-hidden /> : null}
          </p>
          <ul className="blog-grid">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="blog-card" onClick={(e) => e.stopPropagation()}>
                  <span className="blog-card-media">
                    <Image
                      src={post.image}
                      alt={post.imageAlt[lang]}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </span>
                  <span className="blog-card-body">
                    <span className="blog-card-meta">
                      {post.n} · {post.minutes} {t.blogRead}
                    </span>
                    <span className="blog-card-title">{post.title[lang]}</span>
                    <span className="blog-card-excerpt">{post.excerpt[lang]}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
    </main>
  );
}
