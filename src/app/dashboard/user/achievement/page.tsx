import { FiAward, FiBarChart2, FiBookOpen, FiCalendar, FiFileText, FiPieChart, FiTarget, FiUsers } from "react-icons/fi";
import { PageHeader } from "@/components/user/PageHeader";
import { Section } from "@/components/user/Section";
import { getPublicAchievements } from "@/services/achievement.service";
import type { SimpleContent } from "@/types/api";

const fallbackAchievements: SimpleContent[] = [
  { id: "talent", title: "Talent Acquisition Excellence", description: "Membangun pipeline talenta berkualitas dan menempatkan 25+ posisi strategis.", value: "25", unit: "+", category: "Rekrutmen" },
  { id: "engagement", title: "Employee Engagement Improvement", description: "Meningkatkan engagement score sebesar 20% melalui program berbasis data.", value: "20", unit: "%", category: "Engagement" },
  { id: "learning", title: "Learning & Development Impact", description: "Merancang 6+ program pelatihan yang meningkatkan kompetensi dan kesiapan karyawan.", value: "6", unit: "+", category: "Pengembangan" },
  { id: "process", title: "HR Process Optimization", description: "Mengoptimalkan proses HR sehingga efisiensi operasional meningkat signifikan.", value: "30", unit: "%", category: "Proses" },
  { id: "policy", title: "Policy & Compliance Strengthening", description: "Menyusun 10+ SOP dan kebijakan HR untuk memastikan kepatuhan dan tata kelola.", value: "10", unit: "+", category: "Kebijakan" },
  { id: "analytics", title: "HR Analytics Driven Decisions", description: "Memanfaatkan data dan analitik untuk mendukung pengambilan keputusan strategis.", value: "90", unit: "%", category: "Data & Analitik" },
];

export default async function AchievementsPage() {
  const response = await getPublicAchievements().catch(() => null);
  const items = response?.data?.length ? response.data : fallbackAchievements;

  return (
    <>
      <PageHeader title="Pencapaian" description="Bukti pencapaian profesional dalam perjalanan Human Resources." eyebrow="Achievements • Impact • Results" />
      <Section title="Berkontribusi lewat strategi HR yang efektif, berbasis data, serta berfokus pada people, process, dan growth.">
        <div className="grid gap-6">
          <div className="grid rounded-[8px] border border-[color:var(--border)] bg-[color:var(--surface)] sm:grid-cols-2 lg:grid-cols-5">
            {items.slice(0, 5).map((item, index) => (
              <Metric key={item.id} item={item} icon={index} />
            ))}
          </div>

          <div className="grid gap-6 rounded-[8px] border border-[color:var(--border)] bg-[color:var(--surface-soft)] p-6 lg:grid-cols-[1fr_1.2fr]">
            <div className="flex items-center gap-5">
              <span className="grid size-24 place-items-center rounded-full bg-[color:var(--surface)] text-4xl text-[color:var(--primary)]">
                <FiAward aria-hidden />
              </span>
              <div>
                <p className="text-sm font-bold text-[color:var(--primary)]">Highlight Impact</p>
                <h2 className="mt-2 font-serif text-3xl font-semibold text-[color:var(--text-primary)]">Mendorong Pertumbuhan, Menciptakan Nilai Nyata</h2>
                <p className="mt-2 text-sm leading-6 text-[color:var(--text-secondary)]">Setiap inisiatif HR dijalankan dengan fokus pada keberlanjutan, efisiensi, dan pengalaman karyawan yang lebih baik.</p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <MiniStat value="100+" label="Karyawan terbantu" />
              <MiniStat value="90%+" label="Target program tercapai" />
              <MiniStat value="3+" label="Industri & organisasi" />
            </div>
          </div>

          <div>
            <p className="mb-4 flex items-center gap-2 text-sm font-bold text-[color:var(--text-primary)]"><FiAward className="text-[color:var(--primary)]" /> Pencapaian Utama</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item, index) => (
                <article key={item.id} className="rounded-[8px] border border-[color:var(--border)] bg-[color:var(--surface)] p-6">
                  <span className="grid size-12 place-items-center rounded-full bg-[color:var(--surface-soft)] text-xl text-[color:var(--primary)]">{iconFor(index)}</span>
                  <h3 className="mt-5 font-serif text-xl font-semibold leading-tight text-[color:var(--text-primary)]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[color:var(--text-secondary)]">{item.description}</p>
                  {typeof item.category === "string" ? <span className="mt-4 inline-flex rounded-[6px] bg-[color:var(--primary-soft)] px-3 py-1 text-xs font-semibold text-[color:var(--primary)]">{item.category}</span> : null}
                </article>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

function Metric({ item, icon }: { item: SimpleContent; icon: number }) {
  return (
    <div className="border-b border-[color:var(--border)] p-6 last:border-b-0 sm:border-r sm:last:border-r-0 lg:border-b-0">
      <span className="grid size-14 place-items-center rounded-full bg-[color:var(--surface-soft)] text-2xl text-[color:var(--primary)]">{iconFor(icon)}</span>
      <p className="mt-4 font-serif text-4xl font-semibold leading-none text-[color:var(--text-primary)]">{item.value}{item.unit}</p>
      <p className="mt-2 font-semibold leading-tight text-[color:var(--text-primary)]">{item.title?.replace(/ Excellence| Improvement| Impact| Optimization| Strengthening| Driven Decisions/g, "")}</p>
      <p className="mt-3 text-sm leading-6 text-[color:var(--text-secondary)]">{item.description}</p>
    </div>
  );
}

function MiniStat({ value, label }: { value: string; label: string }) {
  return <div className="rounded-[8px] border border-[color:var(--border)] bg-[color:var(--surface)] p-5"><p className="font-serif text-3xl font-semibold text-[color:var(--text-primary)]">{value}</p><p className="text-sm font-semibold text-[color:var(--text-secondary)]">{label}</p></div>;
}

function iconFor(index: number) {
  const icons = [<FiUsers key="u" />, <FiCalendar key="c" />, <FiBarChart2 key="b" />, <FiFileText key="f" />, <FiBookOpen key="bo" />, <FiPieChart key="p" />, <FiTarget key="t" />];
  return icons[index % icons.length];
}
