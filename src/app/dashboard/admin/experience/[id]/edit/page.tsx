import { requireAdmin } from "@/lib/require-admin";
import { AdminUnavailableAction } from "@/components/admin/AdminUnavailableAction";

export default async function EditExperiencePage() {
  await requireAdmin();
  return <AdminUnavailableAction title="Edit pengalaman" backHref="/dashboard/admin/experience" />;
}
