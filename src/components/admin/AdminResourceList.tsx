import { FiDatabase, FiEdit3, FiPlus } from "react-icons/fi";
import Link from "next/link";
import { EmptyState } from "@/components/ui/EmptyState";
import { itemTitle } from "@/lib/format";
import { getAdminResource, type AdminResourceRow } from "@/services/admin-resource.service";
import { DeleteResourceButton } from "./DeleteResourceButton";

type AdminResourceListProps = {
  title: string;
  description: string;
  resource: string;
  createHref?: string;
  editHrefBase?: string;
};

export async function AdminResourceList({ title, description, resource, createHref, editHrefBase }: AdminResourceListProps) {
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
            {rows.map((row) => <AdminResourceCard key={String(row.id)} editHrefBase={editHrefBase} resource={resource} row={row} />)}
          </div>
        ) : <EmptyState title="Belum ada data pada modul ini." description="Tambahkan konten baru melalui tombol aksi yang tersedia." />}
      </div>
    </div>
  );
}

function AdminResourceCard({ row, resource, editHrefBase }: { row: AdminResourceRow; resource: string; editHrefBase?: string }) {
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
      <div className="flex shrink-0 flex-wrap justify-end gap-2">
        {editHrefBase ? (
          <Link className="inline-flex min-h-9 items-center gap-2 rounded-full border border-[color:var(--border)] px-3 text-xs font-bold hover:border-[color:var(--primary)]" href={`${editHrefBase}/${row.id}/edit`}>
            <FiEdit3 />
            Edit
          </Link>
        ) : null}
        <DeleteResourceButton id={row.id} resource={resource} />
      </div>
    </article>
  );
}
