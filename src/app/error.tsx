"use client";

import { BrandLogo } from "@/components/branding/BrandLogo";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="grid min-h-screen place-items-center px-4">
      <div className="premium-card max-w-md p-8 text-center">
        <BrandLogo variant="stacked" size="lg" showTagline />
        <h1 className="mt-8 font-heading text-3xl font-extrabold">Konten belum dapat dimuat</h1>
        <p className="mt-3 text-sm leading-6 text-[color:var(--text-secondary)]">Silakan coba muat ulang halaman.</p>
        <button className="mt-6 rounded-full bg-[color:var(--primary)] px-5 py-3 text-sm font-bold text-white" onClick={reset} type="button">Coba lagi</button>
      </div>
    </section>
  );
}
