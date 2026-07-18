import { apiGet } from "@/lib/api";
import type { SimpleContent } from "@/types/api";
import { ContentGrid } from "@/components/public/ContentGrid";
import { PageHeader } from "@/components/public/PageHeader";
import { Section } from "@/components/public/Section";

export default async function DocumentsPage() {
  const response = await apiGet<SimpleContent[]>("/public/documents").catch(() => null);
  const items = response?.data ?? [];
  return (
    <>
      <PageHeader title="Dokumen" description="Dokumen portofolio HR dari Cloudinary dan database." />
      {items.length ? <Section eyebrow="Documents" title="Dokumen profesional yang bisa ditinjau."><ContentGrid items={items} /></Section> : null}
    </>
  );
}
