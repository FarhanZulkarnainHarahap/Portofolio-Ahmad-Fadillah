import { requireAdmin } from "@/lib/require-admin";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { getAdminProject } from "@/services/project.server-service";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const response = await getAdminProject(id);
  return (
    <div>
      <p className="editorial-label">Projects</p>
      <h1 className="mt-3 font-heading text-4xl font-extrabold">Edit project</h1>
      <ProjectForm mode="edit" project={response.data} />
    </div>
  );
}
