import { apiGet } from "@/lib/api";
import { requireAdmin } from "@/lib/require-admin";
import type { Project } from "@/types/api";
import { ProjectForm } from "@/components/admin/ProjectForm";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const response = await apiGet<Project>(`/admin/projects/${id}`, { auth: true });
  return (
    <div>
      <p className="editorial-label">Projects</p>
      <h1 className="mt-3 font-heading text-4xl font-extrabold">Edit project</h1>
      <ProjectForm mode="edit" project={response.data} />
    </div>
  );
}
