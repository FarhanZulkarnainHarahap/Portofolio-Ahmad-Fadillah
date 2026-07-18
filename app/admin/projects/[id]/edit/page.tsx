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
      <h1 className="text-3xl font-bold">Edit project</h1>
      <ProjectForm mode="edit" project={response.data} />
    </div>
  );
}
