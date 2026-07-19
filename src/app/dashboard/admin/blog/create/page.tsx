import { requireAdmin } from "@/lib/require-admin";
import { AdminContentForm } from "@/components/admin/AdminContentForm";

export default async function CreateBlogPage() {
  await requireAdmin();
  return (
    <div>
      <p className="editorial-label">Blog</p>
      <h1 className="mt-3 font-heading text-4xl font-extrabold">Tulis artikel</h1>
      <AdminContentForm backHref="/dashboard/admin/blog" mode="create" resource="blog-posts" />
    </div>
  );
}
