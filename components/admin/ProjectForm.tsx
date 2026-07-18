"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import type { Project } from "@/types/api";
import { clientRequest } from "@/lib/client-api";

const schema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  shortDescription: z.string().optional(),
  fullDescription: z.string().optional(),
  organization: z.string().optional(),
  year: z.coerce.number().optional(),
  duration: z.string().optional(),
  role: z.string().optional(),
  problem: z.string().optional(),
  solution: z.string().optional(),
  implementation: z.string().optional(),
  resultsText: z.string().optional(),
  lessons: z.string().optional(),
  isPublished: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
});

type ProjectValues = z.input<typeof schema>;

export function ProjectForm({ mode, project }: { mode: "create" | "edit"; project?: Project }) {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProjectValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: project?.title ?? "",
      slug: project?.slug ?? "",
      shortDescription: project?.shortDescription ?? "",
      fullDescription: project?.fullDescription ?? "",
      organization: project?.organization ?? "",
      year: project?.year ?? undefined,
      duration: project?.duration ?? "",
      role: project?.role ?? "",
      problem: project?.problem ?? "",
      solution: project?.solution ?? "",
      implementation: project?.implementation ?? "",
      resultsText: project?.resultsText ?? "",
      lessons: project?.lessons ?? "",
      isPublished: Boolean(project?.isPublished),
      isFeatured: Boolean(project?.isFeatured),
    },
  });

  async function onSubmit(values: z.output<typeof schema>) {
    const payload = { ...values, slug: values.slug || slugify(values.title) };
    if (mode === "create") {
      await clientRequest("/admin/projects", { method: "POST", body: JSON.stringify(payload) });
      toast.success("Project created.");
    } else {
      await clientRequest(`/admin/projects/${project!.id}`, { method: "PATCH", body: JSON.stringify(payload) });
      toast.success("Project updated.");
    }
    router.push("/admin/projects");
    router.refresh();
  }

  return (
    <form className="mt-6 grid gap-5 rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900" onSubmit={handleSubmit((values) => onSubmit(schema.parse(values)))}>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Title" error={errors.title?.message}><input className="form-input" {...register("title")} /></Field>
        <Field label="Slug" error={errors.slug?.message}><input className="form-input" {...register("slug")} /></Field>
      </div>
      <Field label="Short description" error={errors.shortDescription?.message}><textarea className="form-input min-h-24" {...register("shortDescription")} /></Field>
      <Field label="Full description" error={errors.fullDescription?.message}><textarea className="form-input min-h-32" {...register("fullDescription")} /></Field>
      <div className="grid gap-4 md:grid-cols-3">
        <Field label="Organization" error={errors.organization?.message}><input className="form-input" {...register("organization")} /></Field>
        <Field label="Year" error={errors.year?.message}><input className="form-input" type="number" {...register("year")} /></Field>
        <Field label="Duration" error={errors.duration?.message}><input className="form-input" {...register("duration")} /></Field>
      </div>
      <Field label="Role" error={errors.role?.message}><input className="form-input" {...register("role")} /></Field>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Problem" error={errors.problem?.message}><textarea className="form-input min-h-28" {...register("problem")} /></Field>
        <Field label="Solution" error={errors.solution?.message}><textarea className="form-input min-h-28" {...register("solution")} /></Field>
      </div>
      <Field label="Implementation" error={errors.implementation?.message}><textarea className="form-input min-h-28" {...register("implementation")} /></Field>
      <Field label="Result" error={errors.resultsText?.message}><textarea className="form-input min-h-28" {...register("resultsText")} /></Field>
      <Field label="Lessons" error={errors.lessons?.message}><textarea className="form-input min-h-28" {...register("lessons")} /></Field>
      <div className="flex flex-wrap gap-5 text-sm">
        <label className="inline-flex items-center gap-2"><input type="checkbox" {...register("isPublished")} /> Published</label>
        <label className="inline-flex items-center gap-2"><input type="checkbox" {...register("isFeatured")} /> Featured</label>
      </div>
      <div className="flex gap-3">
        <button className="min-h-11 rounded-md bg-blue-700 px-5 text-sm font-semibold text-white disabled:opacity-60" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Saving..." : "Save project"}
        </button>
        <button className="min-h-11 rounded-md border border-slate-300 px-5 text-sm font-semibold" type="button" onClick={() => router.push("/admin/projects")}>Cancel</button>
      </div>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return <label className="grid gap-2 text-sm font-medium"><span>{label}</span>{children}{error ? <span className="text-xs text-red-600">{error}</span> : null}</label>;
}

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
}
