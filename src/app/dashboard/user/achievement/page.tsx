import { ContentGrid } from "@/components/user/ContentGrid";
import { PageHeader } from "@/components/user/PageHeader";
import { Section } from "@/components/user/Section";
import { getPublicAchievements } from "@/services/achievement.service";

export default async function AchievementsPage() {
  const response = await getPublicAchievements().catch(() => null);
  const items = response?.data ?? [];
  return (
    <>
      <PageHeader title="Pencapaian" description="Evidence profesional yang sudah dipublikasikan melalui dashboard admin." />
      {items.length ? <Section eyebrow="Evidence" title="Capaian yang memperkuat kredibilitas."><ContentGrid items={items} /></Section> : null}
    </>
  );
}
