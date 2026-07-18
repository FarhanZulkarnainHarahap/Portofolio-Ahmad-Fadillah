import { apiGet, apiList } from "@/lib/server-api-client";
import type { Experience } from "@/types/api";

export function getPublicExperiences() {
  return apiGet<Experience[]>("/public/experiences");
}

export function getAdminExperiences(limit = 50) {
  return apiList<Experience>(`/admin/experiences?limit=${limit}`, { auth: true });
}
