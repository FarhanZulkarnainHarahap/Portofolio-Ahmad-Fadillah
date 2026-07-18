import { ProjectForm } from "@/components/admin/ProjectForm";
import { requireAdmin } from "@/lib/require-admin";

export default async function CreateProjectPage() {
  await requireAdmin();
  return (
    <div>
      <p className="editorial-label">Projects</p>
      <h1 className="mt-3 font-heading text-4xl font-extrabold">Create project</h1>
      <ProjectForm mode="create" />
    </div>
  );
}
