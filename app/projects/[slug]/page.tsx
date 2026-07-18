import Link from "next/link";
import { apiGet } from "@/lib/api";
import type { Project } from "@/types/api";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/public/PageHeader";
import { Section } from "@/components/public/Section";

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const response = await apiGet<Project>(`/public/projects/${slug}`).catch(() => null);
  const project = response?.data;
  if (!project) return <EmptyState title="Project tidak ditemukan atau belum dipublikasikan." />;

  return (
    <>
      <PageHeader title={project.title} description={project.shortDescription ?? "Detail proyek HR."} />
      <Section title="Informasi proyek">
        <div className="grid gap-4 md:grid-cols-3">
          <Info label="Organisasi" value={project.organization} />
          <Info label="Tahun" value={project.year?.toString()} />
          <Info label="Peran" value={project.role} />
        </div>
      </Section>
      <Section title="Problem, solution, result">
        <div className="grid gap-5 lg:grid-cols-3">
          <Panel title="Problem" text={project.problem} />
          <Panel title="Solution" text={project.solution} />
          <Panel title="Result" text={project.resultsText} />
        </div>
      </Section>
      <Section title="Metrics">
        {project.metrics?.length ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{project.metrics.map((metric) => <Info key={metric.id} label={metric.label} value={`${metric.value}${metric.unit ?? ""}`} />)}</div> : <EmptyState title="Metrik proyek belum ditambahkan." />}
        <Link href="/projects" className="mt-8 inline-flex rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold">Kembali</Link>
      </Section>
    </>
  );
}

function Info({ label, value }: { label: string; value?: string | null }) {
  return <div className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"><p className="text-sm text-slate-500">{label}</p><p className="mt-2 font-semibold">{value ?? "Belum diatur"}</p></div>;
}

function Panel({ title, text }: { title: string; text?: string | null }) {
  return <article className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"><p className="font-semibold">{title}</p><p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{text ?? "Belum ditambahkan."}</p></article>;
}
