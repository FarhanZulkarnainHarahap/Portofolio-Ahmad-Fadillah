import { AdminContentForm } from "@/components/admin/AdminContentForm";
import { requireAdmin } from "@/lib/require-admin";

export default async function CreateEducationPage() {
  await requireAdmin();
  return (
    <div>
      <p className="editorial-label">Tentang Saya</p>
      <h1 className="mt-3 font-heading text-4xl font-extrabold">Tambah education</h1>
      <AdminContentForm backHref="/dashboard/admin/about" mode="create" resource="education" />
    </div>
  );
}
