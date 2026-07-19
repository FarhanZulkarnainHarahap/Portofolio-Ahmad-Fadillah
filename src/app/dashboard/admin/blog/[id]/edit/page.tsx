import { requireAdmin } from "@/lib/require-admin";
import { AdminContentForm } from "@/components/admin/AdminContentForm";
import { getAdminResourceItem } from "@/services/admin-resource.service";

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const response = await getAdminResourceItem("blog-posts", id);
  return (
    <div>
      <p className="editorial-label">Blog</p>
      <h1 className="mt-3 font-heading text-4xl font-extrabold">Edit artikel</h1>
      <AdminContentForm backHref="/dashboard/admin/blog" initialData={response.data} mode="edit" resource="blog-posts" />
    </div>
  );
}
