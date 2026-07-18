"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteProject } from "@/services/project.service";

export function DeleteProjectButton({ id }: { id: string }) {
  const router = useRouter();
  async function onDelete() {
    if (!window.confirm("Hapus project ini?")) return;
    await deleteProject(id);
    toast.success("Project deleted.");
    router.refresh();
  }

  return <button onClick={onDelete} className="inline-flex min-h-9 items-center rounded-full border border-[color:var(--danger)]/40 px-3 text-xs font-bold text-[color:var(--danger)] hover:bg-[color:var(--danger-soft)]" type="button">Delete</button>;
}
