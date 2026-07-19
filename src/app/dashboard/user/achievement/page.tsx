import { FiAward, FiBarChart2, FiBookOpen, FiCalendar, FiFileText, FiPieChart, FiTarget, FiUsers } from "react-icons/fi";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/user/PageHeader";
import { Section } from "@/components/user/Section";
import { getPublicAchievements } from "@/services/achievement.service";
import type { SimpleContent } from "@/types/api";

export default async function AchievementsPage() {
  const response = await getPublicAchievements().catch(() => null);
  const items = response?.data ?? [];

  return (
    <>
      <PageHeader title="Pencapaian" description="Bukti pencapaian profesional dalam perjalanan Human Resources." eyebrow="Achievements • Impact • Results" />
      <Section title="Capaian profesional yang dipublikasikan.">
        {items.length ? (
          <div className="grid gap-6">
            <div className="grid rounded-[8px] border border-[color:var(--border)] bg-[color:var(--surface)] sm:grid-cols-2 lg:grid-cols-5">
              {items.slice(0, 5).map((item, index) => (
                <Metric key={item.id} item={item} icon={index} />
              ))}
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item, index) => (
                <AchievementCard key={item.id} item={item} index={index} />
              ))}
            </div>
          </div>
        ) : (
          <EmptyState title="Belum ada pencapaian yang tersedia." description="Capaian dan metrik profesional akan muncul saat sudah dipublikasikan." />
        )}
      </Section>
    </>
  );
}

function Metric({ item, icon }: { item: SimpleContent; icon: number }) {
  return (
    <div className="border-b border-[color:var(--border)] p-6 last:border-b-0 sm:border-r sm:last:border-r-0 lg:border-b-0">
      <span className="grid size-14 place-items-center rounded-full bg-[color:var(--surface-soft)] text-2xl text-[color:var(--primary)]">{iconFor(icon)}</span>
      <p className="mt-4 font-serif text-4xl font-semibold leading-none text-[color:var(--text-primary)]">{item.value}{item.unit}</p>
      <p className="mt-2 font-semibold leading-tight text-[color:var(--text-primary)]">{item.title}</p>
      <p className="mt-3 text-sm leading-6 text-[color:var(--text-secondary)]">{item.description}</p>
    </div>
  );
}

function AchievementCard({ item, index }: { item: SimpleContent; index: number }) {
  return (
    <article className="rounded-[8px] border border-[color:var(--border)] bg-[color:var(--surface)] p-6">
      <span className="grid size-12 place-items-center rounded-full bg-[color:var(--surface-soft)] text-xl text-[color:var(--primary)]">{iconFor(index)}</span>
      <h3 className="mt-5 font-serif text-xl font-semibold leading-tight text-[color:var(--text-primary)]">{item.title}</h3>
      <p className="mt-3 text-sm leading-6 text-[color:var(--text-secondary)]">{item.description}</p>
      {typeof item.category === "string" ? <span className="mt-4 inline-flex rounded-[6px] bg-[color:var(--primary-soft)] px-3 py-1 text-xs font-semibold text-[color:var(--primary)]">{item.category}</span> : null}
    </article>
  );
}

function iconFor(index: number) {
  const icons = [<FiUsers key="u" />, <FiCalendar key="c" />, <FiBarChart2 key="b" />, <FiFileText key="f" />, <FiBookOpen key="bo" />, <FiPieChart key="p" />, <FiTarget key="t" />, <FiAward key="a" />];
  return icons[index % icons.length];
}
