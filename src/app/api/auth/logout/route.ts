import { NextResponse, type NextRequest } from "next/server";
import { getApiBaseUrl } from "@/lib/api-config";

export async function POST(request: NextRequest) {
  await fetch(`${getApiBaseUrl()}/auth/logout`, {
    method: "POST",
    headers: {
      cookie: request.headers.get("cookie") ?? "",
    },
    cache: "no-store",
  }).catch(() => null);

  const response = NextResponse.json({ success: true });
  response.cookies.delete("accessToken");
  response.cookies.delete("refreshToken");
  return response;
}
