import { apiList } from "@/lib/server-api-client";

export type AdminResourceRow = Record<string, string | number | boolean | null>;

export function getAdminResource(resource: string, limit = 50) {
  return apiList<AdminResourceRow>(`/admin/${resource}?limit=${limit}`, { auth: true });
}
