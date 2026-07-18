import { apiGet } from "@/lib/api";
import type { Expertise } from "@/types/api";
import { ContentGrid } from "@/components/public/ContentGrid";
import { PageHeader } from "@/components/public/PageHeader";
import { Section } from "@/components/public/Section";

export default async function ExpertisePage() {
  const response = await apiGet<Expertise[]>("/public/expertise").catch(() => null);
  return (
    <>
      <PageHeader title="HR Expertise" description="Kategori dan kemampuan HR yang aktif di database." />
      <Section title="Keahlian aktif">
        <ContentGrid items={response?.data ?? []} empty="Belum ada expertise yang aktif." />
      </Section>
    </>
  );
}
