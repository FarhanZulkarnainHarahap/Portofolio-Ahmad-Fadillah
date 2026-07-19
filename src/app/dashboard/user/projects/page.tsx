import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiBarChart2, FiBookOpen, FiBriefcase, FiStar, FiTarget, FiUsers } from "react-icons/fi";
import type { Project } from "@/types/api";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/user/PageHeader";
import { Section } from "@/components/user/Section";
import { getPublicProjects } from "@/services/project.server-service";

export default async function ProjectsPage() {
  const response = await getPublicProjects("limit=24").catch(() => null);
  const projects = response?.data ?? [];
  const featured = projects.find((project) => project.isFeatured) ?? projects[0];
  const rest = projects.filter((project) => project.id !== featured?.id);

  return (
    <>
      <PageHeader title="Proyek" description="Proyek HR yang berdampak pada organisasi dan karyawan." />
      <Section title="Kumpulan proyek Human Resources.">
        {featured ? (
          <>
            <FeaturedProject project={featured} />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {rest.slice(0, 5).map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}
            </div>
          </>
        ) : (
          <EmptyState title="Belum ada proyek yang ditampilkan." description="Studi kasus dan proyek HR akan tersedia setelah siap dipublikasikan." />
        )}
      </Section>
    </>
  );
}

function FeaturedProject({ project }: { project: Project }) {
  const imageUrl = getProjectImageUrl(project);

  return (
    <Link href={`/projects/${project.slug}`} className="group grid overflow-hidden rounded-[8px] border border-[color:var(--border)] bg-[color:var(--surface)] lg:grid-cols-[0.9fr_1.25fr]">
      <div className="relative grid min-h-[290px] place-items-center bg-[color:var(--surface-soft)] text-5xl text-[color:var(--primary)]">
        {imageUrl ? <Image src={imageUrl} alt={project.title} fill sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover object-center transition group-hover:scale-[1.03]" /> : <FiBriefcase aria-hidden />}
        <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-[6px] bg-[color:var(--surface)] px-4 py-2 text-sm font-semibold text-[color:var(--primary)]">
          <FiStar /> Proyek Unggulan
        </span>
      </div>
      <div className="p-8 lg:p-12">
        <h2 className="font-serif text-4xl font-semibold leading-tight text-[color:var(--text-primary)]">{project.title}</h2>
        <p className="mt-5 max-w-2xl leading-7 text-[color:var(--text-secondary)]">{project.shortDescription}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.category?.name ? <span className="rounded-[6px] bg-[color:var(--surface-soft)] px-3 py-1 text-sm text-[color:var(--text-secondary)]">{project.category.name}</span> : null}
          {project.year ? <span className="rounded-[6px] bg-[color:var(--surface-soft)] px-3 py-1 text-sm text-[color:var(--text-secondary)]">{project.year}</span> : null}
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
  const imageUrl = getProjectImageUrl(project);

  return (
    <Link href={`/projects/${project.slug}`} className="group overflow-hidden rounded-[8px] border border-[color:var(--border)] bg-[color:var(--surface)] transition hover:-translate-y-1 hover:border-[color:var(--primary)]">
      <div className="relative grid aspect-[4/3] place-items-center bg-[color:var(--surface-soft)] text-4xl text-[color:var(--primary)]">
        {imageUrl ? <Image src={imageUrl} alt={project.title} fill sizes="20vw" className="object-cover object-center transition group-hover:scale-[1.04]" /> : iconFor(index)}
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

function getProjectImageUrl(project: Project) {
  return project.thumbnail?.secureUrl ?? project.images?.[0]?.secureUrl ?? project.images?.[0]?.media?.secureUrl ?? null;
}
