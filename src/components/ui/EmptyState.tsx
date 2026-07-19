import type { ReactNode } from "react";
import { FiArchive } from "react-icons/fi";

type EmptyStateProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  icon?: ReactNode;
};

export function EmptyState({ title, description, action, icon }: EmptyStateProps) {
  return (
    <div className="rounded-[10px] border border-[color:var(--border)] bg-[color:var(--surface)] p-5 text-[color:var(--text-secondary)] shadow-[var(--shadow-sm)] sm:p-6">
      <div className="mb-4 flex size-11 items-center justify-center rounded-full bg-[color:var(--primary-soft)] text-xl text-[color:var(--primary)]">
        {icon ?? <FiArchive aria-hidden />}
      </div>
      <p className="font-serif text-xl font-semibold text-[color:var(--text-primary)]">{title}</p>
      {description ? <p className="mt-2 max-w-lg text-sm leading-6">{description}</p> : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
