import { apiGet, apiList } from "@/lib/server-api-client";
import type { Project } from "@/types/api";

export function getPublicProjects(query = "limit=24") {
  return apiList<Project>(`/public/projects?${query}`);
}

export function getFeaturedProjects(limit = 4) {
  return apiList<Project>(`/public/projects?featured=true&limit=${limit}`);
}

export function getPublicProject(slug: string) {
  return apiGet<Project>(`/public/projects/${slug}`);
}

export function getAdminProjects(limit = 50) {
  return apiList<Project>(`/admin/projects?limit=${limit}`, { auth: true });
}

export function getAdminProject(id: string) {
  return apiGet<Project>(`/admin/projects/${id}`, { auth: true });
}
