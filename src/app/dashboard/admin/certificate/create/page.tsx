import { requireAdmin } from "@/lib/require-admin";
import { AdminContentForm } from "@/components/admin/AdminContentForm";

export default async function CreateCertificatePage() {
  await requireAdmin();
  return (
    <div>
      <p className="editorial-label">Sertifikat</p>
      <h1 className="mt-3 font-heading text-4xl font-extrabold">Tambah sertifikat</h1>
      <AdminContentForm backHref="/dashboard/admin/certificate" mode="create" resource="certifications" />
    </div>
  );
}
