import { ContentGrid } from "@/components/user/ContentGrid";
import { PageHeader } from "@/components/user/PageHeader";
import { Section } from "@/components/user/Section";
import { getPublicCertificates } from "@/services/certificate.service";

export default async function CertificationsPage() {
  const response = await getPublicCertificates().catch(() => null);
  const items = response?.data ?? [];
  return (
    <>
      <PageHeader title="Sertifikasi" description="Sertifikasi profesional yang sudah dipublikasikan dari database." />
      {items.length ? <Section eyebrow="Credentials" title="Sertifikasi dan bukti pembelajaran profesional."><ContentGrid items={items} /></Section> : null}
    </>
  );
}
