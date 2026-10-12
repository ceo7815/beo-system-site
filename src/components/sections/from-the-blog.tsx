"use client";

import { useI18n } from "@/components/providers/i18n-provider";

const links = [
  {
    href: "/blog/ai-agents",
    he: "סוכן AI לעסק — מה הוא עושה בפועל, ומתי כדאי להתחיל",
    en: "An AI agent for a business — what it actually does, and when to start",
  },
  {
    href: "/blog/inquiry-management",
    he: "מערכת ניהול לידים",
    en: "Lead management system",
  },
  {
    href: "/blog/voice-ai-phone-agent",
    he: "סוכן AI טלפוני — מענה לשיחה ותיאום תור, בלי להחליף את הצוות",
    en: "Voice AI phone agent — answer the call and book a slot, without replacing the team",
  },
  {
    href: "/blog/whatsapp-ai-agent",
    he: "בוט לוואטסאפ לעסק",
    en: "WhatsApp bot for business",
  },
  {
    href: "/blog/chatbot-vs-agent",
    he: "צ׳אטבוט מול סוכן AI — מתי מספיק מענה, ומתי צריך פעולה",
    en: "Chatbot vs AI agent — when answers are enough, and when you need action",
  },
  {
    href: "/blog/ai-agent-custom-system-cost",
    he: "כמה עולה סוכן AI או מערכת בהתאמה לעסק? מה קובע את העלות",
    en: "How much does an AI agent or custom system cost? What drives the price",
  },
  {
    href: "/blog/ai-automation-start",
    he: "אוטומציה לעסק",
    en: "Business automation",
  },
] as const;

export function FromTheBlog() {
  const { lang } = useI18n();
  const title = lang === "he" ? "מהבלוג" : "From the blog";
  return (
    <section className="from-blog" aria-label={title}>
      <div className="from-blog-shell">
        <h2>{title}</h2>
        <ul>
          {links.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item[lang]}</a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
