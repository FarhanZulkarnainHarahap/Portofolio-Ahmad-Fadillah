import Link from "next/link";
import { FiArrowUpRight, FiBriefcase, FiFileText, FiMail, FiStar } from "react-icons/fi";
import { apiGet } from "@/lib/server-api-client";
import { requireAdmin } from "@/lib/require-admin";
import type { AdminDashboard } from "@/types/api";

export default async function AdminDashboardPage() {
  await requireAdmin();
  const response = await apiGet<AdminDashboard>("/admin/dashboard", { auth: true });
  const data = response.data;
  const cards = [
    ["Total Projects", data.projects, FiBriefcase, "/dashboard/admin/projects"],
    ["Published Projects", data.publishedProjects, FiArrowUpRight, "/dashboard/admin/projects"],
    ["Experiences", data.experiences, FiStar, "/dashboard/admin/experience"],
    ["Certifications", data.certifications, FiFileText, "/dashboard/admin/certificate"],
    ["New Messages", data.newMessages, FiMail, "/dashboard/admin/messages"],
    ["Draft Articles", data.draftPosts, FiFileText, "/dashboard/admin/blog"],
  ] as const;
  const totalSignals = data.projects + data.experiences + data.certifications + data.documents + data.blogPosts;

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="editorial-label">Overview</p>
          <h1 className="mt-3 overflow-wrap-anywhere font-heading text-3xl font-extrabold sm:text-4xl">Dashboard Admin</h1>
          <p className="mt-2 text-sm text-[color:var(--text-secondary)]">Ringkasan konten aktual dari API dan PostgreSQL.</p>
        </div>
        <Link className="inline-flex min-h-11 w-fit items-center rounded-full bg-[color:var(--primary)] px-5 text-sm font-bold text-[color:var(--text-on-primary)]" href="/dashboard/admin/projects/create">Create project</Link>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map(([label, value, Icon, href]) => (
          <Link key={label} href={href} className="premium-card p-5 transition hover:-translate-y-1 hover:border-[color:var(--primary)]">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-bold text-[color:var(--text-muted)]">{label}</p>
              <Icon className="text-[color:var(--primary)]" />
            </div>
            <p className="mt-5 font-heading text-4xl font-extrabold">{value}</p>
          </Link>
        ))}
      </div>
      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_0.75fr]">
        <section className="premium-card p-6">
          <p className="font-heading text-2xl font-extrabold">Content completion</p>
          <p className="mt-2 text-sm text-[color:var(--text-secondary)]">Sinyal konten aktif yang sudah masuk ke CMS.</p>
          <div className="mt-6 h-3 rounded-full bg-[color:var(--surface-secondary)]">
            <div className="h-full rounded-full bg-[color:var(--secondary)]" style={{ width: `${Math.min(100, totalSignals * 8)}%` }} />
          </div>
        </section>
        <section className="premium-card p-6">
          <p className="font-heading text-2xl font-extrabold">Quick actions</p>
          <div className="mt-5 grid gap-2">
            <Link className="rounded-[var(--radius-md)] border border-[color:var(--border)] px-4 py-3 text-sm font-bold hover:border-[color:var(--primary)]" href="/dashboard/admin/projects/create">Tambah project</Link>
            <Link className="rounded-[var(--radius-md)] border border-[color:var(--border)] px-4 py-3 text-sm font-bold hover:border-[color:var(--primary)]" href="/dashboard/admin/messages">Lihat pesan baru</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
