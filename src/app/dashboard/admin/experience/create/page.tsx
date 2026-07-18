import { requireAdmin } from "@/lib/require-admin";
import { AdminUnavailableAction } from "@/components/admin/AdminUnavailableAction";

export default async function CreateExperiencePage() {
  await requireAdmin();
  return <AdminUnavailableAction title="Tambah pengalaman" backHref="/dashboard/admin/experience" />;
}
