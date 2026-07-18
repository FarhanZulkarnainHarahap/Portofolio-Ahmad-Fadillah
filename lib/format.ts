export function displayDateRange(start?: string | null, end?: string | null, current?: boolean) {
  const startText = start ? new Intl.DateTimeFormat("id-ID", { month: "short", year: "numeric" }).format(new Date(start)) : "";
  const endText = current ? "Sekarang" : end ? new Intl.DateTimeFormat("id-ID", { month: "short", year: "numeric" }).format(new Date(end)) : "";
  return [startText, endText].filter(Boolean).join(" - ");
}

export function itemTitle(item: { title?: string; name?: string; subject?: string }) {
  return item.title ?? item.name ?? item.subject ?? "Untitled";
}
