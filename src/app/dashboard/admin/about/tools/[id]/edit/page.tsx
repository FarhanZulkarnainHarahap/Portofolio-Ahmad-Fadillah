import { requireAdmin } from "@/lib/require-admin";
import { ToolForm } from "@/components/admin/ToolForm";
import { getToolById } from "@/services/tools.server-service";

export default async function EditToolPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const response = await getToolById(id);
  return (
    <div>
      <p className="editorial-label">Tools</p>
      <h1 className="mt-3 font-heading text-4xl font-extrabold">Edit Tool</h1>
      <ToolForm mode="edit" tool={response.data} />
    </div>
  );
}
