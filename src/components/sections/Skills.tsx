import { useRef } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { TechGraph } from "@/components/three/TechGraph";
import { skillGroups } from "@/data/portfolio";
import { useReveal } from "@/hooks/useReveal";
import { useHydrated } from "@/hooks/useHydrated";

export function Skills() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  const hydrated = useHydrated();

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -5;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 5;

    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-4px)
    `;
  };

  const handleMouseLeave = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    event.currentTarget.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
  };

  return (
    <section
      id="skills"
      ref={ref}
      className="relative px-6 py-24 sm:px-8 lg:px-12 lg:py-32"
    >
      <div className="mx-auto w-full max-w-6xl">

        <SectionHeading
          eyebrow="Skills"
          title={
            <>
              The tools I build{" "}
              <span className="text-gradient">interfaces</span> with.
            </>
          }
          description="Grouped by how I actually use them day to day — from markup and styling to app logic and data."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">

          {/* Skill Cards */}
          <div className="grid gap-5 sm:grid-cols-2">
            {skillGroups.map((group) => (
              <GlassCard
                key={group.category}
                interactive
                className="reveal relative overflow-hidden p-6"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  transformStyle: "preserve-3d",
                  transition:
                    "transform 180ms ease-out, box-shadow 300ms ease",
                  willChange: "transform",
                }}
              >
                {/* 3D Glow */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    -right-16
                    -top-16
                    size-40
                    rounded-full
                    bg-primary/20
                    blur-3xl
                    opacity-0
                    transition-opacity
                    duration-500
                    group-hover:opacity-100
                  "
                />

                {/* Top light */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-0
                    h-px
                    w-3/4
                    -translate-x-1/2
                    bg-gradient-to-r
                    from-transparent
                    via-primary/70
                    to-transparent
                    opacity-0
                    transition-opacity
                    duration-500
                    hover:opacity-100
                  "
                />

                <div
                  className="relative"
                  style={{
                    transform: "translateZ(20px)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <p className="eyebrow">
                    {group.hint}
                  </p>

                  <h3 className="mt-2 text-lg font-semibold">
                    {group.category}
                  </h3>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <li
                        key={skill}
                        className="
                          rounded-lg
                          border
                          border-glass-border
                          bg-glass
                          px-2.5
                          py-1.5
                          font-mono
                          text-[11px]
                          tracking-wide
                          text-muted-foreground
                          transition-all
                          duration-300
                          hover:-translate-y-1
                          hover:border-primary/40
                          hover:bg-primary/10
                          hover:text-primary
                        "
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Technology Graph */}
          <GlassCard className="reveal overflow-hidden p-0">
            <div className="border-b border-border px-6 py-5">
              <p className="eyebrow">
                Technology graph
              </p>

              <h3 className="mt-2 text-lg font-semibold">
                How the stack connects
              </h3>
            </div>

            <div className="relative h-[340px] sm:h-[420px]">
              {hydrated ? <TechGraph /> : null}

              <ul className="absolute inset-0 flex flex-col justify-center gap-2 px-6 md:sr-only">
                {[
                  "HTML",
                  "CSS",
                  "JavaScript",
                  "React",
                  "Next.js",
                  "Tailwind",
                ].map((tech) => (
                  <li
                    key={tech}
                    className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </GlassCard>

        </div>
      </div>
    </section>
  );
}