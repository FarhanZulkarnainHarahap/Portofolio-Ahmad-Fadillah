import { clientRequest } from "@/lib/api-client";

export function sendContactMessage(input: Record<string, unknown>) {
  return clientRequest("/public/contact", { method: "POST", body: JSON.stringify(input) });
}
