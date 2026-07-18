import { apiGet } from "@/lib/server-api-client";

export type SettingsPayload = {
  navigation: { id: string; label: string; href: string; location: string }[];
  socials: { id: string; label: string; url: string }[];
};

export function getPublicSettings() {
  return apiGet<SettingsPayload>("/public/settings");
}
