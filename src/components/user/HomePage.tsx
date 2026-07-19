import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  FiArrowRight,
  FiAward,
  FiBarChart2,
  FiBookOpen,
  FiBriefcase,
  FiInstagram,
  FiMail,
  FiPhone,
  FiUsers,
} from "react-icons/fi";
import type { Expertise, Profile, Project, Statistic } from "@/types/api";
import { getPublicAchievements } from "@/services/achievement.service";
import { getPublicCertificates } from "@/services/certificate.service";
import { getPublicProfile } from "@/services/profile.server-service";
import { getFeaturedProjects } from "@/services/project.server-service";
import { getPublicTools } from "@/services/tools.server-service";
import { apiGet } from "@/lib/server-api-client";

const fallbackProfile = {
  name: "Ahamad Fadillah Harahap",
  headline: "Lulusan S1 Agribisnis UMSU",
  shortDescription:
    "Saya adalah profesional Human Resources yang berfokus pada pengelolaan talenta, pengembangan budaya kerja, dan mendorong pertumbuhan karyawan serta organisasi secara berkelanjutan.",
  availabilityStatus: "Human Resources • People Growth",
  publicEmail: "afadillah117@gmail.com",
  whatsapp: "6287768885573",
} satisfies Partial<Profile>;

const fallbackStats: Statistic[] = [
  { id: "years", label: "Tahun Pengalaman di bidang Human Resources", value: 3, unit: "+", icon: "users" },
  { id: "company", label: "Perusahaan / Instansi Telah berkolaborasi", value: 6, unit: "+", icon: "building" },
  { id: "education", label: "Pendidikan Agribisnis - UMSU", value: 1, unit: "S1", icon: "education" },
  { id: "impact", label: "Karyawan Terdampak Melalui program HR", value: 100, unit: "+", icon: "award" },
];

const fallbackTools: Expertise[] = [
  { id: "talent", name: "Talent Acquisition & Onboarding", category: { name: "HR" } },
  { id: "performance", name: "Performance Management", category: { name: "HR" } },
  { id: "relations", name: "Employee Relations", category: { name: "HR" } },
  { id: "learning", name: "Learning & Development", category: { name: "HR" } },
  { id: "excel", name: "Microsoft Excel", category: { name: "Tools" } },
  { id: "hris", name: "HRIS", category: { name: "Tools" } },
  { id: "canva", name: "Canva", category: { name: "Tools" } },
  { id: "notion", name: "Notion", category: { name: "Tools" } },
];

export async function HomePage() {
  const [profile, stats, expertise, projects, achievements, certifications] = await Promise.all([
    getPublicProfile().catch(() => null),
    apiGet<Statistic[]>("/public/statistics").catch(() => null),
    getPublicTools().catch(() => null),
    getFeaturedProjects(4).catch(() => null),
    getPublicAchievements().catch(() => null),
    getPublicCertificates().catch(() => null),
  ]);

  const person = { ...fallbackProfile, ...(profile?.data ?? {}) } as Profile;
  const statisticItems = stats?.data?.length ? stats.data : fallbackStats;
  const expertiseItems = expertise?.data?.length ? expertise.data : fallbackTools;
  const projectItems = projects?.data ?? [];
  const achievementItems = achievements?.data ?? [];
  const certificateCount = certifications?.data?.length ?? 0;

  return (
    <div>
      <section className="relative overflow-hidden border-b border-[color:var(--border)]">
        <div className="section-shell grid gap-8 py-8 lg:min-h-[660px] lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-10 lg:py-0">
          <div className="relative z-10 py-4 lg:py-20">
            <p className="inline-flex rounded-full bg-[color:var(--surface-soft)] px-4 py-2 text-sm font-semibold text-[color:var(--primary)]">
              {person.availabilityStatus}
            </p>
            <h1 className="mt-5 max-w-3xl overflow-wrap-anywhere font-serif text-[clamp(3.35rem,14vw,5.25rem)] font-semibold leading-[0.95] tracking-normal text-[color:var(--text-primary)] lg:text-[clamp(4.75rem,6vw,6.75rem)]">
              {person.name}
            </h1>
            <p className="mt-4 font-serif text-2xl text-[color:var(--primary)]">{person.headline}</p>
            <div className="mt-5 h-px w-24 bg-[color:var(--primary)]" />
            <p className="mt-6 max-w-xl text-base leading-8 text-[color:var(--text-primary)]">{person.shortDescription}</p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <HeroButton href="/about" icon={<FiUsers />}>Tentang Saya</HeroButton>
              <HeroButton href="/experience" variant="outline" icon={<FiBriefcase />}>Lihat Pengalaman</HeroButton>
              <Link className="inline-flex items-center gap-3 text-sm font-semibold text-[color:var(--primary)]" href="/contact">
                Hubungi Saya <FiArrowRight aria-hidden />
              </Link>
            </div>
          </div>
          <div className="relative mx-auto h-full min-h-[420px] w-full max-w-sm overflow-hidden rounded-[12px] border border-[color:var(--border)] bg-[color:var(--surface-soft)] sm:min-h-[520px] lg:max-w-none lg:overflow-visible lg:rounded-none lg:border-0">
            <div className="absolute inset-y-0 left-0 hidden w-[120%] rounded-l-[48%] bg-[color:var(--surface-soft)] lg:block" />
            <Image
              src="/me-about.jpeg"
              alt="Potret Ahamad Fadillah Harahap"
              fill
              priority
              sizes="(min-width: 1024px) 52vw, 90vw"
              className="object-cover object-[center_18%]"
            />
            <div className="absolute bottom-6 right-6 grid size-24 place-items-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] text-center text-[9px] font-bold uppercase tracking-[0.18em] text-[color:var(--primary)] shadow-[var(--shadow-md)] lg:bottom-24 lg:right-20 lg:size-28 lg:text-[10px]">
              People<br />Process<br />Growth
            </div>
            <DotGrid className="absolute bottom-20 right-3 lg:bottom-24 lg:right-0" />
          </div>
        </div>
      </section>

      <section className="section-shell relative z-20 mt-6 lg:-mt-12">
        <div className="grid grid-cols-2 rounded-[8px] border border-[color:var(--border)] bg-[color:var(--surface)] shadow-[var(--shadow-md)] lg:grid-cols-4">
          {statisticItems.slice(0, 4).map((stat, index) => (
            <StatBox key={stat.id} stat={stat} icon={index} />
          ))}
        </div>
      </section>

      <section className="section-shell grid gap-5 py-5 lg:grid-cols-3">
        <article className="rounded-[8px] border border-[color:var(--border)] bg-[color:var(--surface)] p-6">
          <SectionTitle icon={<FiBookOpen />} title="Spesialisasi & Tools" />
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div className="grid gap-3">
              {expertiseItems.filter((item) => item.category?.name !== "Tools").slice(0, 4).map((item) => (
                <p key={item.id} className="flex items-center gap-3 text-sm text-[color:var(--text-secondary)]">
                  <span className="size-1.5 rounded-full bg-[color:var(--primary)]" /> {item.name}
                </p>
              ))}
            </div>
            <div className="grid gap-2">
              {expertiseItems.filter((item) => item.category?.name === "Tools").slice(0, 4).map((item) => (
                <span key={item.id} className="rounded-[6px] bg-[color:var(--surface-soft)] px-3 py-2 text-sm text-[color:var(--text-secondary)]">
                  {item.name}
                </span>
              ))}
            </div>
          </div>
          <TextLink href="/about">Lihat semua keahlian</TextLink>
        </article>

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
          <ContactStrip icon={<FiInstagram />} label="Instagram" value="@ahmad_harahaap" />
          <ContactStrip icon={<FiPhone />} label="WhatsApp" value="+62 877-6888-5573" />
          <ContactStrip icon={<FiMail />} label="Email" value={person.publicEmail ?? "afadillah117@gmail.com"} />
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
  return (
    <Link href={`/projects/${project.slug}`} className="mt-5 grid gap-5 sm:grid-cols-[210px_1fr]">
      <div className="relative min-h-36 overflow-hidden rounded-[8px] bg-[color:var(--surface-soft)]">
        <Image src="/me-about.jpeg" alt="" fill sizes="210px" className="object-cover object-[center_16%] opacity-85 grayscale" />
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

function DotGrid({ className }: { className?: string }) {
  return (
    <div className={`grid grid-cols-7 gap-4 ${className}`} aria-hidden>
      {Array.from({ length: 42 }).map((_, index) => (
        <span key={index} className="size-1 rounded-full bg-[color:var(--primary)]/65" />
      ))}
    </div>
  );
}
