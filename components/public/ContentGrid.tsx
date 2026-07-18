import Link from "next/link";
import { itemTitle } from "@/lib/format";

type ContentGridProps<T extends { id: string; slug?: string; description?: string | null; shortDescription?: string | null; excerpt?: string | null }> = {
  items: T[];
  empty?: string;
  hrefFor?: (item: T) => string;
};

export function ContentGrid<T extends { id: string; slug?: string; description?: string | null; shortDescription?: string | null; excerpt?: string | null; title?: string; name?: string }>({
  items,
  hrefFor,
}: ContentGridProps<T>) {
  if (!items.length) return null;

  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => {
        const content = (
          <>
            <div className="mb-8 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[color:var(--secondary)]">Evidence</span>
              <span className="font-heading text-3xl font-extrabold text-[color:var(--primary-soft)]">{String(index + 1).padStart(2, "0")}</span>
            </div>
            <p className="font-heading text-xl font-extrabold text-[color:var(--text-primary)]">{itemTitle(item)}</p>
            <p className="mt-3 text-sm leading-6 text-[color:var(--text-secondary)]">{item.description ?? item.shortDescription ?? item.excerpt}</p>
          </>
        );
        const classes = "premium-card group p-6 transition hover:-translate-y-1 hover:border-[color:var(--primary)]";
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
