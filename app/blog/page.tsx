import { apiList } from "@/lib/api";
import type { SimpleContent } from "@/types/api";
import { ContentGrid } from "@/components/public/ContentGrid";
import { PageHeader } from "@/components/public/PageHeader";
import { Section } from "@/components/public/Section";

export default async function BlogPage() {
  const response = await apiList<SimpleContent>("/public/blog?limit=24").catch(() => null);
  return (
    <>
      <PageHeader title="Blog" description="Artikel HR yang sudah dipublikasikan melalui dashboard admin." />
      <Section title="Artikel">
        <ContentGrid items={response?.data ?? []} empty="Belum ada artikel tersedia." hrefFor={(item) => `/blog/${item.slug}`} />
      </Section>
    </>
  );
}
