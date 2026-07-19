import { requireAdmin } from "@/lib/require-admin";
import { AdminContentForm } from "@/components/admin/AdminContentForm";

export default async function CreateAchievementPage() {
  await requireAdmin();
  return (
    <div>
      <p className="editorial-label">Pencapaian</p>
      <h1 className="mt-3 font-heading text-4xl font-extrabold">Tambah pencapaian</h1>
      <AdminContentForm backHref="/dashboard/admin/achievement" mode="create" resource="achievements" />
    </div>
  );
}
