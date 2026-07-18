import { clientRequest } from "@/lib/api-client";

export function createTool(input: Record<string, unknown>) {
  return clientRequest("/admin/expertise", { method: "POST", body: JSON.stringify(input) });
}

export function updateTool(id: string, input: Record<string, unknown>) {
  return clientRequest(`/admin/expertise/${id}`, { method: "PATCH", body: JSON.stringify(input) });
}

export function deleteTool(id: string) {
  return clientRequest(`/admin/expertise/${id}`, { method: "DELETE" });
}

export function toggleToolStatus(id: string, isActive: boolean) {
  return updateTool(id, { isActive });
}

export function reorderTools(items: { id: string; sortOrder: number }[]) {
  return clientRequest("/admin/expertise/reorder", { method: "POST", body: JSON.stringify({ items }) });
}
