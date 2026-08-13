import { useEffect, useRef } from "react";
import { GraduationCap } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { education } from "@/data/portfolio";
import { useReveal } from "@/hooks/useReveal";
import { EASE, reducedMotion, registerGsap } from "@/lib/animations";

export function Education() {
  const ref = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  useReveal(ref);

  useEffect(() => {
    const line = lineRef.current;
    if (!line || reducedMotion()) return;
    const g = registerGsap();
    const tween = g.fromTo(
      line,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: EASE.inOut,
        transformOrigin: "top center",
        scrollTrigger: { trigger: line, start: "top 85%", end: "bottom 60%", scrub: true },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section id="education" ref={ref} className="relative px-6 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto w-full max-w-4xl">
        <SectionHeading
          eyebrow="Education"
          title={
            <>
              Academic <span className="text-gradient">background</span>.
            </>
          }
        />

        <ol className="relative mt-14 space-y-8 pl-10 sm:pl-14">
          <div
            aria-hidden
            className="absolute top-2 bottom-2 left-[13px] w-px bg-gradient-to-b from-primary via-secondary to-transparent sm:left-[21px]"
            ref={lineRef}
          />
          {education.map((item) => (
            <li key={item.degree} className="reveal relative">
              <span
                aria-hidden
                className="absolute top-6 -left-10 grid size-7 place-items-center rounded-full border border-glass-border bg-background text-primary sm:-left-14 sm:size-11"
              >
                <GraduationCap className="size-3.5 sm:size-5" />
              </span>
              <GlassCard className="p-6 sm:p-7">
                <p className="eyebrow">{item.period}</p>
                <h3 className="mt-2 text-lg font-semibold sm:text-xl">{item.degree}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.institution}</p>
                <p className="eyebrow mt-5">Relevant areas</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {item.areas.map((area) => (
                    <li
                      key={area}
                      className="rounded-full border border-glass-border bg-glass px-3 py-1.5 font-mono text-[11px] text-muted-foreground"
                    >
                      {area}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
