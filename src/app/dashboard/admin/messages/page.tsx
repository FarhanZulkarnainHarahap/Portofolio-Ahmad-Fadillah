import { requireAdmin } from "@/lib/require-admin";
import { AdminResourceList } from "@/components/admin/AdminResourceList";

export default async function AdminMessagesPage() {
  await requireAdmin();
  return <AdminResourceList title="Pesan" description="Tinjau pesan kontak yang masuk dari halaman publik." resource="messages" />;
}
