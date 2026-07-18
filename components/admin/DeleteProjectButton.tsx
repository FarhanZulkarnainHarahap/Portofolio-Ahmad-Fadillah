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

  return <button onClick={onDelete} className="rounded-md border border-red-300 px-3 py-1.5 text-red-700" type="button">Delete</button>;
}
