"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { getScrollProgress, onLenisScroll } from "@/lib/lenis";

export function ScrollProgress() {
  const y = useRef<HTMLDivElement>(null);
  const x = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const apply = () => {
      const p = getScrollProgress();
      if (y.current) y.current.style.transform = `scaleY(${p})`;
      if (x.current) x.current.style.transform = `scaleX(${p})`;
    };
    apply();
    const off = onLenisScroll(apply);
    window.addEventListener("scroll", apply, { passive: true });
    window.addEventListener("resize", apply);
    const id = window.setTimeout(apply, 80);
    return () => {
      off();
      window.clearTimeout(id);
      window.removeEventListener("scroll", apply);
      window.removeEventListener("resize", apply);
    };
  }, [pathname]);

  return (
    <div className="scroll-progress" aria-hidden>
      <div ref={y} className="scroll-progress-y" />
      <div ref={x} className="scroll-progress-x" />
    </div>
  );
}
