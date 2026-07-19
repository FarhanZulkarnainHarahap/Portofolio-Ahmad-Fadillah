import { requireAdmin } from "@/lib/require-admin";
import { AdminResourceList } from "@/components/admin/AdminResourceList";

export default async function AdminAchievementPage() {
  await requireAdmin();
  return <AdminResourceList title="Pencapaian" description="Kelola pencapaian profesional." resource="achievements" createHref="/dashboard/admin/achievement/create" editHrefBase="/dashboard/admin/achievement" />;
}
