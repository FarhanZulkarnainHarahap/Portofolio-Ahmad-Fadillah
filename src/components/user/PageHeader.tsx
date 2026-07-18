export function PageHeader({ title, description, eyebrow }: { title: string; description: string; eyebrow?: string }) {
  return (
    <section className="relative overflow-hidden border-b border-[color:var(--border)] pb-14 pt-14 sm:pb-20 sm:pt-20">
      <div className="section-shell">
        <div className="max-w-4xl">
          <p className="editorial-label">{eyebrow ?? "Portofolio HR"}</p>
          <h1 className="mt-4 font-serif text-6xl font-semibold leading-none tracking-normal text-[color:var(--text-primary)] sm:text-7xl lg:text-8xl">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[color:var(--text-secondary)]">{description}</p>
        </div>
      </div>
    </section>
  );
}
