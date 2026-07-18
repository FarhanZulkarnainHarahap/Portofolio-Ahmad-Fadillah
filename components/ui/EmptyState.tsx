type EmptyStateProps = {
  title: string;
  description?: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-white/70 p-8 text-center text-slate-600 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300">
      <p className="text-base font-semibold text-slate-900 dark:text-white">{title}</p>
      {description ? <p className="mt-2 text-sm">{description}</p> : null}
    </div>
  );
}
