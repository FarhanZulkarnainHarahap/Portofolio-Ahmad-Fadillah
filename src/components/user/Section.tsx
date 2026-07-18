import type { ReactNode } from "react";

type SectionProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  tone?: "default" | "muted" | "strong";
};

export function Section({ eyebrow, title, description, children, tone = "default" }: SectionProps) {
  const toneClass =
    tone === "muted"
      ? "bg-[color:var(--surface-secondary)]/70"
      : tone === "strong"
        ? "bg-[color:var(--surface)]"
        : "";

  return (
    <section className={`relative py-16 sm:py-20 lg:py-28 ${toneClass}`}>
      <div className="section-shell">
        <div className="mb-9 grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            {eyebrow ? <p className="editorial-label">{eyebrow}</p> : null}
            <h2 className="mt-3 max-w-3xl font-serif text-4xl font-semibold leading-tight tracking-normal text-[color:var(--text-primary)] sm:text-5xl">
              {title}
            </h2>
          </div>
          {description ? <p className="max-w-2xl text-base leading-8 text-[color:var(--text-secondary)] sm:text-lg">{description}</p> : null}
        </div>
        {children}
      </div>
    </section>
  );
}
