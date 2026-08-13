import { useEffect, useRef } from "react";
import { ArrowRight, ArrowDown, Download } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroScene } from "@/components/three/HeroScene";
import { ActionButton, ActionLink } from "@/components/ui/ActionButton";
import { profile } from "@/data/portfolio";
import { EASE, reducedMotion, registerGsap } from "@/lib/animations";
import { scrollToSection } from "@/components/SmoothScroll";
import { useHydrated } from "@/hooks/useHydrated";

/** Fixed 3D backdrop that carries across hero → about → skills. */
export function HeroBackdrop() {
  const hydrated = useHydrated();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hydrated || !ref.current || reducedMotion()) return;
    registerGsap();
    const el = ref.current;
    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: () => `${window.innerHeight * 1.8} top`,
      end: () => `${window.innerHeight * 2.6} top`,
      scrub: true,
      onUpdate: (self) => gsap.set(el, { opacity: 1 - self.progress * 0.85 }),
    });
    return () => trigger.kill();
  }, [hydrated]);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 grid-lines opacity-60" />
      <div className="absolute inset-0 accent-glow" />
      {hydrated ? (
        <div className="absolute inset-0 opacity-0 animate-[fade-in_1.2s_ease-out_0.2s_forwards]">
          <HeroScene />
        </div>
      ) : null}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}

export function Hero({ ready }: { ready: boolean }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ready || !rootRef.current) return;
    const targets = rootRef.current.querySelectorAll<HTMLElement>("[data-hero-item]");
    if (reducedMotion()) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }
    const tl = gsap.timeline({ defaults: { ease: EASE.out } });
    tl.fromTo(
      targets,
      { opacity: 0, y: 26 },
      { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 },
    );
    return () => {
      tl.kill();
    };
  }, [ready]);

  return (
    <section
      id="hero"
      ref={rootRef}
      className="relative flex min-h-dvh flex-col justify-center px-6 pt-28 pb-20 sm:px-8 lg:px-12"
    >
      <div className="mx-auto w-full max-w-6xl">
        <p data-hero-item className="eyebrow opacity-0">
          {profile.role}
        </p>

        <h1
          data-hero-item
          className="mt-5 max-w-3xl text-4xl font-bold leading-[1.05] opacity-0 sm:text-6xl lg:text-7xl"
        >
          Hi, I&apos;m <span className="text-gradient">{profile.name}</span>
        </h1>

        <p
          data-hero-item
          className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground opacity-0 sm:text-lg"
        >
          {profile.tagline}
        </p>

        <div data-hero-item className="mt-9 flex flex-wrap items-center gap-3 opacity-0">
          <ActionButton size="lg" onClick={() => scrollToSection("#projects")}>
            View Projects
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </ActionButton>
          <ActionLink
            variant="outline"
            size="lg"
            href={profile.resumePath}
            download
            aria-label="Download resume PDF"
          >
            <Download className="size-4" />
            Download Resume
          </ActionLink>
        </div>

        <dl
          data-hero-item
          className="mt-14 grid max-w-xl grid-cols-2 gap-x-6 gap-y-5 opacity-0 sm:grid-cols-3"
        >
          {[
            { label: "Focus", value: "React · Next.js" },
            { label: "Craft", value: "UI · Motion · 3D" },
            { label: "Status", value: profile.availability },
          ].map((item) => (
            <div key={item.label}>
              <dt className="eyebrow">{item.label}</dt>
              <dd className="mt-1.5 text-sm text-foreground">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <button
        data-hero-item
        onClick={() => scrollToSection("#about")}
        className="group absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 opacity-0"
      >
        <span className="eyebrow">Scroll to explore</span>
        <ArrowDown className="size-4 text-primary transition-transform duration-300 group-hover:translate-y-1 motion-safe:animate-float-slow" />
      </button>
    </section>
  );
}
