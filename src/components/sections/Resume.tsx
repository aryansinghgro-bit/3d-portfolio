import { useRef } from "react";
import { Download, FileText } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { TiltCard } from "@/components/ui/TiltCard";
import { ActionLink } from "@/components/ui/ActionButton";
import { profile } from "@/data/portfolio";
import { useReveal } from "@/hooks/useReveal";

export function Resume() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section id="resume" ref={ref} className="relative px-6 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="My resume"
            title={
              <>
                Everything on one <span className="text-gradient">page</span>.
              </>
            }
            description="A concise overview of my education, technical skills and development experience."
          />
          <div className="reveal mt-8 flex flex-wrap gap-3">
            <ActionLink href={profile.resumePath} target="_blank" rel="noreferrer">
              <FileText className="size-4" />
              View Resume
            </ActionLink>
            <ActionLink variant="outline" href={profile.resumePath} download>
              <Download className="size-4" />
              Download Resume
            </ActionLink>
          </div>
          <p className="reveal mt-4 font-mono text-[11px] tracking-wide text-muted-foreground">
             <span className="text-primary"></span>
          </p>
        </div>

        <TiltCard className="reveal" intensity={10}>
<GlassCard className="p-7 sm:p-9">
  <div className="pointer-events-none absolute -bottom-20 -left-10 size-56 rounded-full bg-secondary/15 blur-3xl" />

  <div className="relative overflow-hidden rounded-xl border border-glass-border bg-surface/70 shadow-[0_24px_60px_-30px_oklch(0_0_0/0.9)]">
    {/* Resume Header */}
    <div className="flex items-center justify-between border-b border-glass-border p-5 sm:p-6">
      <div>
        <p className="eyebrow">Resume</p>

        <h3 className="mt-2 font-display text-xl font-bold">
          {profile.name}
        </h3>

        <p className="text-sm text-muted-foreground">
          {profile.role}
        </p>
      </div>

      {/* Open Resume */}
      <a
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-lg border border-glass-border bg-background/50 px-4 py-2 text-sm font-medium transition hover:bg-primary hover:text-primary-foreground"
      >
        View Resume
      </a>
    </div>

    {/* Actual Resume Preview */}
    <div className="relative h-[420px] overflow-hidden bg-white">
      <iframe
        src="/resume.pdf#toolbar=0&navpanes=0&scrollbar=0"
        title="Aryan Singh Resume Preview"
        className="h-full w-full border-0"
      />

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-surface/90 to-transparent" />
    </div>

    {/* Resume Footer */}
    <div className="flex items-center justify-between border-t border-glass-border p-4 sm:p-5">
      <div>
        <p className="text-xs text-muted-foreground">
          Frontend Developer
        </p>

        <p className="mt-1 text-xs text-muted-foreground/70">
          PDF Resume
        </p>
      </div>

      <a
        href="/resume.pdf"
        download="resume.pdf"
        className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:scale-105"
      >
        Download
      </a>
    </div>
  </div>
</GlassCard>
        </TiltCard>
      </div>
    </section>
  );
}
