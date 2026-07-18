import { apiGet } from "@/lib/api";
import type { SimpleContent } from "@/types/api";
import { ContentGrid } from "@/components/public/ContentGrid";
import { PageHeader } from "@/components/public/PageHeader";
import { Section } from "@/components/public/Section";

export default async function AchievementsPage() {
  const response = await apiGet<SimpleContent[]>("/public/achievements").catch(() => null);
  return (
    <>
      <PageHeader title="Achievements" description="Pencapaian HR yang sudah dipublikasikan." />
      <Section title="Pencapaian">
        <ContentGrid items={response?.data ?? []} empty="Belum ada pencapaian yang dipublikasikan." />
      </Section>
    </>
  );
}
