import Link from "next/link";
import { FiEdit3, FiPlus } from "react-icons/fi";
import { requireAdmin } from "@/lib/require-admin";
import { EmptyState } from "@/components/ui/EmptyState";
import { getAdminTools } from "@/services/tools.server-service";

export default async function AdminToolsPage() {
  await requireAdmin();
  const response = await getAdminTools(50).catch(() => null);
  const tools = response?.data ?? [];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="editorial-label">About</p>
          <h1 className="mt-3 font-heading text-4xl font-extrabold">Tools</h1>
          <p className="mt-2 text-sm text-[color:var(--text-secondary)]">Kelola tools melalui data expertise yang tersedia dari Express API.</p>
        </div>
        <Link className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[color:var(--primary)] px-5 text-sm font-bold text-white" href="/dashboard/admin/about/tools/create"><FiPlus />Tambah Tool</Link>
      </div>
      <div className="mt-6">
        {tools.length ? (
          <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[color:var(--border)] bg-[color:var(--surface)] shadow-[var(--shadow-sm)]">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-[color:var(--surface-secondary)] text-[color:var(--text-muted)]">
                <tr><th className="px-5 py-4">Nama</th><th className="px-5 py-4">Kategori</th><th className="px-5 py-4">Tingkat</th><th className="px-5 py-4">Status</th><th className="px-5 py-4 text-right">Aksi</th></tr>
              </thead>
              <tbody>
                {tools.map((tool) => (
                  <tr key={tool.id} className="border-t border-[color:var(--border)]">
                    <td className="px-5 py-4 font-heading font-extrabold">{tool.name}</td>
                    <td className="px-5 py-4 text-[color:var(--text-secondary)]">{tool.category?.name ?? "-"}</td>
                    <td className="px-5 py-4 text-[color:var(--text-secondary)]">{tool.level ?? "-"}</td>
                    <td className="px-5 py-4"><span className="rounded-full bg-[color:var(--secondary-soft)] px-3 py-1 text-xs font-bold text-[color:var(--secondary)]">Active</span></td>
                    <td className="px-5 py-4 text-right"><Link className="inline-flex min-h-9 items-center gap-2 rounded-full border border-[color:var(--border)] px-3 text-xs font-bold" href={`/dashboard/admin/about/tools/${tool.id}/edit`}><FiEdit3 />Edit</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : <EmptyState title="Belum ada tools." description="Tools menggunakan data expertise dari Express API agar tidak ada data hardcoded di frontend." />}
      </div>
    </div>
  );
}
