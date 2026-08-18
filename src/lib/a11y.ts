export const A11Y_KEY = "beo-a11y";

export type A11yState = {
  text: number;
  readable: boolean;
  line: number;
  space: number;
  contrast: "off" | "high" | "light" | "invert";
  gray: boolean;
  desaturate: boolean;
  links: boolean;
  heads: boolean;
  hideImages: boolean;
  motion: boolean;
  cursor: boolean;
  guide: boolean;
  mask: boolean;
  focus: boolean;
};

export const a11yDefaults: A11yState = {
  text: 0,
  readable: false,
  line: 0,
  space: 0,
  contrast: "off",
  gray: false,
  desaturate: false,
  links: false,
  heads: false,
  hideImages: false,
  motion: false,
  cursor: false,
  guide: false,
  mask: false,
  focus: false,
};

export function loadA11y(): A11yState {
  try {
    const raw = window.localStorage.getItem(A11Y_KEY);
    if (!raw) return { ...a11yDefaults };
    return { ...a11yDefaults, ...JSON.parse(raw) };
  } catch {
    return { ...a11yDefaults };
  }
}

import { cookieAllowed } from "@/lib/cookies";

export function saveA11y(state: A11yState) {
  if (!cookieAllowed("preferences")) return;
  window.localStorage.setItem(A11Y_KEY, JSON.stringify(state));
}

export function isMotionOff() {
  if (typeof document === "undefined") return false;
  return (
    document.documentElement.dataset.a11yMotion === "off" ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function emitA11yChange() {
  window.dispatchEvent(new Event("beo-a11y"));
}

export function applyA11y(state: A11yState) {
  const html = document.documentElement;
  const set = (key: string, on: string | false) => {
    if (on) html.setAttribute(key, on);
    else html.removeAttribute(key);
  };

  set("data-a11y-text", state.text ? String(state.text) : false);
  set("data-a11y-font", state.readable ? "readable" : false);
  set("data-a11y-line", state.line ? String(state.line) : false);
  set("data-a11y-space", state.space ? String(state.space) : false);
  set("data-a11y-contrast", state.contrast === "off" ? false : state.contrast);
  set("data-a11y-gray", state.gray ? "on" : false);
  set("data-a11y-sat", state.desaturate ? "low" : false);
  set("data-a11y-links", state.links ? "on" : false);
  set("data-a11y-heads", state.heads ? "on" : false);
  set("data-a11y-images", state.hideImages ? "hide" : false);
  set("data-a11y-motion", state.motion ? "off" : false);
  set("data-a11y-cursor", state.cursor ? "big" : false);
  set("data-a11y-guide", state.guide ? "on" : false);
  set("data-a11y-mask", state.mask ? "on" : false);
  set("data-a11y-focus", state.focus ? "on" : false);

  const filters: string[] = [];
  if (state.contrast === "invert" || state.contrast === "light") {
    filters.push("invert(1)", "hue-rotate(180deg)");
  }
  if (state.contrast === "high") filters.push("contrast(1.65)", "brightness(1.08)");
  if (state.contrast === "light") filters.push("contrast(1.08)");
  if (state.gray) filters.push("grayscale(1)");
  if (state.desaturate) filters.push("saturate(0.28)");
  html.style.filter = "";
  const root = document.querySelector<HTMLElement>(".site-root");
  if (root) root.style.filter = filters.join(" ");

  saveA11y(state);
  emitA11yChange();
}
