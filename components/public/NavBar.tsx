import Link from "next/link";
import { FiDownload } from "react-icons/fi";
import { apiGet } from "@/lib/api";
import type { Profile } from "@/types/api";
import { BrandLogo } from "./BrandLogo";
import { MobileNav } from "./MobileNav";
import { ThemeToggle } from "./ThemeToggle";

type SettingsPayload = {
  navigation: { id: string; label: string; href: string; location: string }[];
};

const fallbackItems = [
  { id: "home", label: "Beranda", href: "/" },
  { id: "about", label: "Tentang Saya", href: "/about" },
  { id: "experience", label: "Pengalaman", href: "/experience" },
  { id: "expertise", label: "Keahlian", href: "/expertise" },
  { id: "projects", label: "Proyek HR", href: "/projects" },
  { id: "certificates", label: "Sertifikasi", href: "/certifications" },
  { id: "contact", label: "Kontak", href: "/contact" },
];

export async function NavBar() {
  const [settings, profile] = await Promise.all([
    apiGet<SettingsPayload>("/public/settings").catch(() => null),
    apiGet<Profile | null>("/public/profile").catch(() => null),
  ]);
  const configuredItems = settings?.data.navigation.filter((item) => item.location === "header") ?? [];
  const navItems = configuredItems.length ? configuredItems : fallbackItems;
  const person = profile?.data;

  return (
    <header className="sticky top-4 z-40 px-4">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)]/88 px-3 py-2 shadow-[var(--shadow-sm)] backdrop-blur-xl sm:px-4"
        aria-label="Navigasi utama"
      >
        <BrandLogo href="/" brandName={person?.name} tagline="Human Resources Portfolio" variant="horizontal" size="sm" />
        <div className="hidden items-center gap-1 rounded-full bg-[color:var(--surface-secondary)] p-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.id}
              className="rounded-full px-3 py-2 text-sm font-semibold text-[color:var(--text-secondary)] transition hover:bg-[color:var(--surface)] hover:text-[color:var(--primary)]"
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/documents"
            className="hidden min-h-11 items-center gap-2 rounded-full bg-[color:var(--primary)] px-4 text-sm font-bold text-white transition hover:bg-[color:var(--primary-hover)] sm:inline-flex"
          >
            <FiDownload aria-hidden />
            <span className="hidden sm:inline">Download CV</span>
          </Link>
          <MobileNav items={navItems} brandName={person?.name} tagline="Human Resources Portfolio" />
        </div>
      </nav>
    </header>
  );
}
