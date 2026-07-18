import { ProjectForm } from "@/components/admin/ProjectForm";
import { requireAdmin } from "@/lib/require-admin";

export default async function CreateProjectPage() {
  await requireAdmin();
  return (
    <div>
      <h1 className="text-3xl font-bold">Create project</h1>
      <ProjectForm mode="create" />
    </div>
  );
}
