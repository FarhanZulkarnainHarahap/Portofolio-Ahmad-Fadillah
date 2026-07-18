import { clientRequest } from "@/lib/api-client";
import type { Profile } from "@/types/api";

export function updateProfile(input: Record<string, unknown>) {
  return clientRequest<Profile>("/admin/profile", { method: "PATCH", body: JSON.stringify(input) });
}

export function uploadProfilePhoto(formData: FormData) {
  return clientRequest("/admin/media/upload", { method: "POST", body: formData });
}

export function uploadCV(formData: FormData) {
  return clientRequest("/admin/media/upload", { method: "POST", body: formData });
}
