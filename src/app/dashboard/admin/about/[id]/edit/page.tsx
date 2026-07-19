import { AdminContentForm } from "@/components/admin/AdminContentForm";
import { requireAdmin } from "@/lib/require-admin";
import { getAdminResourceItem } from "@/services/admin-resource.service";

export default async function EditEducationPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const response = await getAdminResourceItem("education", id);
  return (
    <div>
      <p className="editorial-label">Tentang Saya</p>
      <h1 className="mt-3 font-heading text-4xl font-extrabold">Edit education</h1>
      <AdminContentForm backHref="/dashboard/admin/about" initialData={response.data} mode="edit" resource="education" />
    </div>
  );
}
