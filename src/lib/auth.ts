import { DEFAULT_ADMIN_HOME, DEFAULT_USER_HOME, LOGIN_PATH } from "./constants";

export function getLoginRedirect(callbackUrl?: string | null) {
  if (!callbackUrl) return DEFAULT_ADMIN_HOME;
  if (callbackUrl.startsWith("/dashboard/admin")) return callbackUrl;
  return DEFAULT_ADMIN_HOME;
}

export function getPostLogoutRedirect() {
  return DEFAULT_USER_HOME;
}

export function getLoginPath(callbackUrl?: string) {
  if (!callbackUrl) return LOGIN_PATH;
  return `${LOGIN_PATH}?callbackUrl=${encodeURIComponent(callbackUrl)}`;
}
