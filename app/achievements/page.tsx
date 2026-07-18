import { apiGet } from "@/lib/api";
import type { SimpleContent } from "@/types/api";
import { ContentGrid } from "@/components/public/ContentGrid";
import { PageHeader } from "@/components/public/PageHeader";
import { Section } from "@/components/public/Section";

export default async function AchievementsPage() {
  const response = await apiGet<SimpleContent[]>("/public/achievements").catch(() => null);
  const items = response?.data ?? [];
  return (
    <>
      <PageHeader title="Pencapaian" description="Evidence profesional yang sudah dipublikasikan melalui dashboard admin." />
      {items.length ? <Section eyebrow="Evidence" title="Capaian yang memperkuat kredibilitas."><ContentGrid items={items} /></Section> : null}
    </>
  );
}
