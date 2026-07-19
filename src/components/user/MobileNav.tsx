"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FiDownload, FiMenu, FiX } from "react-icons/fi";
import { gsap } from "gsap";
import { BrandLogo } from "@/components/branding/BrandLogo";

type NavItem = {
  id: string;
  label: string;
  href: string;
};

export function MobileNav({ items, brandName, tagline }: { items: NavItem[]; brandName?: string | null; tagline?: string | null }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    if (open) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    const panel = panelRef.current;
    const overlay = overlayRef.current;
    if (!panel || !overlay) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      panel.style.opacity = open ? "1" : "0";
      panel.style.transform = open ? "translateX(0)" : "translateX(1rem)";
      panel.style.pointerEvents = open ? "auto" : "none";
      overlay.style.opacity = open ? "1" : "0";
      overlay.style.pointerEvents = open ? "auto" : "none";
      return;
    }

    gsap.to(overlay, {
      autoAlpha: open ? 1 : 0,
      duration: 0.18,
      ease: "power2.out",
      pointerEvents: open ? "auto" : "none",
    });
    gsap.to(panel, {
      autoAlpha: open ? 1 : 0,
      x: open ? 0 : 24,
      duration: 0.24,
      ease: "power3.out",
      pointerEvents: open ? "auto" : "none",
    });
  }, [open]);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        aria-label={open ? "Tutup menu" : "Buka menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex size-11 items-center justify-center rounded-[10px] border border-[color:var(--border)] bg-[color:var(--surface)] text-xl text-[color:var(--text-primary)] shadow-[var(--shadow-sm)] transition hover:border-[color:var(--primary)] hover:text-[color:var(--primary)]"
      >
        {open ? <FiX aria-hidden /> : <FiMenu aria-hidden />}
      </button>
      <button
        ref={overlayRef}
        type="button"
        aria-label="Tutup menu navigasi"
        onClick={() => setOpen(false)}
        className="invisible fixed inset-0 z-40 bg-[color:var(--secondary)]/42 opacity-0 backdrop-blur-[2px]"
      />
      <aside
        id="mobile-menu"
        ref={panelRef}
        className="invisible fixed bottom-3 right-3 top-3 z-50 flex w-[min(22rem,calc(100vw-1.5rem))] translate-x-6 flex-col rounded-[14px] border border-[color:var(--border)] bg-[color:var(--surface)] p-5 opacity-0 shadow-[var(--shadow-lg)]"
        aria-label="Menu navigasi"
      >
        <div className="flex items-start justify-between gap-4">
          <BrandLogo brandName={brandName} tagline={tagline} variant="horizontal" size="sm" showTagline />
          <button
            type="button"
            aria-label="Tutup menu"
            onClick={() => setOpen(false)}
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-[10px] border border-[color:var(--border)] text-[color:var(--text-primary)]"
          >
            <FiX aria-hidden />
          </button>
        </div>
        <nav className="mt-6 grid gap-1" aria-label="Navigasi mobile">
          {items.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex min-h-12 items-center justify-between rounded-[10px] px-4 text-sm font-bold transition ${
                  active
                    ? "bg-[color:var(--primary-soft)] text-[color:var(--primary)]"
                    : "text-[color:var(--text-primary)] hover:bg-[color:var(--surface-soft)] hover:text-[color:var(--primary)]"
                }`}
              >
                {item.label}
                {active ? <span className="size-1.5 rounded-full bg-[color:var(--primary)]" aria-hidden /> : null}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto border-t border-[color:var(--border)] pt-5">
          <Link
            href="/certificate"
            onClick={() => setOpen(false)}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[10px] bg-[color:var(--primary)] px-4 text-sm font-bold text-[color:var(--text-on-primary)] transition hover:bg-[color:var(--primary-hover)]"
          >
            <FiDownload aria-hidden />
            Download CV
          </Link>
        </div>
      </aside>
    </div>
  );
}
