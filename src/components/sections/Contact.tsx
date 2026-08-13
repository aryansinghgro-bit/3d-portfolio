import { useRef, useState } from "react";
import { Github, Linkedin, Loader2, Mail, Send } from "lucide-react";
import { z } from "zod";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { ActionButton } from "@/components/ui/ActionButton";
import { profile, socials } from "@/data/portfolio";
import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100, "Name is too long"),
  email: z.string().trim().email("Enter a valid email address").max(255, "Email is too long"),
  message: z
    .string()
    .trim()
    .min(10, "Tell me a little more (10+ characters)")
    .max(1000, "Message must be under 1000 characters"),
});

type Fields = z.infer<typeof contactSchema>;
type Status = "idle" | "submitting" | "ready-to-send" | "error";

const socialIcons = { github: Github, linkedin: Linkedin, mail: Mail } as const;

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  const [values, setValues] = useState<Fields>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [status, setStatus] = useState<Status>("idle");

  const update = (key: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof Fields, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Fields;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      setStatus("error");
      return;
    }

    setStatus("submitting");
    // No email service is connected yet, so the message is prepared for sending
    // rather than silently dropped.
    window.setTimeout(() => setStatus("ready-to-send"), 500);
  };

  const mailtoHref = `mailto:${profile.email}?subject=${encodeURIComponent(
    `Portfolio enquiry from ${values.name}`,
  )}&body=${encodeURIComponent(`${values.message}\n\n— ${values.name} (${values.email})`)}`;

  const fieldClass = (invalid?: string) =>
    cn(
      "mt-2 w-full rounded-xl border bg-glass px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors duration-200 focus:border-primary focus:outline-none",
      invalid ? "border-destructive" : "border-glass-border",
    );

  return (
    <section id="contact" ref={ref} className="relative px-6 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title={
              <>
                Let&apos;s build something{" "}
                <span className="text-gradient">great together.</span>
              </>
            }
            description="Open to frontend roles, internships and collaboration on interactive web projects."
          />

          <ul className="reveal mt-10 space-y-3">
            {socials.map((social) => {
              const Icon = socialIcons[social.icon];
              return (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="glass group flex items-center justify-between gap-4 rounded-xl px-5 py-4 transition-colors duration-300 hover:border-primary/40"
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <Icon className="size-4 shrink-0 text-primary" />
                      <span className="truncate text-sm">{social.label}</span>
                    </span>
                    <span className="font-mono text-[11px] text-muted-foreground">
                      {social.href === "mailto:aryansinghgro@gmail.com" ? "Open" : "Visit"}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <GlassCard className="reveal p-6 sm:p-8">
          <form onSubmit={handleSubmit} noValidate className="relative">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="eyebrow">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  value={values.name}
                  onChange={update("name")}
                  autoComplete="name"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={fieldClass(errors.name)}
                  placeholder="Your name"
                />
                {errors.name ? (
                  <p id="name-error" className="mt-2 text-xs text-destructive">
                    {errors.name}
                  </p>
                ) : null}
              </div>
              <div>
                <label htmlFor="email" className="eyebrow">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={update("email")}
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={fieldClass(errors.email)}
                  placeholder="you@example.com"
                />
                {errors.email ? (
                  <p id="email-error" className="mt-2 text-xs text-destructive">
                    {errors.email}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="message" className="eyebrow">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={values.message}
                onChange={update("message")}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
                className={cn(fieldClass(errors.message), "resize-y")}
                placeholder="What would you like to build?"
              />
              {errors.message ? (
                <p id="message-error" className="mt-2 text-xs text-destructive">
                  {errors.message}
                </p>
              ) : null}
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <ActionButton type="submit" disabled={status === "submitting"}>
                {status === "submitting" ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Preparing
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </>
                )}
              </ActionButton>
              <p className="font-mono text-[11px] text-muted-foreground">
                No email service connected yet
              </p>
            </div>

            <div aria-live="polite" className="mt-4 min-h-6">
              {status === "ready-to-send" ? (
                <p className="text-sm text-primary">
                  Your message is valid and ready.{" "}
                  <a href={mailtoHref} className="underline underline-offset-4">
                   Open it in your mail app
                  </a>{" "}
                  to send it — connect an email backend to submit directly.
                </p>
              ) : null}
              {status === "error" ? (
                <p className="text-sm text-destructive">
                  Please fix the highlighted fields and try again.
                </p>
              ) : null}
            </div>
          </form>
        </GlassCard>
      </div>
    </section>
  );
}
