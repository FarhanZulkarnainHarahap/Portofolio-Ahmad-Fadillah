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
    <footer className="bg-[color:var(--secondary)] text-[color:var(--text-on-dark)]">
      <div className="section-shell grid gap-10 py-12 lg:grid-cols-[1.4fr_0.8fr_0.8fr] lg:py-16">
        <div>
          <BrandLogo
            brandName={person?.name}
            tagline="Human Resources Portfolio"
            variant="primary"
            size="md"
            showTagline
            className="[--text-primary:var(--text-on-dark)] [--text-muted:var(--border-strong)]"
          />
          <p className="mt-5 max-w-md text-sm leading-7 text-[color:var(--border-strong)]">
            Portofolio profesional Human Resources yang menampilkan pengalaman, proyek, dan bukti kerja berbasis data.
          </p>
          {person?.publicEmail ? <a className="mt-4 inline-flex text-sm font-semibold text-[color:var(--primary)] hover:text-[color:var(--text-on-dark)]" href={`mailto:${person.publicEmail}`}>{person.publicEmail}</a> : null}
        </div>
        {footerNav.length ? (
          <div>
            <p className="text-sm font-semibold text-[color:var(--text-on-dark)]">Navigasi</p>
            <div className="mt-3 grid gap-2">
              {footerNav.map((item) => <Link className="text-sm text-[color:var(--border-strong)] transition hover:text-[color:var(--text-on-dark)]" key={item.id} href={item.href}>{item.label}</Link>)}
            </div>
          </div>
        ) : null}
        {socials.length ? (
          <div>
            <p className="text-sm font-semibold text-[color:var(--text-on-dark)]">Sosial</p>
            <div className="mt-3 grid gap-2">
              {socials.map((item) => <a className="text-sm text-[color:var(--border-strong)] transition hover:text-[color:var(--text-on-dark)]" key={item.id} href={item.url} target="_blank" rel="noreferrer">{item.label}</a>)}
            </div>
          </div>
        ) : null}
      </div>
      <div className="border-t border-[color:var(--border-strong)]/35 px-4 py-5 text-center text-xs text-[color:var(--border-strong)]">
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
