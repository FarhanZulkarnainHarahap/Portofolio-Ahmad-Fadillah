import { clientRequest } from "@/lib/api-client";

export function createAdminResource(resource: string, input: Record<string, unknown>) {
  return clientRequest(`/admin/${resource}`, { method: "POST", body: JSON.stringify(input) });
}

export function updateAdminResource(resource: string, id: string, input: Record<string, unknown>) {
  return clientRequest(`/admin/${resource}/${id}`, { method: "PATCH", body: JSON.stringify(input) });
}

export function deleteAdminResource(resource: string, id: string) {
  return clientRequest(`/admin/${resource}/${id}`, { method: "DELETE" });
}
