import { cookies } from "next/headers";
import type { ApiListResponse, ApiResponse } from "@/types/api";
import { apiBaseUrl } from "./api-config";

type RequestOptions = RequestInit & {
  auth?: boolean;
};

export async function apiGet<T>(path: string, options: RequestOptions = {}) {
  const headers = await getHeaders(options.auth);
  const response = await fetch(`${apiBaseUrl}${path}`, {
    cache: "no-store",
    credentials: "include",
    headers,
    ...options,
  });
  return parseResponse<ApiResponse<T>>(response);
}

export async function apiList<T>(path: string, options: RequestOptions = {}) {
  const headers = await getHeaders(options.auth);
  const response = await fetch(`${apiBaseUrl}${path}`, {
    cache: "no-store",
    credentials: "include",
    headers,
    ...options,
  });
  return parseResponse<ApiListResponse<T>>(response);
}

export async function apiSend<T>(path: string, init: RequestOptions) {
  const authHeaders = await getHeaders(init.auth);
  const response = await fetch(`${apiBaseUrl}${path}`, {
    credentials: "include",
    headers: {
      "content-type": "application/json",
      ...authHeaders,
      ...(init.headers as Record<string, string> | undefined),
    },
    ...init,
  });
  return parseResponse<ApiResponse<T>>(response);
}

async function getHeaders(auth?: boolean) {
  if (!auth) return {} as Record<string, string>;
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");
  return cookieHeader ? { cookie: cookieHeader } : {};
}

async function parseResponse<T>(response: Response): Promise<T> {
  const json = (await response.json().catch(() => null)) as T | null;
  if (!response.ok || !json) {
    throw new Error(json && typeof json === "object" && "message" in json ? String(json.message) : "Request failed");
  }
  return json;
}
