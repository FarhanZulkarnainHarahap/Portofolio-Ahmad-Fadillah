import { requireAdmin } from "@/lib/require-admin";
import { AdminUnavailableAction } from "@/components/admin/AdminUnavailableAction";

export default async function CreateAchievementPage() {
  await requireAdmin();
  return <AdminUnavailableAction title="Tambah pencapaian" backHref="/dashboard/admin/achievement" />;
}
