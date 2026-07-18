import { ContentGrid } from "@/components/user/ContentGrid";
import { PageHeader } from "@/components/user/PageHeader";
import { Section } from "@/components/user/Section";
import { getPublicBlogPosts } from "@/services/blog.service";

export default async function BlogPage() {
  const response = await getPublicBlogPosts(24).catch(() => null);
  const items = response?.data ?? [];
  return (
    <>
      <PageHeader title="Artikel" description="Tulisan Human Resources yang sudah dipublikasikan melalui dashboard admin." />
      {items.length ? <Section eyebrow="Insights" title="Catatan dan insight profesional HR."><ContentGrid items={items} hrefFor={(item) => `/dashboard/user/blog/${item.slug}`} /></Section> : null}
    </>
  );
}
