import { requireAdmin } from "@/lib/require-admin";
import { ToolForm } from "@/components/admin/ToolForm";

export default async function CreateToolPage() {
  await requireAdmin();
  return (
    <div>
      <p className="editorial-label">Tools</p>
      <h1 className="mt-3 font-heading text-4xl font-extrabold">Tambah Tool</h1>
      <ToolForm mode="create" />
    </div>
  );
}
