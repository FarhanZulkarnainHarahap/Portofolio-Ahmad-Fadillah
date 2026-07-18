import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiBarChart2, FiBookOpen, FiBriefcase, FiStar, FiTarget, FiUsers } from "react-icons/fi";
import type { Project } from "@/types/api";
import { PageHeader } from "@/components/user/PageHeader";
import { Section } from "@/components/user/Section";
import { getPublicProjects } from "@/services/project.server-service";

const fallbackProjects: Project[] = [
  {
    id: "hr-dashboard",
    title: "HR Dashboard & Employee Data Analytics",
    slug: "hr-dashboard-employee-data-analytics",
    shortDescription: "Mengembangkan dashboard interaktif untuk memonitor data karyawan dan insights HR yang mendukung pengambilan keputusan berbasis data.",
    category: { name: "Data Analytics", slug: "hr-analytics" },
    metrics: [
      { id: "sources", label: "Sumber Data Terintegrasi", value: "6", unit: "+" },
      { id: "dashboards", label: "Dashboard & Visualisasi", value: "12", unit: "+" },
      { id: "speed", label: "Peningkatan Kecepatan Pelaporan", value: "30", unit: "%" },
    ],
    isFeatured: true,
  },
  { id: "recruitment", title: "Recruitment Process Improvement", slug: "recruitment-process-improvement", shortDescription: "Merancang ulang proses rekrutmen untuk meningkatkan efisiensi dan kualitas kandidat.", category: { name: "Recruitment", slug: "recruitment" } },
  { id: "leadership", title: "Leadership Training Program", slug: "leadership-training-program", shortDescription: "Merancang program pelatihan kepemimpinan berbasis kompetensi.", category: { name: "L&D", slug: "learning" } },
  { id: "onboarding", title: "Employee Onboarding System", slug: "employee-onboarding-system", shortDescription: "Mengembangkan sistem onboarding digital untuk mempercepat adaptasi karyawan baru.", category: { name: "Onboarding", slug: "onboarding" } },
  { id: "analytics", title: "People Analytics Reporting", slug: "people-analytics-reporting", shortDescription: "Menyusun laporan people analytics untuk mengidentifikasi tren SDM dan peluang perbaikan.", category: { name: "People Analytics", slug: "people-analytics" } },
];

export default async function ProjectsPage() {
  const response = await getPublicProjects("limit=24").catch(() => null);
  const projects = response?.data?.length ? response.data : fallbackProjects;
  const featured = projects.find((project) => project.isFeatured) ?? projects[0];
  const rest = projects.filter((project) => project.id !== featured?.id);

  return (
    <>
      <PageHeader title="Proyek" description="Proyek HR yang berdampak pada organisasi dan karyawan." />
      <Section title="Setiap proyek dirancang untuk menyelesaikan tantangan HR nyata dengan pendekatan strategis dan berbasis data.">
        {featured ? <FeaturedProject project={featured} /> : null}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {rest.slice(0, 5).map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}
        </div>
      </Section>
    </>
  );
}

function FeaturedProject({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group grid overflow-hidden rounded-[8px] border border-[color:var(--border)] bg-[color:var(--surface)] lg:grid-cols-[0.9fr_1.25fr]">
      <div className="relative min-h-[290px] bg-[color:var(--surface-soft)]">
        <Image src="/me-about.jpeg" alt="" fill sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover object-[center_18%] grayscale transition group-hover:scale-[1.03]" />
        <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-[6px] bg-[color:var(--surface)] px-4 py-2 text-sm font-semibold text-[color:var(--primary)]">
          <FiStar /> Proyek Unggulan
        </span>
      </div>
      <div className="p-8 lg:p-12">
        <h2 className="font-serif text-4xl font-semibold leading-tight text-[color:var(--text-primary)]">{project.title}</h2>
        <p className="mt-5 max-w-2xl leading-7 text-[color:var(--text-secondary)]">{project.shortDescription}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {["Data Analytics", "Dashboard", "HR Metrics", "Power BI"].map((tag) => (
            <span key={tag} className="rounded-[6px] bg-[color:var(--surface-soft)] px-3 py-1 text-sm text-[color:var(--text-secondary)]">{tag}</span>
          ))}
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {(project.metrics ?? []).slice(0, 3).map((metric, index) => (
            <div key={metric.id} className="grid grid-cols-[48px_1fr] gap-3">
              <span className="grid size-12 place-items-center rounded-full bg-[color:var(--surface-soft)] text-xl text-[color:var(--primary)]">{index === 0 ? <FiUsers /> : index === 1 ? <FiBarChart2 /> : <FiTarget />}</span>
              <div>
                <p className="font-serif text-2xl font-semibold text-[color:var(--text-primary)]">{metric.value}{metric.unit}</p>
                <p className="text-xs text-[color:var(--text-secondary)]">{metric.label}</p>
              </div>
            </div>
          ))}
        </div>
        <span className="mt-8 inline-flex items-center gap-3 font-semibold text-[color:var(--primary)]">Lihat Detail Proyek <FiArrowRight /></span>
      </div>
    </Link>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group overflow-hidden rounded-[8px] border border-[color:var(--border)] bg-[color:var(--surface)] transition hover:-translate-y-1 hover:border-[color:var(--primary)]">
      <div className="relative aspect-[4/3] bg-[color:var(--surface-soft)]">
        <Image src="/me-about.jpeg" alt="" fill sizes="20vw" className="object-cover object-[center_20%] grayscale transition group-hover:scale-[1.04]" />
      </div>
      <div className="p-5">
        <span className="grid size-12 place-items-center rounded-full bg-[color:var(--surface-soft)] text-xl text-[color:var(--primary)]">{iconFor(index)}</span>
        <h3 className="mt-4 font-serif text-2xl font-semibold leading-tight text-[color:var(--text-primary)]">{project.title}</h3>
        <p className="mt-3 text-sm leading-6 text-[color:var(--text-secondary)]">{project.shortDescription}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--primary)]">Lihat Detail <FiArrowRight /></span>
      </div>
    </Link>
  );
}

function iconFor(index: number) {
  return [<FiUsers key="u" />, <FiBarChart2 key="b" />, <FiBookOpen key="l" />, <FiBriefcase key="e" />, <FiTarget key="t" />][index % 5];
}
