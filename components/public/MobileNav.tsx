"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { gsap } from "gsap";
import { BrandLogo } from "./BrandLogo";

type NavItem = {
  id: string;
  label: string;
  href: string;
};

export function MobileNav({ items, brandName, tagline }: { items: NavItem[]; brandName?: string | null; tagline?: string | null }) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      panel.style.opacity = open ? "1" : "0";
      panel.style.pointerEvents = open ? "auto" : "none";
      return;
    }

    gsap.to(panel, {
      autoAlpha: open ? 1 : 0,
      y: open ? 0 : -10,
      duration: 0.22,
      ease: "power2.out",
      pointerEvents: open ? "auto" : "none",
    });
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={open ? "Tutup menu" : "Buka menu"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex size-11 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] text-[color:var(--text-primary)]"
      >
        {open ? <FiX aria-hidden /> : <FiMenu aria-hidden />}
      </button>
      <div ref={panelRef} className="invisible fixed inset-x-4 top-20 z-50 rounded-[var(--radius-lg)] border border-[color:var(--border)] bg-[color:var(--surface)] p-5 opacity-0 shadow-[var(--shadow-md)]">
        <BrandLogo brandName={brandName} tagline={tagline} variant="horizontal" size="sm" showTagline />
        <nav className="mt-5 grid gap-2" aria-label="Navigasi mobile">
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-[var(--radius-sm)] px-3 py-3 text-sm font-bold text-[color:var(--text-secondary)] transition hover:bg-[color:var(--primary-soft)] hover:text-[color:var(--primary)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
