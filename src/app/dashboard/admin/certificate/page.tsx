import { requireAdmin } from "@/lib/require-admin";
import { AdminResourceList } from "@/components/admin/AdminResourceList";

export default async function AdminCertificatePage() {
  await requireAdmin();
  return <AdminResourceList title="Sertifikat" description="Kelola sertifikasi dan kredensial profesional." resource="certifications" createHref="/dashboard/admin/certificate/create" />;
}
