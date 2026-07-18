import { FiCheckCircle } from "react-icons/fi";
import { displayDateRange } from "@/lib/format";
import { PageHeader } from "@/components/user/PageHeader";
import { Section } from "@/components/user/Section";
import { getPublicExperiences } from "@/services/experience.service";

export default async function ExperiencePage() {
  const response = await getPublicExperiences().catch(() => null);
  const items = response?.data ?? [];
  return (
    <>
      <PageHeader title="Pengalaman" description="Timeline pengalaman Human Resources, tanggung jawab, dan dampak kerja." />
      {items.length ? (
        <Section eyebrow="Career Timeline" title="Konteks peran, tanggung jawab, dan capaian." tone="muted">
          <div className="grid gap-6">
            {items.map((item, index) => (
              <article key={item.id} className="grid gap-4 lg:grid-cols-[180px_1fr]">
                <div className="font-heading text-4xl font-extrabold text-[color:var(--primary-soft)]">{String(index + 1).padStart(2, "0")}</div>
                <div className="premium-card p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="font-heading text-2xl font-extrabold">{item.position}</p>
                      <p className="mt-1 font-semibold text-[color:var(--primary)]">{item.companyName}</p>
                    </div>
                    <p className="rounded-full bg-[color:var(--primary-soft)] px-3 py-1 text-xs font-bold text-[color:var(--primary)]">{displayDateRange(item.startDate, item.endDate, item.isCurrent)}</p>
                  </div>
                  {item.description ? <p className="mt-4 leading-7 text-[color:var(--text-secondary)]">{item.description}</p> : null}
                  <div className="mt-5 grid gap-5 md:grid-cols-2">
                    <List title="Tanggung Jawab" items={item.responsibilities?.map((x) => x.content) ?? []} />
                    <List title="Capaian" items={item.achievements?.map((x) => x.content) ?? []} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Section>
      ) : null}
    </>
  );
}

function List({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;
  return <div><p className="font-bold">{title}</p><ul className="mt-3 grid gap-2 text-sm text-[color:var(--text-secondary)]">{items.map((item) => <li key={item} className="flex gap-2"><FiCheckCircle className="mt-0.5 shrink-0 text-[color:var(--secondary)]" />{item}</li>)}</ul></div>;
}
