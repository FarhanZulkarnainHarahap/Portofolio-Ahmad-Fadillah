import { requireAdmin } from "@/lib/require-admin";
import { AdminContentForm } from "@/components/admin/AdminContentForm";
import { getAdminResourceItem } from "@/services/admin-resource.service";

export default async function EditAchievementPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const response = await getAdminResourceItem("achievements", id);
  return (
    <div>
      <p className="editorial-label">Pencapaian</p>
      <h1 className="mt-3 font-heading text-4xl font-extrabold">Edit pencapaian</h1>
      <AdminContentForm backHref="/dashboard/admin/achievement" initialData={response.data} mode="edit" resource="achievements" />
    </div>
  );
}
