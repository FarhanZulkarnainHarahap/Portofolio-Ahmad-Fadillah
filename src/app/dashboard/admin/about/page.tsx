import { requireAdmin } from "@/lib/require-admin";
import { AdminResourceList } from "@/components/admin/AdminResourceList";

export default async function AdminAboutPage() {
  await requireAdmin();
  return <AdminResourceList title="Tentang Saya" description="Kelola education, expertise, dan konten pendukung profil." resource="education" createHref="/dashboard/admin/about/create" editHrefBase="/dashboard/admin/about" />;
}
