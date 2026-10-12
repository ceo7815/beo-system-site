"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { setLenis, scrollToId, emitLenisScroll } from "@/lib/lenis";
import { isMotionOff } from "@/lib/a11y";

/**
 * Same Lenis feel as the homepage scroller, driven by requestAnimationFrame
 * instead of GSAP. Pages that pin with ScrollTrigger keep the GSAP scroller.
 */
export function SmoothScrollLite({ children }: { children: ReactNode }) {
  useEffect(() => {
    let stop: (() => void) | undefined;

    const boot = () => {
      stop?.();
      stop = undefined;
      if (isMotionOff()) {
        if (window.location.hash === "#contact") {
          requestAnimationFrame(() => scrollToId("contact"));
        }
        return;
      }

      const lenis = new Lenis({
        duration: 1.1,
        smoothWheel: true,
      });
      setLenis(lenis);
      lenis.on("scroll", () => {
        emitLenisScroll();
      });

      let frame = 0;
      const loop = (time: number) => {
        lenis.raf(time);
        frame = window.requestAnimationFrame(loop);
      };
      frame = window.requestAnimationFrame(loop);

      const goHash = () => {
        if (window.location.hash === "#contact") {
          window.setTimeout(() => scrollToId("contact"), 160);
        }
      };
      window.addEventListener("hashchange", goHash);
      if (window.location.hash === "#contact") {
        window.setTimeout(goHash, 80);
      }

      stop = () => {
        window.removeEventListener("hashchange", goHash);
        window.cancelAnimationFrame(frame);
        setLenis(null);
        lenis.destroy();
      };
    };

    boot();
    window.addEventListener("beo-a11y", boot);
    return () => {
      window.removeEventListener("beo-a11y", boot);
      stop?.();
    };
  }, []);

  return children;
}
