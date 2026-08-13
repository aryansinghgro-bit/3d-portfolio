import { useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerGsap, reducedMotion } from "@/lib/animations";

/**
 * Lenis smooth scrolling wired into GSAP ScrollTrigger.
 * Manual scrolling only — no automatic scrolling.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (reducedMotion()) return;

    registerGsap();

    const lenis = new Lenis({
      duration: 0.7,
      smoothWheel: true,
      touchMultiplier: 1.8,
    });

    lenis.on("scroll", ScrollTrigger.update);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).__lenis = lenis;

    // Drive Lenis from GSAP's ticker
    const gsapCore = registerGsap();

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsapCore.ticker.add(tick);
    gsapCore.ticker.lagSmoothing(0);

    return () => {
      gsapCore.ticker.remove(tick);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (window as any).__lenis;

      lenis.destroy();
    };
  }, []);

  return null;
}

/**
 * Smoothly scrolls to a hash target, using Lenis when available.
 */
export function scrollToSection(hash: string) {
  const el = document.querySelector(hash);

  if (!el) return;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lenis = (window as any).__lenis;

  if (lenis) {
    lenis.scrollTo(el as HTMLElement, {
      offset: 100,
      duration: 0.8,
    });
  } else {
    (el as HTMLElement).scrollIntoView({
      behavior: reducedMotion() ? "auto" : "smooth",
      block: "start",
    });
  }
}