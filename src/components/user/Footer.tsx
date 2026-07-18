import Link from "next/link";
import { BrandLogo } from "@/components/branding/BrandLogo";
import { getPublicProfile } from "@/services/profile.server-service";
import { getPublicSettings } from "@/services/settings.service";

export async function Footer() {
  const [settings, profile] = await Promise.all([
    getPublicSettings().catch(() => null),
    getPublicProfile().catch(() => null),
  ]);
  const footerNav = settings?.data.navigation.filter((item) => item.location !== "admin").map((item) => ({ ...item, href: normalizeUserHref(item.href) })) ?? [];
  const socials = settings?.data.socials ?? [];
  const person = profile?.data;

  return (
    <footer className="bg-[#07111F] text-slate-200">
      <div className="section-shell grid gap-10 py-12 lg:grid-cols-[1.4fr_0.8fr_0.8fr] lg:py-16">
        <div>
          <BrandLogo
            brandName={person?.name}
            tagline="Human Resources Portfolio"
            variant="primary"
            size="md"
            showTagline
            className="[--text-primary:#F8FAFC] [--text-muted:#94A3B8]"
          />
          <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">
            Portofolio profesional Human Resources yang menampilkan pengalaman, proyek, dan bukti kerja berbasis data.
          </p>
          {person?.publicEmail ? <a className="mt-4 inline-flex text-sm font-semibold text-teal-300 hover:text-white" href={`mailto:${person.publicEmail}`}>{person.publicEmail}</a> : null}
        </div>
        {footerNav.length ? (
          <div>
            <p className="text-sm font-semibold text-white">Navigasi</p>
            <div className="mt-3 grid gap-2">
              {footerNav.map((item) => <Link className="text-sm text-slate-400 transition hover:text-white" key={item.id} href={item.href}>{item.label}</Link>)}
            </div>
          </div>
        ) : null}
        {socials.length ? (
          <div>
            <p className="text-sm font-semibold text-white">Sosial</p>
            <div className="mt-3 grid gap-2">
              {socials.map((item) => <a className="text-sm text-slate-400 transition hover:text-white" key={item.id} href={item.url} target="_blank" rel="noreferrer">{item.label}</a>)}
            </div>
          </div>
        ) : null}
      </div>
      <div className="border-t border-slate-800 px-4 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {person?.name ?? "Portofolio HR"}. Dibangun untuk people, growth, dan culture.
      </div>
    </footer>
  );
}

function normalizeUserHref(href: string) {
  const map: Record<string, string> = {
    "/": "/dashboard/user/home",
    "/about": "/dashboard/user/about",
    "/achievements": "/dashboard/user/achievement",
    "/blog": "/dashboard/user/blog",
    "/certifications": "/dashboard/user/certificate",
    "/contact": "/dashboard/user/contact",
    "/documents": "/dashboard/user/certificate",
    "/experience": "/dashboard/user/experience",
    "/expertise": "/dashboard/user/about",
    "/projects": "/dashboard/user/projects",
    "/testimonials": "/dashboard/user/about",
  };
  return map[href] ?? href;
}
