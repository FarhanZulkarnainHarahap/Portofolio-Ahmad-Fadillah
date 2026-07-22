import Link from "next/link";
import { FiArrowLeft, FiBriefcase, FiCheckCircle, FiDownload, FiTarget, FiTrendingUp } from "react-icons/fi";
import type { ReactNode } from "react";
import { EmptyState } from "@/components/ui/EmptyState";
import { Section } from "@/components/user/Section";
import { getPublicProject } from "@/services/project.server-service";

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const response = await getPublicProject(slug).catch(() => null);
  const project = response?.data;
  if (!project) return <EmptyState title="Proyek tidak ditemukan." />;

  const info: { label: string; value: string }[] = [
    { label: "Organisasi", value: project.organization ?? "" },
    { label: "Tahun", value: project.year?.toString() ?? "" },
    { label: "Peran", value: project.role ?? "" },
    { label: "Durasi", value: project.duration ?? "" },
  ].filter((item) => item.value);

  return (
    <>
      <section className="relative overflow-hidden pb-14 pt-16 sm:pb-20 sm:pt-20">
        <div className="section-shell">
          <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-bold text-[color:var(--primary)]"><FiArrowLeft /> Kembali ke proyek</Link>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="editorial-label">{project.category?.name ?? "Case Study"}</p>
              <h1 className="mt-4 overflow-wrap-anywhere font-heading text-[clamp(2.5rem,10vw,4rem)] font-extrabold leading-tight tracking-normal text-[color:var(--text-primary)]">{project.title}</h1>
              {project.shortDescription ? <p className="mt-5 max-w-3xl text-lg leading-8 text-[color:var(--text-secondary)]">{project.shortDescription}</p> : null}
              {project.documentUrl ? (
                <a className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-[color:var(--primary)] px-5 text-sm font-bold text-[color:var(--text-on-primary)]" href={project.documentUrl} target="_blank" rel="noreferrer" download>
                  <FiDownload aria-hidden />
                  Unduh File Proyek
                </a>
              ) : null}
            </div>
            <div className="premium-card grid gap-4 p-5 sm:grid-cols-2">
              {info.map((item) => <Info key={item.label} label={item.label} value={item.value} />)}
            </div>
          </div>
        </div>
      </section>

      {(project.problem || project.solution || project.implementation) ? (
        <Section eyebrow="Story" title="Tantangan, pendekatan, dan implementasi." tone="strong">
          <div className="grid gap-5 lg:grid-cols-3">
            {project.problem ? <StoryPanel icon={<FiTarget />} title="Challenge" text={project.problem} /> : null}
            {project.solution ? <StoryPanel icon={<FiCheckCircle />} title="Approach" text={project.solution} /> : null}
            {project.implementation ? <StoryPanel icon={<FiBriefcase />} title="Implementation" text={project.implementation} /> : null}
          </div>
        </Section>
      ) : null}

      {(project.metrics?.length || project.resultsText || project.results?.length) ? (
        <Section eyebrow="Results" title="Hasil yang dapat dipindai cepat." tone="muted">
          {project.metrics?.length ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {project.metrics.map((metric) => <Metric key={metric.id} label={metric.label} value={`${metric.value}${metric.unit ?? ""}`} />)}
            </div>
          ) : null}
          {project.resultsText ? <p className="mt-8 max-w-3xl text-lg leading-8 text-[color:var(--text-secondary)]">{project.resultsText}</p> : null}
          {project.results?.length ? <List title="Result Highlights" items={project.results.map((item) => item.content)} /> : null}
        </Section>
      ) : null}

      {(project.challenges?.length || project.lessons) ? (
        <Section eyebrow="Learning" title="Pembelajaran dan konteks lanjutan.">
          {project.challenges?.length ? <List title="Key Challenges" items={project.challenges.map((item) => item.content)} /> : null}
          {project.lessons ? <p className="mt-8 max-w-3xl text-lg leading-8 text-[color:var(--text-secondary)]">{project.lessons}</p> : null}
        </Section>
      ) : null}

      <section className="bg-[color:var(--primary)] px-4 py-14 text-[color:var(--text-on-primary)]">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <p className="font-heading text-3xl font-extrabold">Tertarik membahas project HR serupa?</p>
          <Link className="inline-flex min-h-11 items-center justify-center rounded-full bg-[color:var(--surface)] px-5 text-sm font-bold text-[color:var(--primary)]" href="/contact">Hubungi Saya</Link>
        </div>
      </section>
    </>
  );
}

function Info({ label, value }: { label: string; value?: string | null }) {
  return <div><p className="text-xs font-bold uppercase tracking-[0.14em] text-[color:var(--text-muted)]">{label}</p><p className="mt-2 font-heading text-xl font-extrabold text-[color:var(--text-primary)]">{value}</p></div>;
}

function StoryPanel({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return <article className="premium-card p-6"><div className="text-2xl text-[color:var(--primary)]">{icon}</div><p className="mt-5 font-heading text-2xl font-extrabold">{title}</p><p className="mt-3 text-sm leading-7 text-[color:var(--text-secondary)]">{text}</p></article>;
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="premium-card p-6"><FiTrendingUp className="text-2xl text-[color:var(--secondary)]" /><p className="mt-5 font-heading text-4xl font-extrabold text-[color:var(--primary)]">{value}</p><p className="mt-2 text-sm font-semibold text-[color:var(--text-secondary)]">{label}</p></div>;
}

function List({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;
  return <div className="mt-8 premium-card p-6"><p className="font-heading text-2xl font-extrabold">{title}</p><ul className="mt-4 grid gap-3 text-[color:var(--text-secondary)]">{items.map((item) => <li key={item} className="flex gap-3"><FiCheckCircle className="mt-1 shrink-0 text-[color:var(--secondary)]" /> <span>{item}</span></li>)}</ul></div>;
}
