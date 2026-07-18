import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/user/PageHeader";
import { Section } from "@/components/user/Section";
import { getPublicBlogPost } from "@/services/blog.service";

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const response = await getPublicBlogPost(slug).catch(() => null);
  const post = response?.data;
  if (!post) return <EmptyState title="Artikel tidak ditemukan." />;

  return (
    <>
      <PageHeader title={post.title ?? "Artikel HR"} description={post.excerpt ?? "Insight Human Resources untuk people, growth, dan culture."} />
      {post.content ? (
        <Section eyebrow="Insight" title="Catatan profesional">
          <article className="premium-card max-w-4xl p-7 text-base leading-8 text-[color:var(--text-secondary)]" dangerouslySetInnerHTML={{ __html: post.content }} />
          <Link href="/blog" className="mt-8 inline-flex items-center gap-2 rounded-full border border-[color:var(--border-strong)] px-4 py-2 text-sm font-bold"><FiArrowLeft /> Kembali</Link>
        </Section>
      ) : null}
    </>
  );
}
