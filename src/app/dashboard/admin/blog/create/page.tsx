import { requireAdmin } from "@/lib/require-admin";
import { AdminUnavailableAction } from "@/components/admin/AdminUnavailableAction";

export default async function CreateBlogPage() {
  await requireAdmin();
  return <AdminUnavailableAction title="Tulis artikel" backHref="/dashboard/admin/blog" />;
}
