import { Github, Linkedin, Mail } from "lucide-react";
import { navItems, profile, socials } from "@/data/portfolio";
import { scrollToSection } from "@/components/SmoothScroll";

const socialIcons = { github: Github, linkedin: Linkedin, mail: Mail } as const;

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border px-6 py-14 sm:px-8 lg:px-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-24 h-48 bg-[radial-gradient(50%_60%_at_50%_100%,var(--color-primary),transparent_70%)] opacity-15"
      />
      <div className="relative mx-auto grid w-full max-w-6xl gap-10 sm:grid-cols-[1.2fr_1fr_auto]">
        <div>
          <p className="font-display text-lg font-bold tracking-tight">{profile.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">{profile.role}</p>
        </div>

        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-y-2.5">
            {navItems.map((item) => (
              <li key={item.href}>
                <button
                  onClick={() => scrollToSection(item.href)}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="flex gap-2 sm:justify-end">
          {socials.map((social) => {
            const Icon = socialIcons[social.icon];
            return (
              <li key={social.label}>
                <a
                  href={social.href}
                  aria-label={social.label}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="grid size-11 place-items-center rounded-xl border border-glass-border bg-glass text-muted-foreground transition-colors duration-300 hover:border-primary/40 hover:text-primary"
                >
                  <Icon className="size-4" />
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="relative mx-auto mt-10 flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
        <p className="font-mono text-[11px] tracking-wide text-muted-foreground">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="font-mono text-[11px] tracking-wide text-muted-foreground">
          Built with React, Three.js & GSAP
        </p>
      </div>
    </footer>
  );
}
