import Link from "next/link";
import { apiGet } from "@/lib/api";

type SettingsPayload = {
  navigation: { id: string; label: string; href: string; location: string }[];
  socials: { id: string; label: string; url: string }[];
};

export async function Footer() {
  const settings = await apiGet<SettingsPayload>("/public/settings").catch(() => null);
  const footerNav = settings?.data.navigation.filter((item) => item.location !== "admin") ?? [];
  const socials = settings?.data.socials ?? [];

  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-200">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.3fr_1fr_1fr] lg:px-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-300">HR Portfolio</p>
          <p className="mt-3 max-w-md text-sm text-slate-400">Portofolio profesional HR yang seluruh kontennya dikelola melalui dashboard admin dan API.</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Navigasi</p>
          <div className="mt-3 grid gap-2">
            {footerNav.length ? footerNav.map((item) => <Link key={item.id} href={item.href}>{item.label}</Link>) : <span className="text-sm text-slate-500">Navigasi belum dikonfigurasi.</span>}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Social</p>
          <div className="mt-3 grid gap-2">
            {socials.length ? socials.map((item) => <a key={item.id} href={item.url} target="_blank" rel="noreferrer">{item.label}</a>) : <span className="text-sm text-slate-500">Social links belum tersedia.</span>}
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800 px-4 py-4 text-center text-xs text-slate-500">© {new Date().getFullYear()} HR Portfolio. Privacy-first professional showcase.</div>
    </footer>
  );
}
