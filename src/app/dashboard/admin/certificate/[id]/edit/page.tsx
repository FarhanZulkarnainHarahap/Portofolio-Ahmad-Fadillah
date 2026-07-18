import { requireAdmin } from "@/lib/require-admin";
import { AdminUnavailableAction } from "@/components/admin/AdminUnavailableAction";

export default async function EditCertificatePage() {
  await requireAdmin();
  return <AdminUnavailableAction title="Edit sertifikat" backHref="/dashboard/admin/certificate" />;
}
