export function getErrorMessage(error: unknown, fallback = "Terjadi kesalahan. Coba lagi nanti.") {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return fallback;
}
