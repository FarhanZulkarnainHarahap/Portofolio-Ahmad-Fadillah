import { clientRequest } from "@/lib/api-client";

export function login(input: { email: string; password: string }) {
  return clientRequest("/auth/login", { method: "POST", body: JSON.stringify(input) });
}

export function logout() {
  return clientRequest("/auth/logout", { method: "POST" });
}

export function refreshSession() {
  return clientRequest("/auth/refresh", { method: "POST" });
}

export function changePassword(input: { currentPassword: string; nextPassword: string }) {
  return clientRequest("/auth/change-password", { method: "POST", body: JSON.stringify(input) });
}
