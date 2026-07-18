import { redirect } from "next/navigation";
import { apiGet } from "./api";

export async function requireAdmin() {
  const me = await apiGet<{ id: string; name: string }>("/auth/me", { auth: true }).catch(() => null);
  if (!me) redirect("/admin/login");
  return me.data;
}
