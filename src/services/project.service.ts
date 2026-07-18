import { clientRequest } from "@/lib/api-client";

export function createProject(input: Record<string, unknown>) {
  return clientRequest("/admin/projects", { method: "POST", body: JSON.stringify(input) });
}

export function updateProject(id: string, input: Record<string, unknown>) {
  return clientRequest(`/admin/projects/${id}`, { method: "PATCH", body: JSON.stringify(input) });
}

export function deleteProject(id: string) {
  return clientRequest(`/admin/projects/${id}`, { method: "DELETE" });
}
