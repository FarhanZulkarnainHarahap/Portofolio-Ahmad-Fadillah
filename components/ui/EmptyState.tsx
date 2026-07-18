import type { ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  description?: string;
  action?: ReactNode;
};

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="rounded-[var(--radius-lg)] border border-dashed border-[color:var(--border-strong)] bg-[color:var(--surface)]/75 p-8 text-center text-[color:var(--text-secondary)]">
      <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-[color:var(--primary-soft)] text-[color:var(--primary)]">
        <span aria-hidden className="size-3 rounded-full bg-current" />
      </div>
      <p className="font-heading text-lg font-extrabold text-[color:var(--text-primary)]">{title}</p>
      {description ? <p className="mx-auto mt-2 max-w-md text-sm leading-6">{description}</p> : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
