"use client";

import type { JSX } from "react";
import { site } from "@/lib/site";
import { AccessMark } from "@/components/layout/a11y-widget";
import { useA11y } from "@/components/providers/a11y-provider";
import { useI18n } from "@/components/providers/i18n-provider";

const tiktokPath =
  "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z";

function InstagramMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <defs>
        <linearGradient id="ig-brand" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#f58529" />
          <stop offset="45%" stopColor="#dd2a7b" />
          <stop offset="100%" stopColor="#515bd4" />
        </linearGradient>
      </defs>
      <rect
        className="ig-stroke"
        x="3.2"
        y="3.2"
        width="17.6"
        height="17.6"
        rx="5.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle
        className="ig-stroke"
        cx="12"
        cy="12"
        r="4.15"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle className="ig-dot" cx="17.15" cy="6.85" r="1.15" fill="currentColor" />
    </svg>
  );
}

function TikTokMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="tiktok-mark">
      <path className="tiktok-cyan" d={tiktokPath} />
      <path className="tiktok-red" d={tiktokPath} />
      <path className="tiktok-main" d={tiktokPath} />
    </svg>
  );
}

function FacebookMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M13.6 20.7v-7.2h2.42l.36-2.8h-2.78V8.9c0-.81.22-1.36 1.39-1.36H16.5V5.03A18.4 18.4 0 0 0 14.2 4.8c-2.3 0-3.87 1.4-3.87 3.98v2.22H8v2.8h2.33v7.2h3.27Z"
      />
    </svg>
  );
}

const links: {
  href: string;
  label: string;
  Icon: () => JSX.Element;
  kind: "ig" | "tt" | "fb";
}[] = [
  { href: site.social.instagram, label: "Instagram", Icon: InstagramMark, kind: "ig" },
  { href: site.social.tiktok, label: "TikTok", Icon: TikTokMark, kind: "tt" },
  { href: site.social.facebook, label: "Facebook", Icon: FacebookMark, kind: "fb" },
];

export function SocialRail() {
  const { lang } = useI18n();
  const { open, setOpen } = useA11y();
  const a11yLabel = lang === "he" ? "תפריט נגישות" : "Accessibility menu";

  return (
    <nav className="social-rail pointer-events-auto" aria-label="Social">
      <span className="social-pulse" aria-hidden />
      <button
        type="button"
        className={`social-node social-node--a11y${open ? " is-on" : ""}`}
        aria-label={a11yLabel}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="hud-btn-scan" aria-hidden />
        <AccessMark />
      </button>
      {links.map(({ href, label, Icon, kind }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          className={`social-node social-node--${kind}`}
          aria-label={label}
        >
          <span className="hud-btn-scan" aria-hidden />
          <Icon />
        </a>
      ))}
    </nav>
  );
}
