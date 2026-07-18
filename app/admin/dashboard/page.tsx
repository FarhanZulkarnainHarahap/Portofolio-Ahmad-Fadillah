import Link from "next/link";
import { apiGet } from "@/lib/api";
import { requireAdmin } from "@/lib/require-admin";
import type { AdminDashboard } from "@/types/api";

export default async function AdminDashboardPage() {
  await requireAdmin();
  const response = await apiGet<AdminDashboard>("/admin/dashboard", { auth: true });
  const data = response.data;
  const cards = [
    ["Projects", data.projects],
    ["Experiences", data.experiences],
    ["Blog posts", data.blogPosts],
    ["Documents", data.documents],
    ["Certifications", data.certifications],
    ["New messages", data.newMessages],
    ["Draft posts", data.draftPosts],
    ["Published projects", data.publishedProjects],
  ];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Ringkasan konten aktual dari API.</p>
        </div>
        <Link className="rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white" href="/admin/projects/create">Create project</Link>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(([label, value]) => (
          <div key={label} className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm text-slate-500">{label}</p>
            <p className="mt-2 text-3xl font-bold">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
