import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { profile } from "@/data/portfolio";
import { EASE, reducedMotion } from "@/lib/animations";

const BAR_SEGMENTS = 20;

/** Premium loading experience: animated progress from 0 to 100, then a soft wipe. */
export function Loader({ onDone }: { onDone: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const state = { value: 0 };
    const skip = reducedMotion();

    const tween = gsap.to(state, {
      value: 100,
      duration: skip ? 0.4 : 1.9,
      ease: "power2.inOut",
      onUpdate: () => setProgress(Math.round(state.value)),
      onComplete: () => {
        if (!rootRef.current) return;
        gsap.to(rootRef.current, {
          opacity: 0,
          duration: skip ? 0.15 : 0.7,
          ease: EASE.inOut,
          onComplete: () => {
            setHidden(true);
            onDone();
          },
        });
      },
    });

    return () => {
      tween.kill();
    };
  }, [onDone]);

  if (hidden) return null;

  const filled = Math.round((progress / 100) * BAR_SEGMENTS);

  return (
    <div
      ref={rootRef}
      role="status"
      aria-live="polite"
      aria-label={`Loading experience, ${progress} percent`}
      className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-background px-6"
    >
      <div className="pointer-events-none absolute inset-0 accent-glow opacity-60" />
      <div className="relative w-full max-w-md text-center">
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
          {profile.name.toUpperCase()}
        </h1>
        <p className="eyebrow mt-3">{profile.role}</p>

        <p className="mt-10 font-mono text-[11px] tracking-[0.2em] text-muted-foreground">
          INITIALIZING EXPERIENCE...
        </p>

        <div className="mt-4 flex items-center justify-center gap-3 font-mono text-sm">
          <span aria-hidden className="tracking-[0.15em] text-primary">
            {"█".repeat(filled)}
            <span className="text-muted-foreground/40">{"░".repeat(BAR_SEGMENTS - filled)}</span>
          </span>
          <span className="tabular-nums text-foreground">{progress}%</span>
        </div>

        <div className="mt-6 h-px w-full overflow-hidden bg-border">
          <div
            className="h-px bg-primary transition-[width] duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
