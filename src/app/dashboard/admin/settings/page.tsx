import { requireAdmin } from "@/lib/require-admin";
import { AdminResourceList } from "@/components/admin/AdminResourceList";

export default async function AdminSettingsPage() {
  await requireAdmin();
  return <AdminResourceList title="Pengaturan" description="Kelola navigation, socials, dan pengaturan publik." resource="site-settings" />;
}
