import { FiAward, FiBriefcase, FiFileText, FiMapPin, FiUsers } from "react-icons/fi";
import { displayDateRange } from "@/lib/format";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/user/PageHeader";
import { Section } from "@/components/user/Section";
import { getPublicExperiences } from "@/services/experience.service";
import type { Experience } from "@/types/api";

type ExperienceWithTools = Experience & { tools?: unknown };

export default async function ExperiencePage() {
  const response = await getPublicExperiences().catch(() => null);
  const items = (response?.data ?? []) as ExperienceWithTools[];
  const summary = buildExperienceSummary(items);

  return (
    <>
      <PageHeader title="Pengalaman" description="Timeline pengalaman Human Resources, tanggung jawab, dan dampak kerja." eyebrow="Human Resources • Experience" />
      <Section title="Konteks peran, tanggung jawab, dan hasil kerja.">
        <div className="grid gap-8 lg:grid-cols-[1fr_390px]">
          {items.length ? (
            <>
              <div className="grid gap-5">
                {items.map((item, index) => (
                  <article key={item.id} className="grid gap-5 lg:grid-cols-[150px_1fr]">
                    <div className="relative flex gap-4 lg:block">
                      <span className="grid size-14 shrink-0 place-items-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface-soft)] text-2xl text-[color:var(--primary)]">
                        {index === 0 ? <FiBriefcase /> : index === 1 ? <FiUsers /> : <FiFileText />}
                      </span>
                      <div className="lg:mt-4">
                        <p className="font-semibold text-[color:var(--primary)]">{displayDateRange(item.startDate, item.endDate, item.isCurrent)}</p>
                        <p className="text-sm text-[color:var(--text-secondary)]">{item.isCurrent ? "Aktif" : "Selesai"}</p>
                      </div>
                    </div>
                    <div className="rounded-[8px] border border-[color:var(--border)] bg-[color:var(--surface)] p-5 sm:p-6">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <p className="font-serif text-2xl font-semibold leading-tight text-[color:var(--text-primary)] sm:text-3xl">{item.position}</p>
                          <p className="mt-1 font-semibold text-[color:var(--primary)]">{item.companyName}</p>
                        </div>
                        {item.location ? <p className="inline-flex items-center gap-2 text-sm text-[color:var(--text-secondary)]"><FiMapPin />{item.location}</p> : null}
                      </div>
                      {item.description ? <p className="mt-4 leading-7 text-[color:var(--text-secondary)]">{item.description}</p> : null}
                      <List title="Tanggung Jawab Utama" items={item.responsibilities?.map((x) => x.content) ?? []} />
                      <TagList items={Array.isArray(item.tools) ? item.tools.map(String) : []} />
                    </div>
                  </article>
                ))}
              </div>
              <aside className="h-fit rounded-[8px] border border-[color:var(--border)] bg-[color:var(--surface)] p-5 sm:p-6 lg:p-8">
                <h2 className="font-serif text-2xl font-semibold text-[color:var(--text-primary)] sm:text-3xl">Ringkasan Karier</h2>
                <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
                  <Summary icon={<FiBriefcase />} value={summary.years} label="Tahun Pengalaman" detail="di bidang Human Resources" />
                  <Summary icon={<FiUsers />} value={summary.companies} label="Perusahaan" detail="Pengalaman lintas organisasi" />
                  <Summary icon={<FiAward />} value={summary.currentStatus} label="Status Peran" detail={summary.focus} />
                </div>
              </aside>
            </>
          ) : (
            <div className="lg:col-span-2">
              <EmptyState title="Belum ada pengalaman yang dipublikasikan." description="Riwayat peran, tanggung jawab, dan hasil kerja akan tersedia di halaman ini." />
            </div>
          )}
        </div>
      </Section>
    </>
  );
}

function List({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <div className="mt-5 border-t border-[color:var(--border)] pt-4">
      <p className="font-bold text-[color:var(--text-primary)]">{title}</p>
      <ul className="mt-3 grid gap-1 text-sm text-[color:var(--text-secondary)]">
        {items.map((item) => <li key={item} className="flex gap-2"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-[color:var(--primary)]" />{item}</li>)}
      </ul>
    </div>
  );
}

function TagList({ items }: { items: string[] }) {
  if (!items.length) return null;
  return <div className="mt-4 flex flex-wrap gap-2">{items.map((item) => <span key={item} className="rounded-[6px] bg-[color:var(--surface-soft)] px-3 py-1 text-xs text-[color:var(--text-secondary)]">{item}</span>)}</div>;
}

function Summary({ icon, value, label, detail }: { icon: React.ReactNode; value: string; label: string; detail: string }) {
  return (
    <div className="grid grid-cols-[52px_1fr] gap-4 border-b border-[color:var(--border)] pb-5 last:border-b-0 last:pb-0">
      <span className="grid size-12 place-items-center rounded-full bg-[color:var(--surface-soft)] text-xl text-[color:var(--primary)]">{icon}</span>
      <div>
        <p className="font-serif text-3xl font-semibold leading-none text-[color:var(--text-primary)] sm:text-4xl">{value}</p>
        <p className="mt-1 font-semibold text-[color:var(--text-primary)]">{label}</p>
        <p className="text-sm text-[color:var(--text-secondary)]">{detail}</p>
      </div>
    </div>
  );
}

function buildExperienceSummary(items: ExperienceWithTools[]) {
  const companies = new Set(items.map((item) => item.companyName).filter(Boolean)).size;
  const startYears = items
    .map((item) => (item.startDate ? new Date(item.startDate).getFullYear() : Number.NaN))
    .filter((year) => Number.isFinite(year));
  const years = startYears.length ? Math.max(1, new Date().getFullYear() - Math.min(...startYears)) : items.length;
  const hasCurrentRole = items.some((item) => item.isCurrent);

  return {
    years: `${years}+`,
    companies: String(companies || items.length),
    currentStatus: hasCurrentRole ? "Aktif" : "Selesai",
    focus: "People Growth & Operational Excellence",
  };
}
