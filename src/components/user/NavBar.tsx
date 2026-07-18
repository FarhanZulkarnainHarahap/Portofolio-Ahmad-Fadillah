import Link from "next/link";
import { FiDownload } from "react-icons/fi";
import { BrandLogo } from "@/components/branding/BrandLogo";
import { MobileNav } from "./MobileNav";
import { ThemeToggle } from "@/components/user/ThemeToggle";
import { getPublicProfile } from "@/services/profile.server-service";
import { getPublicSettings } from "@/services/settings.service";

const fallbackItems = [
  { id: "home", label: "Beranda", href: "/" },
  { id: "about", label: "Tentang Saya", href: "/about" },
  { id: "experience", label: "Pengalaman", href: "/experience" },
  { id: "achievement", label: "Pencapaian", href: "/achievement" },
  { id: "projects", label: "Proyek", href: "/projects" },
  { id: "certificates", label: "Sertifikat", href: "/certificate" },
  { id: "blog", label: "Blog", href: "/blog" },
  { id: "contact", label: "Kontak", href: "/contact" },
];

export async function NavBar() {
  const [settings, profile] = await Promise.all([
    getPublicSettings().catch(() => null),
    getPublicProfile().catch(() => null),
  ]);
  const configuredItems = settings?.data.navigation.filter((item) => item.location === "header") ?? [];
  const navItems = configuredItems.length ? configuredItems.map((item) => ({ ...item, href: normalizeUserHref(item.href) })) : fallbackItems;
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
            href="/certificate"
            className="hidden min-h-11 items-center gap-2 rounded-full bg-[color:var(--primary)] px-4 text-sm font-bold text-[color:var(--text-on-primary)] transition hover:bg-[color:var(--primary-hover)] sm:inline-flex"
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

function normalizeUserHref(href: string) {
  if (href.startsWith("/dashboard/user/blog/")) return href.replace("/dashboard/user/blog", "/blog");
  if (href.startsWith("/dashboard/user/certificate/")) return href.replace("/dashboard/user/certificate", "/certificate");
  if (href.startsWith("/dashboard/user/projects/")) return href.replace("/dashboard/user/projects", "/projects");

  const map: Record<string, string> = {
    "/": "/",
    "/about": "/about",
    "/achievements": "/achievement",
    "/blog": "/blog",
    "/certifications": "/certificate",
    "/contact": "/contact",
    "/documents": "/certificate",
    "/experience": "/experience",
    "/expertise": "/about",
    "/projects": "/projects",
    "/testimonials": "/about",
    "/dashboard/user": "/",
    "/dashboard/user/home": "/",
    "/dashboard/user/about": "/about",
    "/dashboard/user/achievement": "/achievement",
    "/dashboard/user/blog": "/blog",
    "/dashboard/user/certificate": "/certificate",
    "/dashboard/user/contact": "/contact",
    "/dashboard/user/experience": "/experience",
    "/dashboard/user/projects": "/projects",
  };
  return map[href] ?? href;
}
