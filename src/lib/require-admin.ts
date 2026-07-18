import { redirect } from "next/navigation";
import { getCurrentUser } from "@/services/auth.server-service";

export async function requireAdmin() {
  const me = await getCurrentUser().catch(() => null);
  if (!me) redirect("/auth/login");
  return me.data;
}
