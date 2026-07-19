import { requireAdmin } from "@/lib/require-admin";
import { AdminContentForm } from "@/components/admin/AdminContentForm";

export default async function CreateExperiencePage() {
  await requireAdmin();
  return (
    <div>
      <p className="editorial-label">Pengalaman</p>
      <h1 className="mt-3 font-heading text-4xl font-extrabold">Tambah pengalaman</h1>
      <AdminContentForm backHref="/dashboard/admin/experience" mode="create" resource="experiences" />
    </div>
  );
}
