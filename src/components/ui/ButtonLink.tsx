import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
};

export function ButtonLink({ href, children, variant = "primary" }: ButtonLinkProps) {
  const classes =
    variant === "primary"
      ? "bg-[color:var(--primary)] text-[color:var(--text-on-primary)] hover:bg-[color:var(--primary-hover)]"
      : variant === "secondary"
        ? "border border-[color:var(--border-strong)] bg-[color:var(--surface)] text-[color:var(--text-primary)] hover:border-[color:var(--primary)] hover:text-[color:var(--primary)]"
        : "text-[color:var(--primary)] hover:bg-[color:var(--primary-soft)]";

  return (
    <Link className={`inline-flex min-h-11 items-center justify-center rounded-full px-5 text-sm font-bold transition ${classes}`} href={href}>
      {children}
    </Link>
  );
}
