import { requireAdmin } from "@/lib/require-admin";
import { AdminUnavailableAction } from "@/components/admin/AdminUnavailableAction";

export default async function EditBlogPage() {
  await requireAdmin();
  return <AdminUnavailableAction title="Edit artikel" backHref="/dashboard/admin/blog" />;
}
