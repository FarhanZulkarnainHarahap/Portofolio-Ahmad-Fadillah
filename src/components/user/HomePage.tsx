import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  FiArrowRight,
  FiAward,
  FiBarChart2,
  FiBookOpen,
  FiBriefcase,
  FiMail,
  FiPhone,
  FiUsers,
} from "react-icons/fi";
import type { Project, Statistic } from "@/types/api";
import { getPublicAchievements } from "@/services/achievement.service";
import { getPublicCertificates } from "@/services/certificate.service";
import { getFeaturedProjects } from "@/services/project.server-service";
import { getPublicTools } from "@/services/tools.server-service";
import { apiGet } from "@/lib/server-api-client";
import { staticContactLinks, staticProfile } from "@/lib/static-profile";

export async function HomePage() {
  const [stats, expertise, projects, achievements, certifications] = await Promise.all([
    apiGet<Statistic[]>("/public/statistics").catch(() => null),
    getPublicTools().catch(() => null),
    getFeaturedProjects(4).catch(() => null),
    getPublicAchievements().catch(() => null),
    getPublicCertificates().catch(() => null),
  ]);

  const statisticItems = stats?.data ?? [];
  const expertiseItems = expertise?.data ?? [];
  const projectItems = projects?.data ?? [];
  const achievementItems = achievements?.data ?? [];
  const certificateCount = certifications?.data?.length ?? 0;
  const heroImage = staticProfile.imageUrl;

  return (
    <div>
      <section className="relative overflow-hidden border-b border-[color:var(--border)]">
        <div className={`section-shell grid gap-8 py-8 lg:min-h-[660px] lg:items-center lg:gap-10 lg:py-0 ${heroImage ? "lg:grid-cols-[0.92fr_1.08fr]" : ""}`}>
          <div className="relative z-10 py-4 lg:py-20">
            <p className="inline-flex rounded-full bg-[color:var(--surface-soft)] px-4 py-2 text-sm font-semibold text-[color:var(--primary)]">
              Human Resources • People Growth
            </p>
            <h1 className="mt-5 max-w-3xl overflow-wrap-anywhere font-serif text-[clamp(3.35rem,14vw,5.25rem)] font-semibold leading-[0.95] tracking-normal text-[color:var(--text-primary)] lg:text-[clamp(4.75rem,6vw,6.75rem)]">
              {staticProfile.name}
            </h1>
            <p className="mt-4 font-serif text-2xl text-[color:var(--primary)]">{staticProfile.headline}</p>
            <div className="mt-5 h-px w-24 bg-[color:var(--primary)]" />
            <p className="mt-6 max-w-xl text-base leading-8 text-[color:var(--text-primary)]">{staticProfile.shortDescription}</p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <HeroButton href="/about" icon={<FiUsers />}>Tentang Saya</HeroButton>
              <HeroButton href="/experience" variant="outline" icon={<FiBriefcase />}>Lihat Pengalaman</HeroButton>
              <Link className="inline-flex items-center gap-3 text-sm font-semibold text-[color:var(--primary)]" href="/contact">
                Hubungi Saya <FiArrowRight aria-hidden />
              </Link>
            </div>
          </div>
          {heroImage ? (
            <div className="relative mx-auto h-full min-h-[420px] w-full max-w-sm overflow-hidden rounded-[12px] border border-[color:var(--border)] bg-[color:var(--surface-soft)] sm:min-h-[520px] lg:max-w-none lg:overflow-visible lg:rounded-none lg:border-0">
              <div className="absolute inset-y-0 left-0 hidden w-[120%] rounded-l-[48%] bg-[color:var(--surface-soft)] lg:block" />
              <Image
                src={heroImage}
                alt={`Potret ${staticProfile.name}`}
                fill
                priority
                sizes="(min-width: 1024px) 52vw, 90vw"
                className="object-cover object-[center_18%]"
              />
              <DotGrid className="absolute bottom-20 right-3 lg:bottom-24 lg:right-0" />
            </div>
          ) : null}
        </div>
      </section>

      {statisticItems.length ? (
        <section className="section-shell relative z-20 mt-6 lg:-mt-12">
          <div className="grid grid-cols-2 rounded-[8px] border border-[color:var(--border)] bg-[color:var(--surface)] shadow-[var(--shadow-md)] lg:grid-cols-4">
            {statisticItems.slice(0, 4).map((stat, index) => (
              <StatBox key={stat.id} stat={stat} icon={index} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="section-shell grid gap-5 py-5 lg:grid-cols-3">
        {expertiseItems.length ? (
          <article className="rounded-[8px] border border-[color:var(--border)] bg-[color:var(--surface)] p-6">
            <SectionTitle icon={<FiBookOpen />} title="Spesialisasi & Tools" />
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              {expertiseItems.some((item) => item.category?.name !== "Tools") ? <div className="grid gap-3">
                {expertiseItems.filter((item) => item.category?.name !== "Tools").slice(0, 4).map((item) => (
                  <p key={item.id} className="flex items-center gap-3 text-sm text-[color:var(--text-secondary)]">
                    <span className="size-1.5 rounded-full bg-[color:var(--primary)]" /> {item.name}
                  </p>
                ))}
              </div> : null}
              {expertiseItems.some((item) => item.category?.name === "Tools") ? <div className="grid gap-2">
                {expertiseItems.filter((item) => item.category?.name === "Tools").slice(0, 4).map((item) => (
                  <span key={item.id} className="rounded-[6px] bg-[color:var(--surface-soft)] px-3 py-2 text-sm text-[color:var(--text-secondary)]">
                    {item.name}
                  </span>
                ))}
              </div> : null}
            </div>
            <TextLink href="/about">Lihat semua keahlian</TextLink>
          </article>
        ) : null}

        {projectItems[0] ? (
          <article className="rounded-[8px] border border-[color:var(--border)] bg-[color:var(--surface)] p-6">
            <div className="flex items-center justify-between gap-4">
              <SectionTitle icon={<FiBriefcase />} title="Proyek Unggulan" />
              <TextLink href="/projects" compact>Lihat Semua Proyek</TextLink>
            </div>
            <FeaturedProject project={projectItems[0]} />
          </article>
        ) : null}

        {achievementItems.length ? (
          <article className="rounded-[8px] border border-[color:var(--border)] bg-[color:var(--surface)] p-6">
            <div className="flex items-center justify-between gap-4">
              <SectionTitle icon={<FiAward />} title="Pencapaian" />
              <TextLink href="/achievement" compact>Lihat Semua</TextLink>
            </div>
            <div className="mt-5 grid gap-5">
              {achievementItems.slice(0, 3).map((item, index) => (
                <div key={item.id} className="grid grid-cols-[44px_1fr] gap-4">
                  <span className="grid size-11 place-items-center rounded-full bg-[color:var(--surface-soft)] text-[color:var(--primary)]">
                    {index === 0 ? <FiUsers /> : index === 1 ? <FiAward /> : <FiBookOpen />}
                  </span>
                  <div>
                    <p className="font-semibold text-[color:var(--text-primary)]">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-[color:var(--text-secondary)]">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        ) : (
          <article className="rounded-[8px] border border-[color:var(--border)] bg-[color:var(--surface)] p-6">
            <SectionTitle icon={<FiAward />} title="Konten Profesional" />
            <p className="mt-5 text-sm leading-7 text-[color:var(--text-secondary)]">
              Proyek, pencapaian, artikel, dan sertifikat akan ditampilkan saat konten publiknya sudah siap.
            </p>
          </article>
        )}
      </section>

      <section className="section-shell pb-7">
        <div className="grid rounded-[8px] border border-[color:var(--border)] bg-[color:var(--surface)] md:grid-cols-3">
          {staticContactLinks.map((item) => (
            <ContactStrip key={item.label} icon={contactIcon(item.type)} label={item.label} value={item.value} />
          ))}
        </div>
      </section>

      {certificateCount ? (
        <p className="sr-only">{certificateCount} sertifikasi profesional tersedia di halaman sertifikat.</p>
      ) : null}
    </div>
  );
}

function HeroButton({ href, children, icon, variant = "primary" }: { href: string; children: ReactNode; icon: ReactNode; variant?: "primary" | "outline" }) {
  const classes =
    variant === "primary"
      ? "bg-[color:var(--primary)] text-[color:var(--text-on-primary)] hover:bg-[color:var(--primary-hover)]"
      : "border border-[color:var(--primary)] bg-transparent text-[color:var(--primary)] hover:bg-[color:var(--primary-soft)]";
  return (
    <Link href={href} className={`inline-flex min-h-11 items-center gap-3 rounded-[6px] px-5 text-sm font-bold transition ${classes}`}>
      {icon}
      {children}
    </Link>
  );
}

function StatBox({ stat, icon }: { stat: Statistic; icon: number }) {
  const Icon = [FiUsers, FiBriefcase, FiBookOpen, FiAward][icon] ?? FiBarChart2;
  const value = stat.unit === "S1" ? "S1" : `${stat.value}${stat.unit ?? ""}`;
  return (
    <div className="grid gap-3 border-b border-r border-[color:var(--border)] p-4 even:border-r-0 last:border-b-0 sm:grid-cols-[56px_1fr] sm:p-5 lg:border-b-0 lg:last:border-r-0">
      <span className="grid size-12 place-items-center rounded-full bg-[color:var(--surface-soft)] text-xl text-[color:var(--primary)] sm:size-14 sm:text-2xl">
        <Icon aria-hidden />
      </span>
      <div>
        <p className="font-serif text-3xl font-semibold leading-none text-[color:var(--text-primary)] sm:text-4xl">{value}</p>
        <p className="mt-1 text-xs font-semibold leading-5 text-[color:var(--text-primary)] sm:text-sm">{stat.label}</p>
      </div>
    </div>
  );
}

function SectionTitle({ icon, title }: { icon: ReactNode; title: string }) {
  return (
    <h2 className="flex items-center gap-3 font-serif text-2xl font-semibold text-[color:var(--text-primary)]">
      <span className="text-[color:var(--primary)]">{icon}</span>
      {title}
    </h2>
  );
}

function FeaturedProject({ project }: { project: Project }) {
  const metric = project.metrics?.[0];
  const imageUrl = getProjectImageUrl(project);
  return (
    <Link href={`/projects/${project.slug}`} className="mt-5 grid gap-5 sm:grid-cols-[210px_1fr]">
      <div className="relative grid min-h-36 place-items-center overflow-hidden rounded-[8px] bg-[color:var(--surface-soft)] text-3xl text-[color:var(--primary)]">
        {imageUrl ? <Image src={imageUrl} alt={project.title} fill sizes="210px" className="object-cover object-center" /> : <FiBriefcase aria-hidden />}
        <div className="absolute inset-0 bg-[color:var(--primary)]/12" />
      </div>
      <div>
        <p className="font-serif text-2xl font-semibold leading-tight text-[color:var(--text-primary)]">{project.title}</p>
        <p className="mt-3 text-sm leading-6 text-[color:var(--text-secondary)]">{project.shortDescription}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.category?.name ? <span className="rounded-[6px] bg-[color:var(--surface-soft)] px-3 py-1 text-xs text-[color:var(--text-secondary)]">{project.category.name}</span> : null}
          {metric ? <span className="rounded-[6px] bg-[color:var(--surface-soft)] px-3 py-1 text-xs text-[color:var(--text-secondary)]">{metric.value}{metric.unit ?? ""} {metric.label}</span> : null}
        </div>
      </div>
    </Link>
  );
}

function TextLink({ href, children, compact = false }: { href: string; children: ReactNode; compact?: boolean }) {
  return (
    <Link href={href} className={`inline-flex items-center gap-3 text-sm font-semibold text-[color:var(--primary)] ${compact ? "" : "mt-6"}`}>
      {children} <FiArrowRight aria-hidden />
    </Link>
  );
}

function ContactStrip({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4 border-b border-[color:var(--border)] px-7 py-5 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
      <span className="text-3xl text-[color:var(--primary)]">{icon}</span>
      <div>
        <p className="text-sm text-[color:var(--text-muted)]">{label}</p>
        <p className="font-semibold text-[color:var(--text-primary)]">{value}</p>
      </div>
    </div>
  );
}

function getProjectImageUrl(project: Project) {
  return project.thumbnail?.secureUrl ?? project.images?.[0]?.secureUrl ?? project.images?.[0]?.media?.secureUrl ?? null;
}

function contactIcon(type: string) {
  if (type === "whatsapp") return <FiPhone />;
  if (type === "email") return <FiMail />;
  return <FiUsers />;
}

function DotGrid({ className }: { className?: string }) {
  return (
    <div className={`grid grid-cols-7 gap-4 ${className}`} aria-hidden>
      {Array.from({ length: 42 }).map((_, index) => (
        <span key={index} className="size-1 rounded-full bg-[color:var(--primary)]/65" />
      ))}
    </div>
  );
}
