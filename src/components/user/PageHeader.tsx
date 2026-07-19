export function PageHeader({ title, description, eyebrow }: { title: string; description: string; eyebrow?: string }) {
  return (
    <section className="relative overflow-hidden border-b border-[color:var(--border)] py-14 sm:py-[4.5rem] lg:py-20">
      <div className="section-shell">
        <div className="max-w-4xl">
          <p className="editorial-label">{eyebrow ?? "Portofolio HR"}</p>
          <h1 className="mt-4 max-w-full overflow-wrap-anywhere font-serif text-[clamp(3.25rem,14vw,6.5rem)] font-semibold leading-[0.94] tracking-normal text-[color:var(--text-primary)] lg:text-[clamp(4.25rem,6vw,6.5rem)]">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[color:var(--text-secondary)] sm:text-lg">{description}</p>
        </div>
      </div>
    </section>
  );
}
