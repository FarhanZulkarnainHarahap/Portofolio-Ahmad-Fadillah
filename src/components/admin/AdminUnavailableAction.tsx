import Link from "next/link";
import { EmptyState } from "@/components/ui/EmptyState";

export function AdminUnavailableAction({ title, backHref }: { title: string; backHref: string }) {
  return (
    <EmptyState
      title={title}
      description="Form khusus untuk modul ini belum diaktifkan di frontend. Data tetap dikelola melalui Express API dan dashboard modul terkait."
      action={<Link className="inline-flex rounded-full bg-[color:var(--primary)] px-4 py-2 text-sm font-bold text-[color:var(--text-on-primary)]" href={backHref}>Kembali</Link>}
    />
  );
}
