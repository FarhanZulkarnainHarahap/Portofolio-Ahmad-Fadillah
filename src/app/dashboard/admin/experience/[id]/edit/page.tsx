import { requireAdmin } from "@/lib/require-admin";
import { AdminContentForm } from "@/components/admin/AdminContentForm";
import { getAdminResourceItem } from "@/services/admin-resource.service";

export default async function EditExperiencePage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const response = await getAdminResourceItem("experiences", id);
  return (
    <div>
      <p className="editorial-label">Pengalaman</p>
      <h1 className="mt-3 font-heading text-4xl font-extrabold">Edit pengalaman</h1>
      <AdminContentForm backHref="/dashboard/admin/experience" initialData={response.data} mode="edit" resource="experiences" />
    </div>
  );
}
