import Link from "next/link";
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
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Create, edit, publish, and delete HR projects.</p>
        </div>
        <Link className="rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white" href="/admin/projects/create">Create project</Link>
      </div>
      <div className="mt-6">
        {projects.length ? (
          <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 dark:bg-slate-800">
                <tr><th className="px-4 py-3">Title</th><th className="px-4 py-3">Published</th><th className="px-4 py-3">Featured</th><th className="px-4 py-3">Actions</th></tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id} className="border-t border-slate-200 dark:border-slate-800">
                    <td className="px-4 py-3 font-medium">{project.title}</td>
                    <td className="px-4 py-3">{project.isPublished ? "Yes" : "No"}</td>
                    <td className="px-4 py-3">{project.isFeatured ? "Yes" : "No"}</td>
                    <td className="flex gap-2 px-4 py-3">
                      <Link className="rounded-md border border-slate-300 px-3 py-1.5" href={`/admin/projects/${project.id}/edit`}>Edit</Link>
                      <DeleteProjectButton id={project.id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : <EmptyState title="Belum ada proyek di database." description="Buat proyek pertama melalui tombol Create project." />}
      </div>
    </div>
  );
}
