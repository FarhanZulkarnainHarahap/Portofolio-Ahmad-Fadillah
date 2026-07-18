import { requireAdmin } from "@/lib/require-admin";
import { AdminUnavailableAction } from "@/components/admin/AdminUnavailableAction";

export default async function CreateCertificatePage() {
  await requireAdmin();
  return <AdminUnavailableAction title="Tambah sertifikat" backHref="/dashboard/admin/certificate" />;
}
