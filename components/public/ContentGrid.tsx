import Link from "next/link";
import { EmptyState } from "@/components/ui/EmptyState";
import { itemTitle } from "@/lib/format";

type ContentGridProps<T extends { id: string; slug?: string; description?: string | null; shortDescription?: string | null; excerpt?: string | null }> = {
  items: T[];
  empty: string;
  hrefFor?: (item: T) => string;
};

export function ContentGrid<T extends { id: string; slug?: string; description?: string | null; shortDescription?: string | null; excerpt?: string | null; title?: string; name?: string }>({
  items,
  empty,
  hrefFor,
}: ContentGridProps<T>) {
  if (!items.length) return <EmptyState title={empty} />;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        const content = (
          <>
            <p className="text-lg font-semibold text-slate-950 dark:text-white">{itemTitle(item)}</p>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.description ?? item.shortDescription ?? item.excerpt}</p>
          </>
        );
        const classes = "rounded-lg border border-slate-200 bg-white p-5 transition hover:border-blue-500 dark:border-slate-800 dark:bg-slate-900";
        return hrefFor ? (
          <Link key={item.id} className={classes} href={hrefFor(item)}>
            {content}
          </Link>
        ) : (
          <article key={item.id} className={classes}>
            {content}
          </article>
        );
      })}
    </div>
  );
}
