import { apiList } from "@/lib/api";
import type { SimpleContent } from "@/types/api";
import { ContentGrid } from "@/components/public/ContentGrid";
import { PageHeader } from "@/components/public/PageHeader";
import { Section } from "@/components/public/Section";

export default async function BlogPage() {
  const response = await apiList<SimpleContent>("/public/blog?limit=24").catch(() => null);
  const items = response?.data ?? [];
  return (
    <>
      <PageHeader title="Artikel" description="Tulisan Human Resources yang sudah dipublikasikan melalui dashboard admin." />
      {items.length ? <Section eyebrow="Insights" title="Catatan dan insight profesional HR."><ContentGrid items={items} hrefFor={(item) => `/blog/${item.slug}`} /></Section> : null}
    </>
  );
}
