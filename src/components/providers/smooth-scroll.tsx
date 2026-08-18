"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setLenis, scrollToId, emitLenisScroll } from "@/lib/lenis";
import { isMotionOff } from "@/lib/a11y";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();

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
        ScrollTrigger.update();
        emitLenisScroll();
      });
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

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
        gsap.ticker.remove(tick);
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

  useEffect(() => {
    if (pathname !== "/" || window.location.hash !== "#contact") return;
    const id = window.setTimeout(() => scrollToId("contact"), 280);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return children;
}
