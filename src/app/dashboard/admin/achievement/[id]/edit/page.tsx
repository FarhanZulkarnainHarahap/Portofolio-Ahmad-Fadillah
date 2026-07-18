import { requireAdmin } from "@/lib/require-admin";
import { AdminUnavailableAction } from "@/components/admin/AdminUnavailableAction";

export default async function EditAchievementPage() {
  await requireAdmin();
  return <AdminUnavailableAction title="Edit pencapaian" backHref="/dashboard/admin/achievement" />;
}
