import Link from "next/link";
import { BrandLogo } from "@/components/branding/BrandLogo";
import { getPublicProfile } from "@/services/profile.server-service";
import { getPublicSettings } from "@/services/settings.service";

export async function Footer() {
  const [settings, profile] = await Promise.all([
    getPublicSettings().catch(() => null),
    getPublicProfile().catch(() => null),
  ]);
  const footerNav = settings?.data.navigation.filter((item) => item.location !== "admin").map((item) => ({ ...item, href: normalizeUserHref(item.href) })) ?? [];
  const socials = settings?.data.socials ?? [];
  const person = profile?.data;

  return (
    <footer className="border-t border-[color:var(--border)] bg-[color:var(--surface-soft)]">
      <div className="mx-auto grid max-w-[1360px] items-center gap-4 px-6 py-6 text-sm text-[color:var(--text-secondary)] sm:px-8 lg:grid-cols-[1fr_auto_1fr]">
        <div>
          <BrandLogo brandName="Portofolio HR" tagline="Human Resources Portfolio" variant="horizontal" size="sm" />
          <p className="mt-1 text-xs">© {new Date().getFullYear()} {person?.name ?? "Ahamad Fadillah Harahap"}. All rights reserved.</p>
        </div>
        <p className="font-serif text-base italic text-[color:var(--text-secondary)] lg:text-center">Empowering People, Growing Together.</p>
        <div className="grid grid-cols-2 gap-x-5 gap-y-3 sm:flex sm:flex-wrap lg:justify-end">
          {(footerNav.length ? footerNav : fallbackFooter).slice(0, 8).map((item) => (
            <Link className="text-xs font-medium text-[color:var(--text-primary)] hover:text-[color:var(--primary)]" key={item.id} href={item.href}>{item.label}</Link>
          ))}
          {socials.slice(0, 1).map((item) => (
            <a className="text-xs font-medium text-[color:var(--primary)]" key={item.id} href={item.url} target="_blank" rel="noreferrer">{item.label}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

const fallbackFooter = [
  { id: "home", label: "Beranda", href: "/" },
  { id: "about", label: "Tentang Saya", href: "/about" },
  { id: "experience", label: "Pengalaman", href: "/experience" },
  { id: "achievement", label: "Pencapaian", href: "/achievement" },
  { id: "projects", label: "Proyek", href: "/projects" },
  { id: "certificate", label: "Sertifikat", href: "/certificate" },
  { id: "blog", label: "Blog", href: "/blog" },
  { id: "contact", label: "Kontak", href: "/contact" },
];

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
