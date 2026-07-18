"use client";

import { useEffect } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

export function ThemeToggle() {
  useEffect(() => {
    const stored = window.localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const enabled = stored ? stored === "dark" : prefersDark;
    document.documentElement.classList.toggle("dark", enabled);
  }, []);

  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Ganti tema"
      className="inline-flex size-11 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] text-[color:var(--text-secondary)] transition hover:border-[color:var(--primary)] hover:text-[color:var(--primary)]"
    >
      <FiMoon aria-hidden className="dark:hidden" />
      <FiSun aria-hidden className="hidden dark:block" />
    </button>
  );
}
