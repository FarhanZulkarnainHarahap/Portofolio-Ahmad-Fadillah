import { getApiBaseUrl } from "./api-config";

export async function clientRequest<T>(path: string, init: RequestInit = {}) {
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    credentials: "include",
    headers: {
      "content-type": "application/json",
      ...init.headers,
    },
    ...init,
  });
  const json = (await response.json().catch(() => null)) as { success: boolean; message: string; data: T } | null;
  if (!response.ok || !json?.success) {
    throw new Error(json?.message ?? "Request failed");
  }
  return json.data;
}
