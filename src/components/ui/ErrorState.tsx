export function ErrorState({ message = "Data belum dapat dimuat." }: { message?: string }) {
  return (
    <div className="rounded-lg border border-[color:var(--danger)]/35 bg-[color:var(--danger-soft)] p-6 text-sm text-[color:var(--danger)]">
      {message}
    </div>
  );
}
