import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function registerGsap() {
  if (registered || typeof window === "undefined") return gsap;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
  return gsap;
}

export const EASE = {
  out: "power3.out",
  inOut: "power2.inOut",
  expo: "expo.out",
} as const;

/** True when the visitor asked for reduced motion. */
export function reducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

type RevealOptions = {
  y?: number;
  stagger?: number;
  start?: string;
  duration?: number;
};

/**
 * Scroll-triggered reveal for `.reveal` elements inside a container.
 * Returns a cleanup function for use in useEffect.
 */
export function revealChildren(
  container: HTMLElement | null,
  { y = 24, stagger = 0.08, start = "top 82%", duration = 0.8 }: RevealOptions = {},
) {
  if (!container) return () => {};
  const targets = container.querySelectorAll<HTMLElement>(".reveal");
  if (!targets.length) return () => {};

  if (reducedMotion()) {
    gsap.set(targets, { opacity: 1, y: 0 });
    return () => {};
  }

  const g = registerGsap();
  const ctx = g.context(() => {
    g.fromTo(
      targets,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        ease: EASE.out,
        scrollTrigger: { trigger: container, start },
      },
    );
  }, container);

  return () => ctx.revert();
}
