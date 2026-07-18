import { FiArrowUpRight, FiDatabase, FiPlus } from "react-icons/fi";
import Link from "next/link";
import { EmptyState } from "@/components/ui/EmptyState";
import { itemTitle } from "@/lib/format";
import { getAdminResource, type AdminResourceRow } from "@/services/admin-resource.service";

type AdminResourceListProps = {
  title: string;
  description: string;
  resource: string;
  createHref?: string;
};

export async function AdminResourceList({ title, description, resource, createHref }: AdminResourceListProps) {
  const response = await getAdminResource(resource).catch(() => null);
  const rows = response?.data ?? [];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="editorial-label">Module</p>
          <h1 className="mt-3 font-heading text-4xl font-extrabold capitalize">{title}</h1>
          <p className="mt-2 text-sm text-[color:var(--text-secondary)]">{description}</p>
        </div>
        {createHref ? <Link className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[color:var(--primary)] px-5 text-sm font-bold text-[color:var(--text-on-primary)]" href={createHref}><FiPlus />Tambah</Link> : null}
      </div>
      <div className="mt-6">
        {rows.length ? (
          <div className="grid gap-3">
            {rows.map((row) => <AdminResourceCard key={String(row.id)} row={row} />)}
          </div>
        ) : <EmptyState title="Belum ada data pada modul ini." description="Gunakan dashboard admin atau endpoint terkait untuk menambahkan data baru." />}
      </div>
    </div>
  );
}

function AdminResourceCard({ row }: { row: AdminResourceRow }) {
  return (
    <article className="premium-card flex items-start justify-between gap-5 p-5">
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
  );
}
