import { FiArrowUpRight, FiDatabase } from "react-icons/fi";
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
  const title = resource.replaceAll("-", " ");

  return (
    <div>
      <div>
        <p className="editorial-label">Module</p>
        <h1 className="mt-3 font-heading text-4xl font-extrabold capitalize">{title}</h1>
        <p className="mt-2 text-sm text-[color:var(--text-secondary)]">Data aktual dari endpoint admin. CRUD penuh tersedia melalui REST API.</p>
      </div>
      <div className="mt-6">
        {rows.length ? (
          <div className="grid gap-3">
            {rows.map((row) => (
              <article key={String(row.id)} className="premium-card flex items-start justify-between gap-5 p-5">
                <div className="flex gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[color:var(--primary-soft)] text-[color:var(--primary)]">
                    <FiDatabase />
                  </div>
                  <div>
                    <p className="font-heading text-lg font-extrabold">{itemTitle(row as { title?: string; name?: string; subject?: string })}</p>
                    <p className="mt-2 text-xs text-[color:var(--text-muted)]">ID: {row.id}</p>
                  </div>
                </div>
                <FiArrowUpRight className="text-[color:var(--text-muted)]" />
              </article>
            ))}
          </div>
        ) : <EmptyState title="Belum ada data pada modul ini." description="Gunakan dashboard admin atau endpoint terkait untuk menambahkan data baru." />}
      </div>
    </div>
  );
}
