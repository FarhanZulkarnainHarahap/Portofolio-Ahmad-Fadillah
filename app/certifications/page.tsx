import { apiGet } from "@/lib/api";
import type { SimpleContent } from "@/types/api";
import { ContentGrid } from "@/components/public/ContentGrid";
import { PageHeader } from "@/components/public/PageHeader";
import { Section } from "@/components/public/Section";

export default async function CertificationsPage() {
  const response = await apiGet<SimpleContent[]>("/public/certifications").catch(() => null);
  const items = response?.data ?? [];
  return (
    <>
      <PageHeader title="Sertifikasi" description="Sertifikasi profesional yang sudah dipublikasikan dari database." />
      {items.length ? <Section eyebrow="Credentials" title="Sertifikasi dan bukti pembelajaran profesional."><ContentGrid items={items} /></Section> : null}
    </>
  );
}
