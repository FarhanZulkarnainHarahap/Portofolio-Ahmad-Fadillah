import { apiList } from "@/lib/server-api-client";

export function getAdminMessages(limit = 50) {
  return apiList<Record<string, string | number | boolean | null>>(`/admin/messages?limit=${limit}`, { auth: true });
}
