"use client";

import Link from "next/link";
import { useI18n } from "@/components/providers/i18n-provider";

type Lang = "he" | "en";

const posts: {
  href: string;
  tag: Record<Lang, string>;
  title: Record<Lang, string>;
  blurb?: Record<Lang, string>;
}[] = [
  {
    href: "/blog/ai-agents",
    tag: { he: "סוכני AI", en: "AI agents" },
    title: {
      he: "סוכן AI לעסק — מה הוא עושה בפועל",
      en: "An AI agent for a business — what it actually does",
    },
    blurb: {
      he: "קורא פנייה, מחליט וכותב למערכת — לא רק עונה יפה בצ׳אט. מתי זה מתאים ואיך מתחילים מתהליך אחד.",
      en: "It reads a request, decides, and writes to a system — not only a pretty chat. When it fits and how to start with one process.",
    },
  },
  {
    href: "/blog/voice-ai-phone-agent",
    tag: { he: "טלפון", en: "Voice" },
    title: {
      he: "סוכן AI טלפוני — מענה לשיחה ותיאום תור",
      en: "Voice AI phone agent — answer the call, book the slot",
    },
  },
  {
    href: "/blog/whatsapp-ai-agent",
    tag: { he: "וואטסאפ", en: "WhatsApp" },
    title: {
      he: "בוט לוואטסאפ לעסק — מענה מיידי וסינון לידים",
      en: "WhatsApp bot for business — instant reply, lead screening",
    },
  },
  {
    href: "/blog/inquiry-management",
    tag: { he: "לידים", en: "Leads" },
    title: {
      he: "מערכת ניהול לידים — כל פנייה עם סטטוס ומעקב",
      en: "Lead management — every inquiry with a status and follow-up",
    },
  },
  {
    href: "/blog/chatbot-vs-agent",
    tag: { he: "השוואה", en: "Compare" },
    title: {
      he: "צ׳אטבוט או סוכן AI — מה ההבדל ומה לבחור",
      en: "Chatbot or AI agent — the difference, and which to pick",
    },
  },
  {
    href: "/blog/ai-agent-custom-system-cost",
    tag: { he: "עלויות", en: "Cost" },
    title: {
      he: "כמה עולה סוכן AI או מערכת בהתאמה?",
      en: "What does an AI agent or custom system cost?",
    },
    blurb: {
      he: "בלי מחירון: הגורמים שקובעים את העלות, איך עובד פרויקט, ואיך מתחילים קטן.",
      en: "No price list: the factors behind the cost, how a project runs, and how to start small.",
    },
  },
  {
    href: "/blog/ai-automation-start",
    tag: { he: "אוטומציה", en: "Automation" },
    title: {
      he: "אוטומציה לעסק — מה לאוטמט קודם",
      en: "Business automation — what to automate first",
    },
  },
];

const copy = {
  he: {
    kicker: "מהבלוג",
    title: "לפני שבונים — כדאי לקרוא.",
    lead: "מדריכים קצרים על סוכני AI, אוטומציה ומערכות לעסק. בלי באזוורדס.",
    read: "לקריאה",
    all: "לכל המאמרים",
  },
  en: {
    kicker: "From the blog",
    title: "Worth a read before you build.",
    lead: "Short guides on AI agents, automation and business systems. No buzzwords.",
    read: "Read",
    all: "All articles",
  },
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
      <div className="from-blog-glow" aria-hidden="true" />
      <div className="from-blog-shell">
        <header className="from-blog-head">
          <div>
            <p className="from-blog-kicker">{c.kicker}</p>
            <h2 id="from-blog-title" className="from-blog-title">
              {c.title}
            </h2>
            <p className="from-blog-lead">{c.lead}</p>
          </div>
          <Link href="/blog" className="from-blog-all">
            {c.all}
            <Arrow />
          </Link>
        </header>
        <ul className="from-blog-grid">
          {posts.map((post, i) => (
            <li key={post.href} className={post.blurb ? "is-wide" : undefined}>
              <Link href={post.href} className="from-blog-card">
                <span className="from-blog-meta">
                  <span className="from-blog-tag">{post.tag[lang]}</span>
                  <span className="from-blog-n">{String(i + 1).padStart(2, "0")}</span>
                </span>
                <span className="from-blog-card-title">{post.title[lang]}</span>
                {post.blurb ? (
                  <span className="from-blog-blurb">{post.blurb[lang]}</span>
                ) : null}
                <span className="from-blog-read">
                  {c.read}
                  <Arrow />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
