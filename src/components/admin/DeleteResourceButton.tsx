"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "sonner";
import { deleteAdminResource } from "@/services/admin-client.service";

export function DeleteResourceButton({ resource, id }: { resource: string; id: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function onDelete() {
    if (!window.confirm("Hapus data ini?")) return;
    setIsDeleting(true);
    try {
      await deleteAdminResource(resource, id);
      toast.success("Data dihapus.");
      router.refresh();
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <button className="inline-flex min-h-9 items-center gap-2 rounded-full border border-[color:var(--border)] px-3 text-xs font-bold text-[color:var(--danger)] hover:border-[color:var(--danger)] disabled:opacity-60" disabled={isDeleting} type="button" onClick={onDelete}>
      <FiTrash2 />
      {isDeleting ? "Menghapus..." : "Hapus"}
    </button>
  );
}
