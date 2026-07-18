import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
};

export function ButtonLink({ href, children, variant = "primary" }: ButtonLinkProps) {
  const classes =
    variant === "primary"
      ? "bg-blue-700 text-white hover:bg-blue-800"
      : "border border-slate-300 bg-white text-slate-900 hover:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white";

  return (
    <Link className={`inline-flex min-h-11 items-center justify-center rounded-md px-5 text-sm font-semibold transition ${classes}`} href={href}>
      {children}
    </Link>
  );
}
