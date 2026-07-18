import Link from "next/link";
import { apiGet } from "@/lib/api";
import type { SimpleContent } from "@/types/api";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/public/PageHeader";
import { Section } from "@/components/public/Section";

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const response = await apiGet<SimpleContent>(`/public/blog/${slug}`).catch(() => null);
  const post = response?.data;
  if (!post) return <EmptyState title="Artikel tidak ditemukan atau belum dipublikasikan." />;

  return (
    <>
      <PageHeader title={post.title ?? "Artikel HR"} description={post.excerpt ?? "Detail artikel HR."} />
      <Section title="Konten">
        <article className="prose max-w-3xl dark:prose-invert" dangerouslySetInnerHTML={{ __html: post.content ?? "<p>Konten artikel belum ditambahkan.</p>" }} />
        <Link href="/blog" className="mt-8 inline-flex rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold">Kembali</Link>
      </Section>
    </>
  );
}
