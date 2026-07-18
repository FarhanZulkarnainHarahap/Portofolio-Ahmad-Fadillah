import { apiGet } from "@/lib/api";
import type { SimpleContent } from "@/types/api";
import { ContentGrid } from "@/components/public/ContentGrid";
import { PageHeader } from "@/components/public/PageHeader";
import { Section } from "@/components/public/Section";

export default async function CertificationsPage() {
  const response = await apiGet<SimpleContent[]>("/public/certifications").catch(() => null);
  return (
    <>
      <PageHeader title="Certifications" description="Sertifikasi profesional yang sudah dipublikasikan." />
      <Section title="Sertifikasi">
        <ContentGrid items={response?.data ?? []} empty="Belum ada sertifikasi tersedia." />
      </Section>
    </>
  );
}
