import { requireAdmin } from "@/lib/require-admin";
import { AdminResourceList } from "@/components/admin/AdminResourceList";

export default async function AdminProfilePage() {
  await requireAdmin();
  return <AdminResourceList title="Profil" description="Kelola profil utama portofolio." resource="profile" />;
}
