import Link from "next/link";
import { FiEdit3, FiPlus } from "react-icons/fi";
import { apiList } from "@/lib/api";
import { requireAdmin } from "@/lib/require-admin";
import type { Project } from "@/types/api";
import { EmptyState } from "@/components/ui/EmptyState";
import { DeleteProjectButton } from "@/components/admin/DeleteProjectButton";

export default async function AdminProjectsPage() {
  await requireAdmin();
  const response = await apiList<Project>("/admin/projects?limit=50", { auth: true });
  const projects = response.data;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="editorial-label">Content</p>
          <h1 className="mt-3 font-heading text-4xl font-extrabold">Projects</h1>
          <p className="mt-2 text-sm text-[color:var(--text-secondary)]">Create, edit, publish, and delete HR projects.</p>
        </div>
        <Link className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[color:var(--primary)] px-5 text-sm font-bold text-white" href="/admin/projects/create"><FiPlus />Create project</Link>
      </div>
      <div className="mt-6">
        {projects.length ? (
          <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[color:var(--border)] bg-[color:var(--surface)] shadow-[var(--shadow-sm)]">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-[color:var(--surface-secondary)] text-[color:var(--text-muted)]">
                <tr>
                  <th className="px-5 py-4">Title</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Featured</th>
                  <th className="px-5 py-4">Year</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id} className="border-t border-[color:var(--border)]">
                    <td className="px-5 py-4">
                      <p className="font-heading text-base font-extrabold">{project.title}</p>
                      {project.category?.name ? <p className="mt-1 text-xs text-[color:var(--text-muted)]">{project.category.name}</p> : null}
                    </td>
                    <td className="px-5 py-4"><Status active={Boolean(project.isPublished)} activeText="Published" inactiveText="Draft" /></td>
                    <td className="px-5 py-4"><Status active={Boolean(project.isFeatured)} activeText="Featured" inactiveText="Regular" /></td>
                    <td className="px-5 py-4 text-[color:var(--text-secondary)]">{project.year ?? "-"}</td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <Link className="inline-flex min-h-9 items-center gap-2 rounded-full border border-[color:var(--border)] px-3 text-xs font-bold hover:border-[color:var(--primary)]" href={`/admin/projects/${project.id}/edit`}><FiEdit3 />Edit</Link>
                        <DeleteProjectButton id={project.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : <EmptyState title="Belum ada proyek di database." description="Buat proyek pertama melalui tombol Create project." action={<Link className="inline-flex rounded-full bg-[color:var(--primary)] px-4 py-2 text-sm font-bold text-white" href="/admin/projects/create">Tambah project pertama</Link>} />}
      </div>
    </div>
  );
}

function Status({ active, activeText, inactiveText }: { active: boolean; activeText: string; inactiveText: string }) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${active ? "bg-[color:var(--secondary-soft)] text-[color:var(--secondary)]" : "bg-[color:var(--accent-soft)] text-[color:var(--accent)]"}`}>
      {active ? activeText : inactiveText}
    </span>
  );
}
