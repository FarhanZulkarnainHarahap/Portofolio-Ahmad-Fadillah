import { AdminContentForm } from "@/components/admin/AdminContentForm";
import { requireAdmin } from "@/lib/require-admin";

export default async function CreateProfilePage() {
  await requireAdmin();
  return (
    <div>
      <p className="editorial-label">Profil</p>
      <h1 className="mt-3 font-heading text-4xl font-extrabold">Tambah profil</h1>
      <AdminContentForm backHref="/dashboard/admin/profile" mode="create" resource="profile" />
    </div>
  );
}
