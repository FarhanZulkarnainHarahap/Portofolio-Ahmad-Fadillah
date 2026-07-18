import { FiCheckCircle } from "react-icons/fi";
import { apiGet } from "@/lib/api";
import type { Expertise } from "@/types/api";
import { PageHeader } from "@/components/public/PageHeader";
import { Section } from "@/components/public/Section";

export default async function ExpertisePage() {
  const response = await apiGet<Expertise[]>("/public/expertise").catch(() => null);
  const items = response?.data ?? [];
  return (
    <>
      <PageHeader title="Keahlian" description="Kategori dan kemampuan HR aktif yang dikelola dari database." />
      {items.length ? (
        <Section eyebrow="Capability" title="Keahlian HR yang tersusun untuk kebutuhan people operation modern.">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {items.map((item, index) => (
              <article key={item.id} className={`premium-card p-6 ${index === 0 ? "md:col-span-2" : ""}`}>
                <FiCheckCircle className="text-2xl text-[color:var(--primary)]" />
                <p className="mt-5 font-heading text-xl font-extrabold">{item.name}</p>
                {item.category?.name ? <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-[color:var(--accent)]">{item.category.name}</p> : null}
                {item.description ? <p className="mt-3 text-sm leading-6 text-[color:var(--text-secondary)]">{item.description}</p> : null}
                {typeof item.level === "number" ? <div className="mt-5 h-2 rounded-full bg-[color:var(--surface-secondary)]"><div className="h-full rounded-full bg-[color:var(--secondary)]" style={{ width: `${item.level}%` }} /></div> : null}
              </article>
            ))}
          </div>
        </Section>
      ) : null}
    </>
  );
}
