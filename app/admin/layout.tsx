import Link from "next/link";
import type { ReactNode } from "react";
import {
  FiActivity,
  FiAward,
  FiBarChart2,
  FiBookOpen,
  FiBriefcase,
  FiFileText,
  FiGrid,
  FiImage,
  FiMail,
  FiMessageSquare,
  FiSettings,
  FiStar,
  FiTrendingUp,
  FiUser,
} from "react-icons/fi";
import { BrandLogo } from "@/components/public/BrandLogo";
import { ThemeToggle } from "@/components/public/ThemeToggle";

const links = [
  ["/admin/dashboard", "Dashboard", FiGrid],
  ["/admin/profile", "Profile", FiUser],
  ["/admin/statistics", "Statistics", FiBarChart2],
  ["/admin/experiences", "Experience", FiBriefcase],
  ["/admin/expertise", "Expertise", FiTrendingUp],
  ["/admin/projects", "Projects", FiActivity],
  ["/admin/achievements", "Achievements", FiAward],
  ["/admin/documents", "Documents", FiFileText],
  ["/admin/certifications", "Certifications", FiStar],
  ["/admin/testimonials", "Testimonials", FiMessageSquare],
  ["/admin/blog-posts", "Blog", FiBookOpen],
  ["/admin/messages", "Messages", FiMail],
  ["/admin/media", "Media", FiImage],
  ["/admin/site-settings", "Settings", FiSettings],
] as const;

export default async function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[color:var(--surface-secondary)]/70">
      <div className="mx-auto flex max-w-[1440px] gap-6 px-4 py-5 sm:px-6 lg:px-8">
        <aside className="sticky top-5 hidden h-[calc(100vh-2.5rem)] w-72 shrink-0 rounded-[var(--radius-xl)] border border-[color:var(--border)] bg-[color:var(--surface)] p-4 shadow-[var(--shadow-sm)] lg:block">
          <BrandLogo variant="horizontal" size="sm" showTagline />
          <nav className="mt-7 grid gap-1" aria-label="Admin navigation">
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
        </aside>
        <section className="min-w-0 flex-1">
          <div className="mb-5 flex items-center justify-between rounded-[var(--radius-xl)] border border-[color:var(--border)] bg-[color:var(--surface)] p-4 shadow-[var(--shadow-sm)]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[color:var(--secondary)]">Admin CMS</p>
              <p className="mt-1 font-heading text-xl font-extrabold text-[color:var(--text-primary)]">Human Resources Portfolio</p>
            </div>
            <ThemeToggle />
          </div>
          {children}
        </section>
      </div>
    </div>
  );
}
