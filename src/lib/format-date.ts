export function formatDate(value?: string | Date | null, locale = "id-ID") {
  if (!value) return "-";
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return "-";
  return new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(date);
}
