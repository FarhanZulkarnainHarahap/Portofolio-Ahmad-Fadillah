import { AdminContentForm } from "@/components/admin/AdminContentForm";
import { requireAdmin } from "@/lib/require-admin";
import { getAdminResourceItem } from "@/services/admin-resource.service";

export default async function EditProfilePage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const response = await getAdminResourceItem("profile", id);
  return (
    <div>
      <p className="editorial-label">Profil</p>
      <h1 className="mt-3 font-heading text-4xl font-extrabold">Edit profil</h1>
      <AdminContentForm backHref="/dashboard/admin/profile" initialData={response.data} mode="edit" resource="profile" />
    </div>
  );
}
