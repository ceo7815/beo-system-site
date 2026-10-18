"use client";

import Link from "next/link";
import { useI18n } from "@/components/providers/i18n-provider";

type Lang = "he" | "en";

const posts: {
  href: string;
  tag: Record<Lang, string>;
  title: Record<Lang, string>;
}[] = [
  {
    href: "/blog/ai-agents",
    tag: { he: "סוכני AI", en: "AI agents" },
    title: {
      he: "סוכן AI לעסק — מה הוא עושה בפועל",
      en: "An AI agent for a business — what it actually does",
    },
  },
  {
    href: "/blog/voice-ai-phone-agent",
    tag: { he: "טלפון", en: "Voice" },
    title: {
      he: "סוכן AI טלפוני — מענה לשיחה ותיאום תור",
      en: "Voice AI phone agent — answers and books",
    },
  },
  {
    href: "/blog/inquiry-management",
    tag: { he: "לידים", en: "Leads" },
    title: {
      he: "מערכת ניהול לידים — כל פנייה עם סטטוס",
      en: "Lead management — every inquiry with a status",
    },
  },
  {
    href: "/blog/ai-agent-custom-system-cost",
    tag: { he: "עלויות", en: "Cost" },
    title: {
      he: "כמה עולה סוכן AI או מערכת בהתאמה?",
      en: "What does an AI agent or custom system cost?",
    },
  },
];

const copy = {
  he: { kicker: "מהבלוג", title: "כדאי לקרוא לפני שבונים", all: "לכל המאמרים" },
  en: { kicker: "From the blog", title: "Worth a read before you build", all: "All articles" },
} as const;

function Arrow() {
  return (
    <svg className="from-blog-arrow" viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M4 10h11m-4.5-4.5L15 10l-4.5 4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FromTheBlog() {
  const { lang } = useI18n();
  const c = copy[lang];
  return (
    <section className="from-blog" aria-labelledby="from-blog-title">
      <div className="from-blog-shell">
        <header className="from-blog-head">
          <div>
            <p className="from-blog-kicker">{c.kicker}</p>
            <h2 id="from-blog-title" className="from-blog-title">
              {c.title}
            </h2>
          </div>
          <Link href="/blog" className="from-blog-all">
            {c.all}
            <Arrow />
          </Link>
        </header>
        <ul className="from-blog-grid">
          {posts.map((post) => (
            <li key={post.href}>
              <Link href={post.href} className="from-blog-card">
                <span className="from-blog-tag">{post.tag[lang]}</span>
                <span className="from-blog-card-title">{post.title[lang]}</span>
                <Arrow />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
