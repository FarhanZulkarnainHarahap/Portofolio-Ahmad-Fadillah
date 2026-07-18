import type { ApiResponse } from "@/types/api";
import { getApiBaseUrl } from "./api-config";

export async function clientRequest<T>(path: string, init: RequestInit = {}) {
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    credentials: "include",
    ...init,
    headers: {
      ...(init.body instanceof FormData ? {} : { "content-type": "application/json" }),
      ...init.headers,
    },
  });
  const json = (await response.json().catch(() => null)) as ApiResponse<T> | null;
  if (!response.ok || !json?.success) {
    throw new Error(json?.message ?? friendlyError(response.status));
  }
  return json.data;
}

export function friendlyError(status: number) {
  if (status === 401) return "Sesi berakhir. Silakan masuk kembali.";
  if (status === 403) return "Anda tidak memiliki akses untuk aksi ini.";
  if (status >= 500) return "Layanan sedang mengalami gangguan. Coba lagi nanti.";
  return "Permintaan belum dapat diproses.";
}
