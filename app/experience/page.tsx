import { apiGet } from "@/lib/api";
import { displayDateRange } from "@/lib/format";
import type { Experience } from "@/types/api";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/public/PageHeader";
import { Section } from "@/components/public/Section";

export default async function ExperiencePage() {
  const response = await apiGet<Experience[]>("/public/experiences").catch(() => null);
  const items = response?.data ?? [];
  return (
    <>
      <PageHeader title="Experience" description="Timeline pengalaman HR yang dipublikasikan dari dashboard admin." />
      <Section title="Timeline pengalaman">
        {items.length ? (
          <div className="grid gap-5">
            {items.map((item) => (
              <article key={item.id} className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                <p className="text-xl font-semibold">{item.position}</p>
                <p className="mt-1 text-sm text-blue-700 dark:text-cyan-300">{item.companyName} · {displayDateRange(item.startDate, item.endDate, item.isCurrent)}</p>
                <p className="mt-4 text-slate-600 dark:text-slate-300">{item.description}</p>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <List title="Responsibilities" items={item.responsibilities?.map((x) => x.content) ?? []} />
                  <List title="Achievements" items={item.achievements?.map((x) => x.content) ?? []} />
                </div>
              </article>
            ))}
          </div>
        ) : <EmptyState title="Belum ada pengalaman kerja yang ditambahkan." />}
      </Section>
    </>
  );
}

function List({ title, items }: { title: string; items: string[] }) {
  return <div><p className="font-semibold">{title}</p>{items.length ? <ul className="mt-2 list-disc pl-5 text-sm text-slate-600 dark:text-slate-300">{items.map((item) => <li key={item}>{item}</li>)}</ul> : <p className="mt-2 text-sm text-slate-500">Belum ada data.</p>}</div>;
}
