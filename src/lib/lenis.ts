import type Lenis from "lenis";

let lenis: Lenis | null = null;
const scrollFns = new Set<() => void>();

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

export function onLenisScroll(fn: () => void) {
  scrollFns.add(fn);
  return () => {
    scrollFns.delete(fn);
  };
}

export function emitLenisScroll() {
  scrollFns.forEach((fn) => fn());
}

export function getScrollProgress() {
  if (lenis) {
    const limit = lenis.limit;
    if (!limit) return 0;
    return Math.min(1, Math.max(0, lenis.scroll / limit));
  }
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (max <= 0) return 0;
  return Math.min(1, Math.max(0, window.scrollY / max));
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + (lenis ? lenis.scroll : window.scrollY);
  if (lenis) lenis.scrollTo(y, { offset: 0 });
  else window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
}
