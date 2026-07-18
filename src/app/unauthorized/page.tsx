import Link from "next/link";
import { BrandLogo } from "@/components/branding/BrandLogo";

export default function UnauthorizedPage() {
  return (
    <section className="grid min-h-screen place-items-center px-4">
      <div className="premium-card max-w-md p-8 text-center">
        <BrandLogo variant="stacked" size="lg" showTagline />
        <h1 className="mt-8 font-heading text-3xl font-extrabold">Akses tidak tersedia</h1>
        <p className="mt-3 text-sm leading-6 text-[color:var(--text-secondary)]">Silakan masuk menggunakan akun admin untuk membuka panel pengelolaan.</p>
        <Link className="mt-6 inline-flex rounded-full bg-[color:var(--primary)] px-5 py-3 text-sm font-bold text-white" href="/auth/login">Masuk</Link>
      </div>
    </section>
  );
}
