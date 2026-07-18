import { requireAdmin } from "@/lib/require-admin";
import { AdminUnavailableAction } from "@/components/admin/AdminUnavailableAction";

export default async function MessageDetailPage() {
  await requireAdmin();
  return <AdminUnavailableAction title="Detail pesan" backHref="/dashboard/admin/messages" />;
}
