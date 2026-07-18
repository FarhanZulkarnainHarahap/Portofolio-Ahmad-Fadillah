import { apiGet } from "@/lib/server-api-client";
import type { SimpleContent } from "@/types/api";

export function getPublicTestimonials() {
  return apiGet<SimpleContent[]>("/public/testimonials");
}
