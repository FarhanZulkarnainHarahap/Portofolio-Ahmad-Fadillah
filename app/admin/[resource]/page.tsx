import { apiList } from "@/lib/api";
import { requireAdmin } from "@/lib/require-admin";
import { EmptyState } from "@/components/ui/EmptyState";
import { itemTitle } from "@/lib/format";

const allowedResources = new Set([
  "profile",
  "statistics",
  "education",
  "experiences",
  "expertise",
  "achievements",
  "documents",
  "certifications",
  "testimonials",
  "blog-posts",
  "dashboard-widgets",
  "messages",
  "media",
  "site-settings",
  "navigation",
  "socials",
]);

export default async function AdminResourcePage({ params }: { params: Promise<{ resource: string }> }) {
  await requireAdmin();
  const { resource } = await params;
  if (!allowedResources.has(resource)) {
    return <EmptyState title="Modul admin belum tersedia." />;
  }

  const response = await apiList<Record<string, string | number | boolean | null>>(`/admin/${resource}?limit=50`, { auth: true }).catch(() => null);
  const rows = response?.data ?? [];

  return (
    <div>
      <h1 className="text-3xl font-bold capitalize">{resource.replaceAll("-", " ")}</h1>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Data aktual dari endpoint admin. CRUD penuh tersedia melalui REST API.</p>
      <div className="mt-6">
        {rows.length ? (
          <div className="grid gap-3">
            {rows.map((row) => (
              <article key={String(row.id)} className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                <p className="font-semibold">{itemTitle(row as { title?: string; name?: string; subject?: string })}</p>
                <p className="mt-2 text-xs text-slate-500">ID: {row.id}</p>
              </article>
            ))}
          </div>
        ) : <EmptyState title="Belum ada data pada modul ini." />}
      </div>
    </div>
  );
}
