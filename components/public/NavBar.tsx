import Link from "next/link";
import { FiDownload } from "react-icons/fi";
import { apiGet } from "@/lib/api";
import { ThemeToggle } from "./ThemeToggle";

type SettingsPayload = {
  navigation: { id: string; label: string; href: string; location: string }[];
};

export async function NavBar() {
  const settings = await apiGet<SettingsPayload>("/public/settings").catch(() => null);
  const navItems = settings?.data.navigation.filter((item) => item.location === "header") ?? [];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8" aria-label="Main navigation">
        <Link href="/" className="text-sm font-bold uppercase tracking-[0.18em] text-blue-700 dark:text-cyan-300">
          HR Portfolio
        </Link>
        <div className="hidden items-center gap-5 lg:flex">
          {navItems.map((item) => (
            <Link key={item.id} className="text-sm font-medium text-slate-700 hover:text-blue-700 dark:text-slate-200 dark:hover:text-cyan-300" href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/documents"
            className="inline-flex min-h-10 items-center gap-2 rounded-md bg-blue-700 px-3 text-sm font-semibold text-white transition hover:bg-blue-800"
          >
            <FiDownload aria-hidden />
            <span className="hidden sm:inline">Download CV</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
