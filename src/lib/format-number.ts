export function formatNumber(value?: number | string | null, locale = "id-ID") {
  const number = Number(value);
  if (!Number.isFinite(number)) return "-";
  return new Intl.NumberFormat(locale).format(number);
}
