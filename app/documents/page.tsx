import { apiGet } from "@/lib/api";
import type { SimpleContent } from "@/types/api";
import { ContentGrid } from "@/components/public/ContentGrid";
import { PageHeader } from "@/components/public/PageHeader";
import { Section } from "@/components/public/Section";

export default async function DocumentsPage() {
  const response = await apiGet<SimpleContent[]>("/public/documents").catch(() => null);
  return (
    <>
      <PageHeader title="Documents" description="Dokumen portofolio HR dari Cloudinary dan database." />
      <Section title="Dokumen">
        <ContentGrid items={response?.data ?? []} empty="Belum ada dokumen portofolio." />
      </Section>
    </>
  );
}
