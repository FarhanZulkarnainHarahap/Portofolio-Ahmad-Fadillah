import { apiList } from "@/lib/api";
import type { Project } from "@/types/api";
import { ContentGrid } from "@/components/public/ContentGrid";
import { PageHeader } from "@/components/public/PageHeader";
import { Section } from "@/components/public/Section";

export default async function ProjectsPage() {
  const response = await apiList<Project>("/public/projects?limit=24").catch(() => null);
  return (
    <>
      <PageHeader title="Projects" description="Proyek HR yang sudah dipublikasikan melalui dashboard admin." />
      <Section title="Daftar proyek">
        <ContentGrid items={response?.data ?? []} empty="Belum ada proyek yang dipublikasikan." hrefFor={(item) => `/projects/${item.slug}`} />
      </Section>
    </>
  );
}
