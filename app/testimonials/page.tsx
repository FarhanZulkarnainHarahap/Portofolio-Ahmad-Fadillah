import { apiGet } from "@/lib/api";
import type { SimpleContent } from "@/types/api";
import { ContentGrid } from "@/components/public/ContentGrid";
import { PageHeader } from "@/components/public/PageHeader";
import { Section } from "@/components/public/Section";

export default async function TestimonialsPage() {
  const response = await apiGet<SimpleContent[]>("/public/testimonials").catch(() => null);
  return (
    <>
      <PageHeader title="Testimonials" description="Testimoni profesional yang sudah disetujui admin." />
      <Section title="Testimoni">
        <ContentGrid items={response?.data ?? []} empty="Belum ada testimoni yang disetujui." />
      </Section>
    </>
  );
}
