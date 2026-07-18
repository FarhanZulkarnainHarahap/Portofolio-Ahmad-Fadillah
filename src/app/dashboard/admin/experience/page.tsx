import { requireAdmin } from "@/lib/require-admin";
import { AdminResourceList } from "@/components/admin/AdminResourceList";

export default async function AdminExperiencePage() {
  await requireAdmin();
  return <AdminResourceList title="Pengalaman" description="Kelola pengalaman kerja yang tampil di portofolio." resource="experiences" createHref="/dashboard/admin/experience/create" />;
}
