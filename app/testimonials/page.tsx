import { apiGet } from "@/lib/api";
import type { SimpleContent } from "@/types/api";
import { ContentGrid } from "@/components/public/ContentGrid";
import { PageHeader } from "@/components/public/PageHeader";
import { Section } from "@/components/public/Section";

export default async function TestimonialsPage() {
  const response = await apiGet<SimpleContent[]>("/public/testimonials").catch(() => null);
  const items = response?.data ?? [];
  return (
    <>
      <PageHeader title="Testimoni" description="Testimoni profesional yang sudah disetujui admin." />
      {items.length ? <Section eyebrow="Trust" title="Suara profesional dari relasi kerja."><ContentGrid items={items} /></Section> : null}
    </>
  );
}
