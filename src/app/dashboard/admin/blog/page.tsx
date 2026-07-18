import { requireAdmin } from "@/lib/require-admin";
import { AdminResourceList } from "@/components/admin/AdminResourceList";

export default async function AdminBlogPage() {
  await requireAdmin();
  return <AdminResourceList title="Blog" description="Kelola artikel dan insight HR." resource="blog-posts" createHref="/dashboard/admin/blog/create" />;
}
