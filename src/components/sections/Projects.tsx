import { useEffect, useRef } from "react";
import { ArrowUpRight, Github } from "lucide-react";
import { gsap } from "gsap";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { TiltCard } from "@/components/ui/TiltCard";
import { ActionLink } from "@/components/ui/ActionButton";
import { projects } from "@/data/portfolio";
import { useReveal } from "@/hooks/useReveal";
import { EASE, reducedMotion, registerGsap } from "@/lib/animations";

function ProjectVisual({
  index,
  label,
  image,
  title,
}: {
  index: string;
  label: string;
  image?: string;
  title: string;
}) {
  const visualRef = useRef<HTMLDivElement>(null);
  const reflectionRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const element = visualRef.current;
    const reflection = reflectionRef.current;

    if (!element || reducedMotion()) return;

    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    element.style.transform = `
      perspective(1200px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateZ(12px)
      scale(1.02)
    `;

    if (reflection) {
      reflection.style.background = `
        radial-gradient(
          circle at ${x}px ${y}px,
          rgba(255,255,255,0.14),
          transparent 35%
        )
      `;
    }
  };

  const handleMouseLeave = () => {
    const element = visualRef.current;
    const reflection = reflectionRef.current;

    if (!element) return;

    element.style.transform = `
      perspective(1200px)
      rotateX(0deg)
      rotateY(0deg)
      translateZ(0)
      scale(1)
    `;

    if (reflection) {
      reflection.style.background = "transparent";
    }
  };

  return (
    <div
      className="relative [perspective:1200px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={visualRef}
        className="
          group
          relative
          aspect-[16/10]
          w-full
          overflow-hidden
          rounded-2xl
          border
          border-glass-border
          bg-surface
          shadow-2xl
          will-change-transform
          transition-transform
          duration-300
          ease-out
        "
      >
        {image ? (
          <img
            src={image}
            alt={`${title} project preview`}
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
              transition-transform
              duration-700
              ease-out
              group-hover:scale-105
            "
          />
        ) : (
          <div className="absolute inset-0 grid-lines">
            <div className="absolute inset-0 grid place-items-center">
              <span className="font-display text-6xl font-bold text-foreground/10">
                {index}
              </span>
            </div>
          </div>
        )}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-background/80
            via-background/10
            to-transparent
            transition-opacity
            duration-500
            group-hover:opacity-70
          "
        />

        <div
          ref={reflectionRef}
          className="
            pointer-events-none
            absolute
            inset-0
            transition-all
            duration-300
          "
        />

        <div
          className="
            absolute
            inset-x-0
            top-0
            flex
            items-center
            gap-1.5
            border-b
            border-white/10
            bg-black/30
            px-3
            py-2.5
            backdrop-blur-md
          "
        >
          <span className="size-2 rounded-full bg-primary/80" />
          <span className="size-2 rounded-full bg-secondary/80" />
          <span className="size-2 rounded-full bg-white/30" />

          <span className="ml-2 truncate font-mono text-[10px] text-white/50">
            {label}
          </span>
        </div>

        <div className="absolute bottom-4 left-4">
          <span
            className="
              rounded-lg
              border
              border-white/10
              bg-black/40
              px-3
              py-1.5
              font-mono
              text-[10px]
              tracking-[0.2em]
              text-white/70
              backdrop-blur-md
            "
          >
            PROJECT {index}
          </span>
        </div>

        <div
          className="
            absolute
            bottom-4
            right-4
            translate-y-2
            rounded-full
            border
            border-white/10
            bg-black/40
            px-3
            py-1.5
            text-[10px]
            uppercase
            tracking-wider
            text-white/70
            opacity-0
            backdrop-blur-md
            transition-all
            duration-300
            group-hover:translate-y-0
            group-hover:opacity-100
          "
        >
          Explore
        </div>
      </div>

      <div
        className="
          pointer-events-none
          absolute
          -bottom-4
          left-[8%]
          right-[8%]
          h-8
          rounded-full
          bg-primary/10
          blur-2xl
          transition-all
          duration-500
          group-hover:bg-primary/20
        "
      />
    </div>
  );
}

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  useEffect(() => {
    if (!sectionRef.current || reducedMotion()) return;
    registerGsap();

    const cards = sectionRef.current.querySelectorAll<HTMLElement>("[data-project-card]");
    if (!cards.length) return;

    const tl = gsap.timeline({ defaults: { ease: EASE.out } });
    tl.fromTo(
      cards,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, delay: 0.08 },
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative px-6 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Selected work"
            title="Projects that blend craft, motion, and product thinking"
            description="A few recent builds spanning interfaces, data experiences, and interactive storytelling."
            className="max-w-2xl"
          />
          <ActionLink href="#contact" variant="outline" size="sm">
            Let&apos;s build together
            <ArrowUpRight className="size-4" />
          </ActionLink>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project, index) => (
            <TiltCard key={project.id} className="h-full">
              <GlassCard interactive className="h-full overflow-hidden p-0" data-project-card>
                <div className="grid h-full md:grid-cols-[1.05fr_0.95fr]">
                  <div className="p-4 sm:p-5">
                    <ProjectVisual
                      index={project.id}
                      label={project.title}
                      image={project.image}
                      title={project.title}
                    />
                  </div>

                  <div className="flex flex-col justify-between p-6 sm:p-7">
                    <div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-primary">
                          {index === 0 ? "Featured" : "Case study"}
                        </span>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Open ${project.title} on GitHub`}
                          className="rounded-full border border-white/10 bg-background/60 p-2 text-muted-foreground transition-colors hover:text-foreground"
                        >
                          <Github className="size-4" />
                        </a>
                      </div>

                      <h3 className="mt-5 text-2xl font-semibold text-foreground">
                        {project.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">
                        {project.description}
                      </p>
                    </div>

                    <div className="mt-6">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-muted-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="mt-6 flex items-center gap-3">
                        <a href={project.live} variant="primary" size="sm">
                          View project
                          <ArrowUpRight className="size-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
