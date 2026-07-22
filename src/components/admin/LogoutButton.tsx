"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { toast } from "sonner";
import { logout } from "@/services/auth.service";

export function LogoutButton({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  async function handleLogout() {
    setIsPending(true);
    try {
      await logout();
      toast.success("Berhasil logout.");
    } catch {
      toast.info("Sesi ditutup dari browser.");
    } finally {
      router.replace("/auth/login");
      router.refresh();
      setIsPending(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isPending}
      className={
        compact
          ? "inline-flex size-11 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] text-[color:var(--text-secondary)] transition hover:border-[color:var(--primary)] hover:text-[color:var(--primary)] disabled:opacity-60"
          : "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[color:var(--border-strong)] px-4 text-sm font-bold text-[color:var(--text-primary)] transition hover:border-[color:var(--primary)] hover:text-[color:var(--primary)] disabled:opacity-60"
      }
      aria-label="Logout"
    >
      <FiLogOut aria-hidden />
      {compact ? null : <span>{isPending ? "Keluar..." : "Logout"}</span>}
    </button>
  );
}
