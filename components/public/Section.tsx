import type { ReactNode } from "react";

type SectionProps = {
  eyebrow?: string;
  title: string;
  children: ReactNode;
};

export function Section({ eyebrow, title, children }: SectionProps) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-7 max-w-3xl">
        {eyebrow ? <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700 dark:text-cyan-300">{eyebrow}</p> : null}
        <h2 className="mt-2 text-3xl font-bold text-slate-950 dark:text-white">{title}</h2>
      </div>
      {children}
    </section>
  );
}
