import Link from "next/link";
import type { ReactNode } from "react";
import {
  FiActivity,
  FiAward,
  FiBarChart2,
  FiBookOpen,
  FiBriefcase,
  FiGrid,
  FiMail,
  FiSettings,
  FiStar,
  FiTrendingUp,
  FiUser,
} from "react-icons/fi";
import { BrandLogo } from "@/components/branding/BrandLogo";
import { AdminMobileNav } from "@/components/admin/AdminMobileNav";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { ThemeToggle } from "@/components/user/ThemeToggle";

const links = [
  ["/dashboard/admin/home", "Dashboard", FiGrid],
  ["/dashboard/admin/profile", "Profil", FiUser],
  ["/dashboard/admin/about", "Tentang Saya", FiBarChart2],
  ["/dashboard/admin/about/tools", "Tools", FiTrendingUp],
  ["/dashboard/admin/experience", "Pengalaman", FiBriefcase],
  ["/dashboard/admin/achievement", "Pencapaian", FiAward],
  ["/dashboard/admin/projects", "Proyek", FiActivity],
  ["/dashboard/admin/certificate", "Sertifikat", FiStar],
  ["/dashboard/admin/blog", "Blog", FiBookOpen],
  ["/dashboard/admin/messages", "Pesan", FiMail],
  ["/dashboard/admin/settings", "Pengaturan", FiSettings],
] as const;

export default async function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[color:var(--surface-secondary)]/70">
      <AdminMobileNav />
      <div className="mx-auto flex max-w-[1440px] gap-6 px-4 py-4 sm:px-6 lg:px-8 lg:py-5">
        <aside className="sticky top-5 hidden h-[calc(100vh-2.5rem)] w-72 shrink-0 flex-col rounded-[var(--radius-xl)] border border-[color:var(--border)] bg-[color:var(--surface)] p-4 shadow-[var(--shadow-sm)] lg:flex">
          <BrandLogo variant="horizontal" size="sm" showTagline />
          <nav className="mt-7 grid flex-1 content-start gap-1 overflow-y-auto pr-1" aria-label="Admin navigation">
            {links.map(([href, label, Icon]) => (
              <Link
                key={href}
                className="group flex items-center gap-3 rounded-[var(--radius-md)] px-3 py-2.5 text-sm font-bold text-[color:var(--text-secondary)] transition hover:bg-[color:var(--primary-soft)] hover:text-[color:var(--primary)]"
                href={href}
              >
                <span className="h-5 w-1 rounded-full bg-transparent transition group-hover:bg-[color:var(--primary)]" />
                <Icon aria-hidden />
                {label}
              </Link>
            ))}
          </nav>
          <div className="border-t border-[color:var(--border)] pt-4">
            <LogoutButton />
          </div>
        </aside>
        <section className="min-w-0 flex-1">
          <div className="mb-5 flex flex-col gap-4 rounded-[var(--radius-xl)] border border-[color:var(--border)] bg-[color:var(--surface)] p-4 shadow-[var(--shadow-sm)] sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[color:var(--secondary)]">Admin CMS</p>
              <p className="mt-1 overflow-wrap-anywhere font-heading text-lg font-extrabold text-[color:var(--text-primary)] sm:text-xl">Human Resources Portfolio</p>
            </div>
            <div className="hidden items-center gap-2 lg:flex">
              <ThemeToggle />
              <LogoutButton />
            </div>
          </div>
          {children}
        </section>
      </div>
    </div>
  );
}
