import { apiGet, apiList } from "@/lib/server-api-client";
import type { SimpleContent } from "@/types/api";

export function getPublicCertificates() {
  return apiGet<SimpleContent[]>("/public/certifications");
}

export function getAdminCertificates(limit = 50) {
  return apiList<SimpleContent>(`/admin/certifications?limit=${limit}`, { auth: true });
}
