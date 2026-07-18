import Link from "next/link";
import { FiArrowUpRight, FiBriefcase } from "react-icons/fi";
import type { Project } from "@/types/api";
import { PageHeader } from "@/components/user/PageHeader";
import { Section } from "@/components/user/Section";
import { getPublicProjects } from "@/services/project.server-service";

export default async function ProjectsPage() {
  const response = await getPublicProjects("limit=24").catch(() => null);
  const projects = response?.data ?? [];

  return (
    <>
      <PageHeader title="Proyek HR" description="Case study Human Resources yang sudah dipublikasikan melalui dashboard admin." />
      {projects.length ? (
        <Section eyebrow="Case Study" title="Proyek terpilih dengan konteks, peran, dan hasil." tone="strong">
          <div className="grid gap-5 lg:grid-cols-3">
            {projects.map((project, index) => <ProjectTile key={project.id} project={project} featured={index === 0} />)}
          </div>
        </Section>
      ) : null}
    </>
  );
}

function ProjectTile({ project, featured }: { project: Project; featured?: boolean }) {
  const metric = project.metrics?.[0];

  return (
    <Link href={`/dashboard/user/projects/${project.slug}`} className={`premium-card group overflow-hidden transition hover:-translate-y-1 hover:border-[color:var(--primary)] ${featured ? "lg:col-span-2" : ""}`}>
      <div className="aspect-[16/9] bg-[color:var(--surface-secondary)] p-6">
        <div className="flex h-full items-end rounded-[var(--radius-md)] bg-[color:var(--primary-soft)] p-5 text-[color:var(--primary)] transition group-hover:scale-[1.02]">
          <FiBriefcase className="text-4xl" aria-hidden />
        </div>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-2">
          {project.category?.name ? <span className="rounded-full bg-[color:var(--secondary-soft)] px-3 py-1 text-xs font-bold text-[color:var(--secondary)]">{project.category.name}</span> : null}
          {project.year ? <span className="rounded-full bg-[color:var(--accent-soft)] px-3 py-1 text-xs font-bold text-[color:var(--accent)]">{project.year}</span> : null}
        </div>
        <p className="mt-4 font-heading text-2xl font-extrabold text-[color:var(--text-primary)]">{project.title}</p>
        {project.shortDescription ? <p className="mt-3 text-sm leading-6 text-[color:var(--text-secondary)]">{project.shortDescription}</p> : null}
        <div className="mt-5 flex items-center justify-between gap-4">
          {metric ? <p className="text-sm font-bold text-[color:var(--primary)]">{metric.value}{metric.unit ?? ""} {metric.label}</p> : <span />}
          <span className="inline-flex items-center gap-1 text-sm font-bold text-[color:var(--primary)]">Baca <FiArrowUpRight /></span>
        </div>
      </div>
    </Link>
  );
}
