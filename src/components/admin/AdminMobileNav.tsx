"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FiActivity,
  FiAward,
  FiBarChart2,
  FiBookOpen,
  FiBriefcase,
  FiGrid,
  FiMail,
  FiMenu,
  FiSettings,
  FiStar,
  FiTrendingUp,
  FiUser,
  FiX,
} from "react-icons/fi";
import { BrandLogo } from "@/components/branding/BrandLogo";
import { ThemeToggle } from "@/components/user/ThemeToggle";
import { LogoutButton } from "./LogoutButton";

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

export function AdminMobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <header className="sticky top-0 z-[80] border-b border-[color:var(--border)] bg-[color:var(--surface)]/95 px-4 py-3 shadow-[var(--shadow-sm)] backdrop-blur">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3">
          <BrandLogo variant="horizontal" size="sm" />
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LogoutButton compact />
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-full border border-[color:var(--border)] text-xl text-[color:var(--text-primary)]"
              aria-expanded={open}
              aria-controls="admin-mobile-nav"
              aria-label={open ? "Tutup menu admin" : "Buka menu admin"}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <FiX aria-hidden /> : <FiMenu aria-hidden />}
            </button>
          </div>
        </div>
      </header>

      <button
        type="button"
        aria-label="Tutup menu admin"
        className={`fixed inset-0 z-[90] bg-[rgba(45,42,38,0.48)] backdrop-blur-[2px] transition ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setOpen(false)}
      />

      <aside
        id="admin-mobile-nav"
        className={`fixed inset-y-0 right-0 z-[100] flex w-[min(22rem,calc(100vw-2rem))] flex-col border-l border-[color:var(--border)] bg-[color:var(--surface)] shadow-[0_24px_70px_rgba(45,42,38,0.22)] transition-transform duration-200 ${open ? "translate-x-0" : "translate-x-full"}`}
        aria-label="Navigasi admin mobile"
      >
        <div className="flex items-center justify-between gap-3 border-b border-[color:var(--border)] p-4">
          <BrandLogo variant="horizontal" size="sm" showTagline />
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full border border-[color:var(--border)]"
            aria-label="Tutup menu admin"
            onClick={() => setOpen(false)}
          >
            <FiX aria-hidden />
          </button>
        </div>
        <nav className="grid flex-1 content-start gap-1 overflow-y-auto p-3">
          {links.map(([href, label, Icon]) => {
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`flex min-h-12 items-center gap-3 rounded-[var(--radius-md)] px-4 text-sm font-bold transition ${
                  active
                    ? "bg-[color:var(--primary-soft)] text-[color:var(--primary)]"
                    : "text-[color:var(--text-secondary)] hover:bg-[color:var(--surface-soft)] hover:text-[color:var(--primary)]"
                }`}
              >
                <Icon aria-hidden className="text-lg" />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-[color:var(--border)] p-4">
          <LogoutButton />
        </div>
      </aside>
    </div>
  );
}
