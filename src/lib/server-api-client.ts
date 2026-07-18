import { cookies } from "next/headers";
import type { ApiListResponse, ApiResponse } from "@/types/api";
import { getApiBaseUrl } from "./api-config";
import { friendlyError } from "./api-client";

type RequestOptions = RequestInit & {
  auth?: boolean;
};

export async function apiClient<T>(path: string, options: RequestOptions = {}) {
  const headers = await buildHeaders(options);
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    cache: "no-store",
    credentials: "include",
    ...options,
    headers,
  });
  return parseResponse<T>(response);
}

export async function apiGet<T>(path: string, options: RequestOptions = {}) {
  return apiClient<ApiResponse<T>>(path, options);
}

export async function apiList<T>(path: string, options: RequestOptions = {}) {
  return apiClient<ApiListResponse<T>>(path, options);
}

export async function apiSend<T>(path: string, init: RequestOptions) {
  return apiClient<ApiResponse<T>>(path, init);
}

async function buildHeaders(options: RequestOptions) {
  const headers = new Headers(options.headers);
  if (!(options.body instanceof FormData) && options.body && !headers.has("content-type")) {
    headers.set("content-type", "application/json");
  }
  if (options.auth) {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; ");
    if (cookieHeader) headers.set("cookie", cookieHeader);
  }
  return headers;
}

async function parseResponse<T>(response: Response): Promise<T> {
  const json = (await response.json().catch(() => null)) as T | null;
  if (!response.ok || !json) {
    throw new Error(friendlyError(response.status));
  }
  return json;
}
