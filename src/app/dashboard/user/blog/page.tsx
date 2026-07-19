import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiCalendar, FiClock, FiStar } from "react-icons/fi";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/user/PageHeader";
import { Section } from "@/components/user/Section";
import { getPublicBlogPosts } from "@/services/blog.service";
import type { SimpleContent } from "@/types/api";

export default async function BlogPage() {
  const response = await getPublicBlogPosts(24).catch(() => null);
  const items = response?.data ?? [];
  const featured = items[0];
  const rest = items.slice(1);

  return (
    <>
      <PageHeader title="Artikel" description="Tulisan dan insight Human Resources untuk people, growth, dan culture." eyebrow="Blog • Human Resources" />
      <Section title="Insight Human Resources pilihan.">
        {featured ? (
          <>
            <Link href={`/blog/${featured.slug}`} className="group grid overflow-hidden rounded-[8px] border border-[color:var(--border)] bg-[color:var(--surface)] lg:grid-cols-[0.78fr_1fr]">
              <div className="p-8">
                <span className="inline-flex items-center gap-2 rounded-full bg-[color:var(--surface-soft)] px-4 py-2 text-xs font-bold uppercase text-[color:var(--primary)]"><FiStar /> Artikel Unggulan</span>
                <h2 className="mt-5 max-w-xl font-serif text-4xl font-semibold leading-tight text-[color:var(--text-primary)]">{featured.title}</h2>
                <div className="mt-4 flex flex-wrap gap-5 text-sm text-[color:var(--text-muted)]">
                  <span className="inline-flex items-center gap-2"><FiCalendar /> {featured.year ?? "Terbaru"}</span>
                  <span className="inline-flex items-center gap-2"><FiClock /> Artikel HR</span>
                </div>
                <p className="mt-5 max-w-2xl leading-7 text-[color:var(--text-secondary)]">{featured.excerpt ?? featured.description}</p>
                <span className="mt-7 inline-flex items-center gap-3 font-semibold text-[color:var(--primary)]">Baca selengkapnya <FiArrowRight /></span>
              </div>
              <div className="relative min-h-[300px] bg-[color:var(--surface-soft)]">
                <Image src="/me-about.jpeg" alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover object-[center_16%] grayscale transition group-hover:scale-[1.03]" />
              </div>
            </Link>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {rest.slice(0, 4).map((post) => <BlogCard key={post.id} post={post} />)}
            </div>
          </>
        ) : (
          <EmptyState title="Belum ada artikel yang tersedia." description="Tulisan dan insight HR akan muncul setelah siap dipublikasikan." />
        )}
      </Section>
    </>
  );
}

function BlogCard({ post }: { post: SimpleContent }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group overflow-hidden rounded-[8px] border border-[color:var(--border)] bg-[color:var(--surface)] transition hover:-translate-y-1 hover:border-[color:var(--primary)]">
      <div className="relative aspect-[16/9] bg-[color:var(--surface-soft)]">
        <Image src="/me-about.jpeg" alt="" fill sizes="25vw" className="object-cover object-[center_20%] grayscale transition group-hover:scale-[1.04]" />
      </div>
      <div className="p-5">
        {categoryLabel(post.category) ? <span className="rounded-full bg-[color:var(--primary-soft)] px-3 py-1 text-xs font-semibold text-[color:var(--primary)]">{categoryLabel(post.category)}</span> : null}
        <h3 className="mt-4 font-serif text-2xl font-semibold leading-tight text-[color:var(--text-primary)]">{post.title}</h3>
        <p className="mt-3 text-sm leading-6 text-[color:var(--text-secondary)]">{post.excerpt ?? post.description}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--primary)]">Baca selengkapnya <FiArrowRight /></span>
      </div>
    </Link>
  );
}

function categoryLabel(category: SimpleContent["category"]) {
  if (!category) return null;
  return typeof category === "string" ? category : category.name;
}
