"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  id: string;
  label: string;
  href: string;
};

export function ActiveNavLinks({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <div className="hidden items-center gap-5 xl:flex 2xl:gap-7" aria-label="Navigasi desktop">
      {items.map((item) => {
        const active = item.href === "/" ? pathname === "/" : pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.id}
            href={item.href}
            className={`relative py-6 text-sm font-semibold transition ${
              active ? "text-[color:var(--primary)]" : "text-[color:var(--text-primary)] hover:text-[color:var(--primary)]"
            }`}
          >
            {item.label}
            <span
              className={`absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-[color:var(--primary)] transition ${
                active ? "opacity-100" : "opacity-0"
              }`}
            />
          </Link>
        );
      })}
    </div>
  );
}
