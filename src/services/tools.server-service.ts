import { apiGet, apiList } from "@/lib/server-api-client";
import type { Expertise } from "@/types/api";

export function getPublicTools() {
  return apiGet<Expertise[]>("/public/expertise");
}

export function getAdminTools(limit = 50) {
  return apiList<Expertise>(`/admin/expertise?limit=${limit}`, { auth: true });
}

export function getToolById(id: string) {
  return apiGet<Expertise>(`/admin/expertise/${id}`, { auth: true });
}
