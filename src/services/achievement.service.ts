import { apiGet, apiList } from "@/lib/server-api-client";
import type { SimpleContent } from "@/types/api";

export function getPublicAchievements() {
  return apiGet<SimpleContent[]>("/public/achievements");
}

export function getAdminAchievements(limit = 50) {
  return apiList<SimpleContent>(`/admin/achievements?limit=${limit}`, { auth: true });
}
