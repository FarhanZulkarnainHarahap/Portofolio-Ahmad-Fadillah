import { requireAdmin } from "@/lib/require-admin";
import { AdminContentForm } from "@/components/admin/AdminContentForm";
import { getAdminResourceItem } from "@/services/admin-resource.service";

export default async function EditCertificatePage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const response = await getAdminResourceItem("certifications", id);
  return (
    <div>
      <p className="editorial-label">Sertifikat</p>
      <h1 className="mt-3 font-heading text-4xl font-extrabold">Edit sertifikat</h1>
      <AdminContentForm backHref="/dashboard/admin/certificate" initialData={response.data} mode="edit" resource="certifications" />
    </div>
  );
}
