import Link from "next/link";
import { FiDownload } from "react-icons/fi";
import { BrandLogo } from "@/components/branding/BrandLogo";
import { ActiveNavLinks } from "./ActiveNavLinks";
import { MobileNav } from "./MobileNav";
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
    <header className="sticky top-0 z-40 border-b border-[color:var(--border)] bg-[color:var(--surface)]/92 px-4 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-[1500px] items-center justify-between gap-4" aria-label="Navigasi utama">
        <BrandLogo href="/" brandName={person?.name} tagline="Human Resources Portfolio" variant="horizontal" size="md" />
        <ActiveNavLinks items={navItems} />
        <div className="flex items-center gap-2">
          <Link
            href="/certificate"
            className="hidden min-h-11 items-center gap-2 rounded-[6px] bg-[color:var(--primary)] px-5 text-sm font-bold text-[color:var(--text-on-primary)] shadow-[var(--shadow-sm)] transition hover:bg-[color:var(--primary-hover)] sm:inline-flex"
          >
            <FiDownload aria-hidden />
            <span>Download CV</span>
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
