"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { Expertise } from "@/types/api";
import { createTool, updateTool } from "@/services/tools.service";

type ToolValues = {
  name: string;
  description?: string;
  icon?: string;
  level?: number;
  sortOrder?: number;
  isActive?: boolean;
};

export function ToolForm({ mode, tool }: { mode: "create" | "edit"; tool?: Expertise }) {
  const router = useRouter();
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<ToolValues>({
    defaultValues: {
      name: tool?.name ?? "",
      description: tool?.description ?? "",
      icon: tool?.icon ?? "",
      level: tool?.level ?? undefined,
      sortOrder: 0,
      isActive: true,
    },
  });

  async function onSubmit(values: ToolValues) {
    if (mode === "create") {
      await createTool(values);
      toast.success("Tool berhasil ditambahkan.");
    } else {
      await updateTool(tool!.id, values);
      toast.success("Tool berhasil diperbarui.");
    }
    router.push("/dashboard/admin/about/tools");
    router.refresh();
  }

  return (
    <form className="mt-6 grid gap-5" onSubmit={handleSubmit(onSubmit)}>
      <FormSection title="Informasi utama" description="Nama, deskripsi, dan identitas tool.">
        <Field label="Nama"><input className="form-input" required {...register("name")} /></Field>
        <Field label="Deskripsi"><textarea className="form-input min-h-28" {...register("description")} /></Field>
        <Field label="Nama ikon"><input className="form-input" placeholder="Contoh: FiUsers" {...register("icon")} /></Field>
      </FormSection>
      <FormSection title="Kemampuan" description="Tingkat penguasaan dan urutan tampil.">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Tingkat penguasaan"><input className="form-input" min={0} max={100} type="number" {...register("level", { valueAsNumber: true })} /></Field>
          <Field label="Urutan"><input className="form-input" type="number" {...register("sortOrder", { valueAsNumber: true })} /></Field>
        </div>
        <label className="inline-flex items-center gap-2 text-sm font-bold text-[color:var(--text-secondary)]"><input type="checkbox" {...register("isActive")} /> Active</label>
      </FormSection>
      <div className="sticky bottom-4 flex justify-end gap-3 rounded-[var(--radius-lg)] border border-[color:var(--border)] bg-[color:var(--surface)] p-4 shadow-[var(--shadow-md)]">
        <button className="min-h-11 rounded-full bg-[color:var(--primary)] px-5 text-sm font-bold text-[color:var(--text-on-primary)] disabled:opacity-60" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Menyimpan..." : "Simpan tool"}
        </button>
        <button className="min-h-11 rounded-full border border-[color:var(--border-strong)] px-5 text-sm font-bold" type="button" onClick={() => router.push("/dashboard/admin/about/tools")}>Batal</button>
      </div>
    </form>
  );
}

function FormSection({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return <section className="premium-card grid gap-5 p-6"><div><p className="font-heading text-2xl font-extrabold">{title}</p><p className="mt-1 text-sm text-[color:var(--text-secondary)]">{description}</p></div>{children}</section>;
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className="grid gap-2 text-sm font-bold text-[color:var(--text-secondary)]"><span>{label}</span>{children}</label>;
}
