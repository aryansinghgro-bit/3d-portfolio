import { useRef } from "react";
import {
  Boxes,
  Code2,
  Cpu,
  Layout,
  Palette,
  Plug,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { expertise } from "@/data/portfolio";
import { useReveal } from "@/hooks/useReveal";

const icons: LucideIcon[] = [Code2, Layout, Smartphone, Plug, Boxes, Palette, Cpu];

export function Expertise() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section ref={ref} className="relative px-6 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading
          eyebrow="Technical expertise"
          title={
            <>
              What I bring to a <span className="text-gradient">frontend team</span>.
            </>
          }
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {expertise.map((item, i) => {
            const Icon = icons[i % icons.length] ?? Code2;
            return (
              <GlassCard key={item.title} interactive className="reveal p-6">
                <span className="grid size-11 place-items-center rounded-xl border border-glass-border bg-glass text-primary">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-5 text-base font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
