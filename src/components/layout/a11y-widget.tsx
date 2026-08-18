"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useA11y } from "@/components/providers/a11y-provider";
import { useI18n } from "@/components/providers/i18n-provider";
import { a11yDefaults, type A11yState } from "@/lib/a11y";

const copy = {
  he: {
    open: "תפריט נגישות",
    close: "סגירת תפריט נגישות",
    title: "נגישות",
    lead: "התאמות אישיות לאתר. נשמרות במכשיר.",
    bigger: "הגדלת טקסט",
    smaller: "הקטנת טקסט",
    readable: "גופן קריא",
    line: "ריווח שורות",
    space: "ריווח אותיות",
    high: "ניגודיות גבוהה",
    light: "ניגודיות בהירה",
    invert: "היפוך צבעים",
    gray: "גווני אפור",
    sat: "הפחתת רוויה",
    links: "הדגשת קישורים",
    heads: "הדגשת כותרות",
    images: "הסתרת תמונות",
    motion: "עצירת אנימציה",
    cursor: "סמן גדול",
    guide: "מדריך קריאה",
    mask: "מסכת קריאה",
    focus: "פוקוס מוגבר",
    reset: "איפוס הכל",
    statement: "הצהרת נגישות",
    skip: "דילוג לתוכן",
    fab: "נגישות",
  },
  en: {
    open: "Accessibility menu",
    close: "Close accessibility menu",
    title: "Accessibility",
    lead: "Personal site adjustments. Saved on this device.",
    bigger: "Larger text",
    smaller: "Smaller text",
    readable: "Readable font",
    line: "Line spacing",
    space: "Letter spacing",
    high: "High contrast",
    light: "Light contrast",
    invert: "Invert colors",
    gray: "Grayscale",
    sat: "Low saturation",
    links: "Highlight links",
    heads: "Highlight headings",
    images: "Hide images",
    motion: "Stop animation",
    cursor: "Big cursor",
    guide: "Reading guide",
    mask: "Reading mask",
    focus: "Strong focus",
    reset: "Reset all",
    statement: "Accessibility statement",
    skip: "Skip to content",
    fab: "Accessibility",
  },
} as const;

export function A11ySkip() {
  const { lang } = useI18n();
  return (
    <a className="a11y-skip" href="#main-content">
      {copy[lang].skip}
    </a>
  );
}

export function A11yWidget() {
  const { lang } = useI18n();
  const t = copy[lang];
  const { state, setState, reset, open, setOpen } = useA11y();
  const [pointer, setPointer] = useState({ y: 0 });

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!state.guide && !state.mask) return;
    const move = (e: PointerEvent) => setPointer({ y: e.clientY });
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [state.guide, state.mask]);

  function toggle<K extends keyof A11yState>(key: K, value?: A11yState[K]) {
    setState((prev) => ({
      ...prev,
      [key]: value !== undefined ? value : !prev[key],
    }));
  }

  function cycleContrast(mode: A11yState["contrast"]) {
    setState((prev) => ({
      ...prev,
      contrast: prev.contrast === mode ? "off" : mode,
    }));
  }

  const actions = [
    {
      id: "bigger",
      label: t.bigger,
      on: state.text > 0,
      run: () => setState((p) => ({ ...p, text: Math.min(4, p.text + 1) })),
    },
    {
      id: "smaller",
      label: t.smaller,
      on: false,
      run: () => setState((p) => ({ ...p, text: Math.max(0, p.text - 1) })),
    },
    { id: "readable", label: t.readable, on: state.readable, run: () => toggle("readable") },
    {
      id: "line",
      label: t.line,
      on: state.line > 0,
      run: () => setState((p) => ({ ...p, line: p.line >= 2 ? 0 : p.line + 1 })),
    },
    {
      id: "space",
      label: t.space,
      on: state.space > 0,
      run: () => setState((p) => ({ ...p, space: p.space >= 2 ? 0 : p.space + 1 })),
    },
    {
      id: "high",
      label: t.high,
      on: state.contrast === "high",
      run: () => cycleContrast("high"),
    },
    {
      id: "light",
      label: t.light,
      on: state.contrast === "light",
      run: () => cycleContrast("light"),
    },
    {
      id: "invert",
      label: t.invert,
      on: state.contrast === "invert",
      run: () => cycleContrast("invert"),
    },
    { id: "gray", label: t.gray, on: state.gray, run: () => toggle("gray") },
    { id: "sat", label: t.sat, on: state.desaturate, run: () => toggle("desaturate") },
    { id: "links", label: t.links, on: state.links, run: () => toggle("links") },
    { id: "heads", label: t.heads, on: state.heads, run: () => toggle("heads") },
    { id: "images", label: t.images, on: state.hideImages, run: () => toggle("hideImages") },
    { id: "motion", label: t.motion, on: state.motion, run: () => toggle("motion") },
    { id: "cursor", label: t.cursor, on: state.cursor, run: () => toggle("cursor") },
    { id: "guide", label: t.guide, on: state.guide, run: () => toggle("guide") },
    { id: "mask", label: t.mask, on: state.mask, run: () => toggle("mask") },
    { id: "focus", label: t.focus, on: state.focus, run: () => toggle("focus") },
  ];

  const dirty = JSON.stringify(state) !== JSON.stringify(a11yDefaults);

  return (
    <>
      {state.guide ? (
        <div className="a11y-guide" style={{ top: pointer.y }} aria-hidden />
      ) : null}
      {state.mask ? (
        <>
          <div className="a11y-mask a11y-mask-top" style={{ height: Math.max(0, pointer.y - 56) }} aria-hidden />
          <div className="a11y-mask a11y-mask-bot" style={{ top: pointer.y + 56 }} aria-hidden />
        </>
      ) : null}

      <div className={`a11y-dock${open ? " is-open" : ""}`}>
        {open ? (
          <div
            className="a11y-panel"
            dir={lang === "he" ? "rtl" : "ltr"}
            role="dialog"
            aria-modal="true"
            aria-labelledby="a11y-title"
          >
            <div className="a11y-panel-head">
              <p id="a11y-title" className="a11y-panel-title">
                {t.title}
              </p>
              <p className="a11y-panel-lead">{t.lead}</p>
            </div>
            <div className="a11y-grid">
              {actions.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`a11y-chip${item.on ? " is-on" : ""}`}
                  aria-pressed={item.on}
                  onClick={item.run}
                >
                  <A11yIcon name={item.id} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
            <div className="a11y-panel-foot">
              <button type="button" className="a11y-reset" onClick={reset} disabled={!dirty}>
                {t.reset}
              </button>
              <Link href="/accessibility" className="a11y-statement" onClick={() => setOpen(false)}>
                {t.statement}
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export function AccessMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden fill="none">
      <circle cx="14.25" cy="4.35" r="2.05" fill="currentColor" />
      <path
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.4 9.6h8.3M13.2 9.6 11.7 14H8.3M13.2 9.6l1.15 3.4H17.4M12.35 14.1 14 18.4"
      />
      <circle cx="8.6" cy="17.7" r="3.15" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function A11yIcon({ name }: { name: string }) {
  const common = { viewBox: "0 0 24 24", "aria-hidden": true as const };
  switch (name) {
    case "bigger":
      return (
        <svg {...common}>
          <path fill="currentColor" d="M4 18h3.1l1.1-3h5.5l1.1 3H18L13.2 6h-2.4L4 18Zm5.1-5 2-5.4 2 5.4H9.1ZM19 8h-2V6h-2v2h-2v2h2v2h2v-2h2V8Z" />
        </svg>
      );
    case "smaller":
      return (
        <svg {...common}>
          <path fill="currentColor" d="M4 18h3.1l1.1-3h5.5l1.1 3H18L13.2 6h-2.4L4 18Zm5.1-5 2-5.4 2 5.4H9.1ZM15 9h6v2h-6V9Z" />
        </svg>
      );
    case "readable":
      return (
        <svg {...common}>
          <path fill="currentColor" d="M4 5h7.2v2H6v10h5.2v2H4V5Zm8.8 0H20v14h-7.2v-2H18V7h-5.2V5Z" />
        </svg>
      );
    case "line":
      return (
        <svg {...common}>
          <path fill="currentColor" d="M4 6h16v2H4V6Zm0 5h16v2H4v-2Zm0 5h16v2H4v-2Z" />
        </svg>
      );
    case "space":
      return (
        <svg {...common}>
          <path fill="currentColor" d="M5 7h2v10H5V7Zm12 0h2v10h-2V7ZM9 11h6v2H9v-2Z" />
        </svg>
      );
    case "high":
      return (
        <svg {...common}>
          <path fill="currentColor" d="M12 3 4 19h3.2l1.5-3.4h6.6L16.8 19H20L12 3Zm0 5.4 2.1 4.7H9.9L12 8.4Z" />
        </svg>
      );
    case "light":
      return (
        <svg {...common}>
          <path fill="currentColor" d="M12 5.5a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13Zm0 2.2a4.3 4.3 0 1 0 0 8.6 4.3 4.3 0 0 0 0-8.6ZM11 1h2v3h-2V1Zm0 19h2v3h-2v-3ZM1 11h3v2H1v-2Zm19 0h3v2h-3v-2Z" />
        </svg>
      );
    case "invert":
      return (
        <svg {...common}>
          <path fill="currentColor" d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 2v14a7 7 0 0 1 0-14Z" />
        </svg>
      );
    case "gray":
      return (
        <svg {...common}>
          <path fill="currentColor" d="M4 6h16v12H4V6Zm2 2v8h12V8H6Z" />
        </svg>
      );
    case "sat":
      return (
        <svg {...common}>
          <path fill="currentColor" d="M12 3.5c4.4 3.6 7 6.8 7 10.2A7 7 0 1 1 5 13.7C5 10.3 7.6 7.1 12 3.5Zm0 3.2C8.9 9.3 7 11.6 7 13.7a5 5 0 1 0 10 0c0-2.1-1.9-4.4-5-6.99Z" />
        </svg>
      );
    case "links":
      return (
        <svg {...common}>
          <path fill="currentColor" d="M10.5 13.5a4 4 0 0 1 0-5.7l2.1-2.1a4 4 0 1 1 5.7 5.7l-1.2 1.2-1.4-1.4 1.2-1.2a2 2 0 1 0-2.8-2.8l-2.1 2.1a2 2 0 0 0 0 2.8l.7.7-1.5 1.5-.7-.7Zm3-3a4 4 0 0 1 0 5.7l-2.1 2.1a4 4 0 1 1-5.7-5.7l1.2-1.2 1.4 1.4-1.2 1.2a2 2 0 1 0 2.8 2.8l2.1-2.1a2 2 0 0 0 0-2.8l-.7-.7 1.5-1.5.7.7Z" />
        </svg>
      );
    case "heads":
      return (
        <svg {...common}>
          <path fill="currentColor" d="M4 5h16v3H4V5Zm0 6h12v2.5H4V11Zm0 5.5h9V19H4v-2.5Z" />
        </svg>
      );
    case "images":
      return (
        <svg {...common}>
          <path fill="currentColor" d="M4 5h16v14H4V5Zm2 2v10h12V7H6Zm2.2 7.3 2.3-2.8 1.8 2.1 2.4-3.1 3.1 3.8H8.2ZM9 9.2a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z" />
        </svg>
      );
    case "motion":
      return (
        <svg {...common}>
          <path fill="currentColor" d="M8 6.5v11L18.5 12 8 6.5Zm2 3.4L14.4 12 10 14.1V9.9Z" />
        </svg>
      );
    case "cursor":
      return (
        <svg {...common}>
          <path fill="currentColor" d="M5 3.8 18.2 13.4h-6.1l4.2 7.3-2.2 1.3-4.3-7.4-4.8 4.3V3.8Z" />
        </svg>
      );
    case "guide":
      return (
        <svg {...common}>
          <path fill="currentColor" d="M3 11h18v2H3v-2Z" />
        </svg>
      );
    case "mask":
      return (
        <svg {...common}>
          <path fill="currentColor" d="M4 4h16v4H4V4Zm0 12h16v4H4v-4Zm0-6h16v4H4v-4Z" opacity=".45" />
          <path fill="currentColor" d="M4 10h16v4H4v-4Z" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path fill="currentColor" d="M12 3.5A8.5 8.5 0 1 1 3.5 12 8.5 8.5 0 0 1 12 3.5Zm0 2A6.5 6.5 0 1 0 18.5 12 6.5 6.5 0 0 0 12 5.5Zm-.9 3h1.8v2.2h2.2v1.8h-2.2V15h-1.8v-2.5H8.9v-1.8h2.2V8.5Z" />
        </svg>
      );
  }
}
