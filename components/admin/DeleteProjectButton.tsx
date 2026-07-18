"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { clientRequest } from "@/lib/client-api";

export function DeleteProjectButton({ id }: { id: string }) {
  const router = useRouter();
  async function onDelete() {
    if (!window.confirm("Hapus project ini?")) return;
    await clientRequest(`/admin/projects/${id}`, { method: "DELETE" });
    toast.success("Project deleted.");
    router.refresh();
  }

  return <button onClick={onDelete} className="inline-flex min-h-9 items-center rounded-full border border-red-300 px-3 text-xs font-bold text-red-700 hover:bg-red-50" type="button">Delete</button>;
}
