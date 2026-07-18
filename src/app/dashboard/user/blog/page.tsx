import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiCalendar, FiClock, FiStar } from "react-icons/fi";
import { PageHeader } from "@/components/user/PageHeader";
import { Section } from "@/components/user/Section";
import { getPublicBlogPosts } from "@/services/blog.service";
import type { SimpleContent } from "@/types/api";

const fallbackPosts: SimpleContent[] = [
  { id: "engagement", title: "5 Cara Meningkatkan Employee Engagement di Perusahaan", slug: "5-cara-meningkatkan-employee-engagement-di-perusahaan", excerpt: "Employee engagement yang tinggi berdampak langsung pada produktivitas, retensi, dan budaya kerja.", category: "Employee Engagement", year: 2024 },
  { id: "jd", title: "Panduan Membuat Job Description yang Efektif", slug: "panduan-membuat-job-description-yang-efektif", excerpt: "Job description yang jelas membantu menarik talent yang tepat dan menyelaraskan ekspektasi sejak awal.", category: "Talent Management", year: 2024 },
  { id: "onboarding", title: "Strategi Onboarding yang Membuat Karyawan Betah", slug: "strategi-onboarding-yang-membuat-karyawan-betah", excerpt: "Onboarding yang efektif bukan hanya orientasi, tetapi membangun koneksi dan mempercepat adaptasi karyawan baru.", category: "Onboarding", year: 2024 },
  { id: "digital", title: "Peran HR dalam Transformasi Digital", slug: "peran-hr-dalam-transformasi-digital", excerpt: "HR memiliki peran kunci dalam menyiapkan talenta dan budaya organisasi di era digital.", category: "HR Strategy", year: 2024 },
  { id: "training", title: "Mengukur ROI Program Pelatihan Karyawan", slug: "mengukur-roi-program-pelatihan-karyawan", excerpt: "Ketahui cara mengukur dampak pelatihan terhadap kinerja dan hasil bisnis secara nyata.", category: "Learning & Development", year: 2024 },
];

export default async function BlogPage() {
  const response = await getPublicBlogPosts(24).catch(() => null);
  const items = response?.data?.length ? response.data : fallbackPosts;
  const featured = items[0];
  const rest = items.slice(1);

  return (
    <>
      <PageHeader title="Artikel" description="Tulisan dan insight Human Resources untuk people, growth, dan culture." eyebrow="Blog • Human Resources" />
      <Section title="Berbagi pengalaman, strategi, dan panduan praktis seputar dunia HR.">
        <div className="mb-6 flex flex-wrap gap-3">
          {["Semua", "Employee Engagement", "Talent Management", "HR Strategy", "Learning & Development", "Culture", "HR Tools"].map((item, index) => (
            <span key={item} className={`rounded-[6px] border px-4 py-2 text-sm font-semibold ${index === 0 ? "border-[color:var(--primary)] bg-[color:var(--primary)] text-[color:var(--text-on-primary)]" : "border-[color:var(--border)] bg-[color:var(--surface)] text-[color:var(--text-secondary)]"}`}>{item}</span>
          ))}
        </div>

        {featured ? (
          <Link href={`/blog/${featured.slug}`} className="group grid overflow-hidden rounded-[8px] border border-[color:var(--border)] bg-[color:var(--surface)] lg:grid-cols-[0.78fr_1fr]">
            <div className="p-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-[color:var(--surface-soft)] px-4 py-2 text-xs font-bold uppercase text-[color:var(--primary)]"><FiStar /> Artikel Unggulan</span>
              <h2 className="mt-5 max-w-xl font-serif text-4xl font-semibold leading-tight text-[color:var(--text-primary)]">{featured.title}</h2>
              <div className="mt-4 flex flex-wrap gap-5 text-sm text-[color:var(--text-muted)]">
                <span className="inline-flex items-center gap-2"><FiCalendar /> 20 Mei 2024</span>
                <span className="inline-flex items-center gap-2"><FiClock /> 6 menit baca</span>
              </div>
              <p className="mt-5 max-w-2xl leading-7 text-[color:var(--text-secondary)]">{featured.excerpt ?? featured.description}</p>
              <span className="mt-7 inline-flex items-center gap-3 font-semibold text-[color:var(--primary)]">Baca selengkapnya <FiArrowRight /></span>
            </div>
            <div className="relative min-h-[300px] bg-[color:var(--surface-soft)]">
              <Image src="/me-about.jpeg" alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover object-[center_16%] grayscale transition group-hover:scale-[1.03]" />
            </div>
          </Link>
        ) : null}

        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {rest.slice(0, 4).map((post, index) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group overflow-hidden rounded-[8px] border border-[color:var(--border)] bg-[color:var(--surface)] transition hover:-translate-y-1 hover:border-[color:var(--primary)]">
              <div className="relative aspect-[16/9] bg-[color:var(--surface-soft)]">
                <Image src="/me-about.jpeg" alt="" fill sizes="25vw" className="object-cover object-[center_20%] grayscale transition group-hover:scale-[1.04]" />
              </div>
              <div className="p-5">
                <span className="rounded-full bg-[color:var(--primary-soft)] px-3 py-1 text-xs font-semibold text-[color:var(--primary)]">{categoryLabel(post.category) ?? ["Talent Management", "Onboarding", "HR Strategy", "Learning & Development"][index]}</span>
                <h3 className="mt-4 font-serif text-2xl font-semibold leading-tight text-[color:var(--text-primary)]">{post.title}</h3>
                <div className="mt-3 flex flex-wrap gap-4 text-xs text-[color:var(--text-muted)]">
                  <span className="inline-flex items-center gap-1"><FiCalendar /> {post.year ?? 2024}</span>
                  <span className="inline-flex items-center gap-1"><FiClock /> 5 menit baca</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-[color:var(--text-secondary)]">{post.excerpt ?? post.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--primary)]">Baca selengkapnya <FiArrowRight /></span>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}

function categoryLabel(category: SimpleContent["category"]) {
  if (!category) return null;
  return typeof category === "string" ? category : category.name;
}
