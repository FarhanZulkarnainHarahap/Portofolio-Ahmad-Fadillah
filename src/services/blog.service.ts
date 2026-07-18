import { apiGet, apiList } from "@/lib/server-api-client";
import type { SimpleContent } from "@/types/api";

export function getPublicBlogPosts(limit = 24) {
  return apiList<SimpleContent>(`/public/blog?limit=${limit}`);
}

export function getPublicBlogPost(slug: string) {
  return apiGet<SimpleContent>(`/public/blog/${slug}`);
}

export function getAdminBlogPosts(limit = 50) {
  return apiList<SimpleContent>(`/admin/blog-posts?limit=${limit}`, { auth: true });
}
