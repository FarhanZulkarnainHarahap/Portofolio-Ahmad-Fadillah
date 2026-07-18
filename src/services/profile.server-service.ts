import { apiGet } from "@/lib/server-api-client";
import type { Profile } from "@/types/api";

export function getPublicProfile() {
  return apiGet<Profile | null>("/public/profile");
}

export function getAdminProfile() {
  return apiGet<Profile | null>("/admin/profile", { auth: true });
}
