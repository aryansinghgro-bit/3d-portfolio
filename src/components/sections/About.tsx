import { useRef } from "react";
import { Code2, Layers, MonitorSmartphone, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { TiltCard } from "@/components/ui/TiltCard";
import { profile } from "@/data/portfolio";
import { useReveal } from "@/hooks/useReveal";

const highlights = [
  { icon: Code2, label: "Clean component architecture" },
  { icon: Layers, label: "Design-to-code accuracy" },
  { icon: MonitorSmartphone, label: "Responsive by default" },
  { icon: Sparkles, label: "Motion with purpose" },
];

const stack = ["React", "Next.js", "JavaScript", "Tailwind CSS", "React Native", "SQL"];

export function About() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section
      id="about"
      ref={ref}
      className="relative px-6 py-24 sm:px-8 lg:px-12 lg:py-32"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="About me"
            title={
              <>
                Frontend engineering with an eye for <span className="text-gradient">detail</span>.
              </>
            }
          />
          <div className="mt-6 space-y-4">
            {profile.about.map((paragraph) => (
              <p key={paragraph} className="reveal text-base leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {highlights.map(({ icon: Icon, label }) => (
              <li key={label} className="reveal flex items-center gap-3 text-sm text-foreground">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-glass-border bg-glass text-primary">
                  <Icon className="size-4" />
                </span>
                <span className="min-w-0">{label}</span>
              </li>
            ))}
          </ul>
        </div>

        <TiltCard className="reveal">
          <GlassCard className="p-7 sm:p-9">
            <div className="pointer-events-none absolute -top-24 -right-16 size-56 rounded-full bg-primary/15 blur-3xl" />
            <div className="relative">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
                <div className="min-w-0">
                  <p className="eyebrow">Developer profile</p>
                  <h3 className="mt-2 truncate text-2xl font-semibold">{profile.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{profile.role}</p>
                </div>
                <span className="grid size-14 shrink-0 place-items-center rounded-2xl border border-glass-border bg-glass font-display text-lg font-bold text-primary">
                  AS
                </span>
              </div>

              <dl className="mt-7 grid grid-cols-2 gap-5 border-t border-border pt-6">
                <div>
                  <dt className="eyebrow">Education</dt>
                  <dd className="mt-1.5 text-sm">B.Tech CSE · 2023 — 2027</dd>
                </div>
                <div>
                  <dt className="eyebrow">Location</dt>
                  <dd className="mt-1.5 text-sm">{profile.location}</dd>
                </div>
              </dl>

              <p className="eyebrow mt-7">Core stack</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-glass-border bg-glass px-3 py-1.5 font-mono text-[11px] tracking-wide text-muted-foreground"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </GlassCard>
        </TiltCard>
      </div>
    </section>
  );
}
