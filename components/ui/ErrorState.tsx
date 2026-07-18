export function ErrorState({ message = "Data belum dapat dimuat." }: { message?: string }) {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-sm text-red-800 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-200">
      {message}
    </div>
  );
}
