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
      aria-label="Toggle theme"
      className="inline-flex size-10 items-center justify-center rounded-md border border-slate-300 text-slate-700 transition hover:border-blue-500 dark:border-slate-700 dark:text-slate-200"
    >
      <FiMoon aria-hidden className="dark:hidden" />
      <FiSun aria-hidden className="hidden dark:block" />
    </button>
  );
}
