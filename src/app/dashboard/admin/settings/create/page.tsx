import { AdminContentForm } from "@/components/admin/AdminContentForm";
import { requireAdmin } from "@/lib/require-admin";

export default async function CreateSettingPage() {
  await requireAdmin();
  return (
    <div>
      <p className="editorial-label">Pengaturan</p>
      <h1 className="mt-3 font-heading text-4xl font-extrabold">Tambah pengaturan</h1>
      <AdminContentForm backHref="/dashboard/admin/settings" mode="create" resource="site-settings" />
    </div>
  );
}
