import { apiGet, apiList } from "@/lib/server-api-client";

export type AdminResourceRow = Record<string, unknown> & { id: string };

export function getAdminResource(resource: string, limit = 50) {
  return apiList<AdminResourceRow>(`/admin/${resource}?limit=${limit}`, { auth: true });
}

export function getAdminResourceItem(resource: string, id: string) {
  return apiGet<AdminResourceRow>(`/admin/${resource}/${id}`, { auth: true });
}
