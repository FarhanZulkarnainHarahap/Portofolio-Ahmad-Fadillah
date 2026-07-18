import { apiGet } from "@/lib/server-api-client";

export function getCurrentUser() {
  return apiGet<{ id: string; name: string }>("/auth/me", { auth: true });
}
