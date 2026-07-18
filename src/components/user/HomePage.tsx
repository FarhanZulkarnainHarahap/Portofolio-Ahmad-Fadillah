import Link from "next/link";
import { FiArrowUpRight, FiBriefcase, FiCheckCircle, FiMail, FiMapPin, FiPhone, FiTrendingUp, FiUsers } from "react-icons/fi";
import type { Experience, Expertise, Profile, Project, SimpleContent, Statistic } from "@/types/api";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { BrandLogo } from "@/components/branding/BrandLogo";
import { Section } from "./Section";
import { Reveal } from "@/components/animations/Reveal";
import { displayDateRange } from "@/lib/format";
import { getPublicAchievements } from "@/services/achievement.service";
import { getPublicCertificates } from "@/services/certificate.service";
import { getPublicExperiences } from "@/services/experience.service";
import { getPublicProfile } from "@/services/profile.server-service";
import { getFeaturedProjects } from "@/services/project.server-service";
import { getPublicTestimonials } from "@/services/testimonial.service";
import { getPublicTools } from "@/services/tools.server-service";
import { apiGet } from "@/lib/server-api-client";

export async function HomePage() {
  const [profile, stats, experiences, expertise, projects, achievements, certifications, testimonials] = await Promise.all([
    getPublicProfile().catch(() => null),
    apiGet<Statistic[]>("/public/statistics").catch(() => null),
    getPublicExperiences().catch(() => null),
    getPublicTools().catch(() => null),
    getFeaturedProjects(4).catch(() => null),
    getPublicAchievements().catch(() => null),
    getPublicCertificates().catch(() => null),
    getPublicTestimonials().catch(() => null),
  ]);
  const person = profile?.data;

  if (!person) return <PortfolioUpdating />;

  const statisticItems = stats?.data ?? [];
  const experienceItems = experiences?.data ?? [];
  const expertiseItems = expertise?.data ?? [];
  const projectItems = projects?.data ?? [];
  const proofGroups = [
    { title: "Pencapaian", href: "/dashboard/user/achievement", items: achievements?.data ?? [] },
    { title: "Sertifikasi", href: "/dashboard/user/certificate", items: certifications?.data ?? [] },
    { title: "Testimoni", href: "/dashboard/user/about", items: testimonials?.data ?? [] },
  ].filter((group) => group.items.length);

  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-16 sm:pb-24 sm:pt-20 lg:pb-28">
        <div className="section-shell grid min-h-[calc(100vh-9rem)] items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div>
              {person.availabilityStatus ? (
                <p className="inline-flex rounded-full border border-[color:var(--secondary)]/30 bg-[color:var(--secondary-soft)] px-4 py-2 text-sm font-bold text-[color:var(--secondary)]">
                  {person.availabilityStatus}
                </p>
              ) : null}
              <h1 className="mt-6 max-w-4xl font-heading text-4xl font-extrabold leading-[1.04] tracking-normal text-[color:var(--text-primary)] sm:text-6xl lg:text-7xl">
                {person.professionalTitle || person.name}
              </h1>
              {person.professionalTitle ? <p className="mt-5 text-xl font-bold text-[color:var(--primary)]">{person.name}</p> : null}
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[color:var(--text-secondary)]">{person.headline ?? person.shortDescription}</p>
              <div className="mt-7 flex flex-wrap gap-3 text-sm font-semibold text-[color:var(--text-muted)]">
                {person.location ? <span className="inline-flex items-center gap-2"><FiMapPin />{person.location}</span> : null}
                {person.publicEmail ? <a className="inline-flex items-center gap-2 hover:text-[color:var(--primary)]" href={`mailto:${person.publicEmail}`}><FiMail />{person.publicEmail}</a> : null}
                {person.whatsapp ? <a className="inline-flex items-center gap-2 hover:text-[color:var(--primary)]" href={`https://wa.me/${person.whatsapp}`}><FiPhone />WhatsApp</a> : null}
              </div>
              <div className="mt-9 flex flex-wrap gap-3">
                <ButtonLink href="/dashboard/user/projects">Lihat Proyek HR</ButtonLink>
                <ButtonLink href="/dashboard/user/certificate" variant="secondary">Download CV</ButtonLink>
                <ButtonLink href="/dashboard/user/contact" variant="ghost">Diskusi HR</ButtonLink>
              </div>
            </div>
          </Reveal>
          <HeroPortrait person={person} stats={statisticItems} />
        </div>
      </section>

      {statisticItems.length ? <StatisticStrip items={statisticItems} /> : null}

      {(person.shortDescription || person.about || person.workPhilosophy || person.careerGoals) ? (
        <Section
          eyebrow="Tentang Saya"
          title="Human Resources yang menyeimbangkan people, proses, dan performa."
          description={person.shortDescription ?? person.headline ?? undefined}
          tone="strong"
        >
          <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
            {person.about ? <article className="premium-card p-7 text-base leading-8 text-[color:var(--text-secondary)]">{person.about}</article> : null}
            <div className="grid gap-4">
              {person.workPhilosophy ? <InfoPanel label="Filosofi Kerja" text={person.workPhilosophy} /> : null}
              {person.careerGoals ? <InfoPanel label="Fokus Karier" text={person.careerGoals} /> : null}
            </div>
          </div>
        </Section>
      ) : null}

      {expertiseItems.length ? (
        <Section eyebrow="Keahlian" title="Kapabilitas HR dalam format bento yang mudah dipindai." description="Area keahlian ditampilkan dari database dan disusun untuk membantu recruiter memahami kekuatan profesional dengan cepat.">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {expertiseItems.slice(0, 8).map((item, index) => <ExpertiseCard key={item.id} item={item} index={index} />)}
          </div>
        </Section>
      ) : null}

      {experienceItems.length ? (
        <Section eyebrow="Pengalaman" title="Career timeline yang menunjukkan konteks dan dampak." tone="muted">
          <div className="relative grid gap-5">
            {experienceItems.slice(0, 4).map((item, index) => <ExperienceCard key={item.id} item={item} index={index} />)}
          </div>
        </Section>
      ) : null}

      {projectItems.length ? (
        <Section eyebrow="Proyek HR" title="Case study pilihan yang terhubung langsung ke data publik." description="Setiap proyek berasal dari API, hanya menampilkan konten published dan featured.">
          <div className="grid gap-5 lg:grid-cols-3">
            {projectItems.map((project, index) => <ProjectCard key={project.id} project={project} featured={index === 0} />)}
          </div>
        </Section>
      ) : null}

      {proofGroups.length ? (
        <Section eyebrow="Bukti Profesional" title="Evidence yang memperkuat kredibilitas." tone="strong">
          <div className="grid gap-5 lg:grid-cols-3">
            {proofGroups.map((group) => <ProofList key={group.title} {...group} />)}
          </div>
        </Section>
      ) : null}

      <section className="bg-[color:var(--primary)] px-4 py-16 text-[color:var(--text-on-primary)]">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-heading text-3xl font-extrabold">Siap membahas kebutuhan people dan culture?</p>
            <p className="mt-2 max-w-2xl text-[color:var(--primary-soft)]">Kirim pesan melalui form kontak agar percakapan tersimpan rapi di dashboard admin.</p>
          </div>
          <ButtonLink href="/dashboard/user/contact" variant="secondary">Hubungi Saya</ButtonLink>
        </div>
      </section>
    </>
  );
}

function PortfolioUpdating() {
  return (
    <section className="grid min-h-[70vh] place-items-center px-4 py-20">
      <div className="premium-card max-w-xl p-8 text-center">
        <BrandLogo variant="stacked" size="lg" showTagline />
        <h1 className="mt-8 font-heading text-3xl font-extrabold text-[color:var(--text-primary)]">Portfolio is being updated.</h1>
        <p className="mt-3 text-[color:var(--text-secondary)]">Please check back soon.</p>
      </div>
    </section>
  );
}

function HeroPortrait({ person, stats }: { person: Profile; stats: Statistic[] }) {
  const firstStat = stats[0];
  const secondStat = stats[1];

  return (
    <div className="relative">
      <div className="absolute -left-6 top-8 hidden h-28 w-28 rounded-full bg-[color:var(--accent-soft)] lg:block" />
      <div className="premium-card relative overflow-hidden p-6 sm:p-8">
        <div className="absolute right-0 top-0 h-40 w-40 rounded-bl-[4rem] bg-[color:var(--primary-soft)]" />
        <div className="relative flex aspect-[4/5] flex-col justify-between rounded-[var(--radius-xl)] bg-[color:var(--surface-secondary)] p-7">
          <BrandLogo brandName={person.name} tagline="Human Resources Portfolio" variant="stacked" size="xl" showTagline />
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[color:var(--secondary)]">Human-centered HR</p>
            <p className="mt-3 font-heading text-3xl font-extrabold leading-tight text-[color:var(--text-primary)]">{person.headline ?? person.professionalTitle}</p>
          </div>
        </div>
      </div>
      {firstStat ? <FloatingMetric className="-left-2 bottom-10" stat={firstStat} /> : null}
      {secondStat ? <FloatingMetric className="-right-2 top-16" stat={secondStat} /> : null}
    </div>
  );
}

function FloatingMetric({ stat, className }: { stat: Statistic; className: string }) {
  return (
    <div className={`premium-card absolute hidden max-w-44 p-4 lg:block ${className}`}>
      <p className="font-heading text-2xl font-extrabold text-[color:var(--primary)]">{String(stat.value)}{stat.unit ?? ""}</p>
      <p className="mt-1 text-xs font-semibold text-[color:var(--text-secondary)]">{stat.label}</p>
    </div>
  );
}

function StatisticStrip({ items }: { items: Statistic[] }) {
  return (
    <section className="section-shell -mt-8 pb-10">
      <div className="premium-card grid overflow-hidden md:grid-cols-2 lg:grid-cols-4">
        {items.slice(0, 4).map((stat) => (
          <div key={stat.id} className="border-b border-[color:var(--border)] p-6 last:border-b-0 md:border-r md:last:border-r-0 lg:border-b-0">
            <p className="font-heading text-4xl font-extrabold text-[color:var(--primary)]">{String(stat.value)}{stat.unit ?? ""}</p>
            <p className="mt-2 text-sm font-semibold text-[color:var(--text-secondary)]">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function InfoPanel({ label, text }: { label: string; text: string }) {
  return (
    <article className="premium-card p-6">
      <p className="text-sm font-bold uppercase tracking-[0.14em] text-[color:var(--secondary)]">{label}</p>
      <p className="mt-3 leading-7 text-[color:var(--text-secondary)]">{text}</p>
    </article>
  );
}

function ExpertiseCard({ item, index }: { item: Expertise; index: number }) {
  const Icon = index % 3 === 0 ? FiUsers : index % 3 === 1 ? FiTrendingUp : FiCheckCircle;
  return (
    <article className={`premium-card p-6 transition hover:-translate-y-1 hover:border-[color:var(--secondary)] ${index === 0 ? "md:col-span-2" : ""}`}>
      <Icon className="text-2xl text-[color:var(--primary)]" aria-hidden />
      <p className="mt-5 font-heading text-xl font-extrabold text-[color:var(--text-primary)]">{item.name}</p>
      {item.category?.name ? <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-[color:var(--accent)]">{item.category.name}</p> : null}
      {item.description ? <p className="mt-3 text-sm leading-6 text-[color:var(--text-secondary)]">{item.description}</p> : null}
      {typeof item.level === "number" ? (
        <div className="mt-5 h-2 rounded-full bg-[color:var(--surface-secondary)]">
          <div className="h-full rounded-full bg-[color:var(--secondary)]" style={{ width: `${Math.max(0, Math.min(100, item.level))}%` }} />
        </div>
      ) : null}
    </article>
  );
}

function ExperienceCard({ item, index }: { item: Experience; index: number }) {
  return (
    <article className="grid gap-4 lg:grid-cols-[180px_1fr]">
      <div className="font-heading text-4xl font-extrabold text-[color:var(--primary-soft)]">{String(index + 1).padStart(2, "0")}</div>
      <div className="premium-card p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-heading text-2xl font-extrabold text-[color:var(--text-primary)]">{item.position}</p>
            <p className="mt-1 font-semibold text-[color:var(--primary)]">{item.companyName}</p>
          </div>
          <p className="rounded-full bg-[color:var(--primary-soft)] px-3 py-1 text-xs font-bold text-[color:var(--primary)]">{displayDateRange(item.startDate, item.endDate, item.isCurrent)}</p>
        </div>
        {item.description ? <p className="mt-4 leading-7 text-[color:var(--text-secondary)]">{item.description}</p> : null}
      </div>
    </article>
  );
}

function ProjectCard({ project, featured }: { project: Project; featured?: boolean }) {
  const metric = project.metrics?.[0];
  return (
    <Link href={`/dashboard/user/projects/${project.slug}`} className={`premium-card group overflow-hidden transition hover:-translate-y-1 hover:border-[color:var(--primary)] ${featured ? "lg:col-span-2" : ""}`}>
      <div className="aspect-[16/9] bg-[color:var(--surface-secondary)] p-6">
        <div className="flex h-full items-end rounded-[var(--radius-md)] bg-[color:var(--primary-soft)] p-5 text-[color:var(--primary)] transition group-hover:scale-[1.02]">
          <FiBriefcase className="text-4xl" aria-hidden />
        </div>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-2">
          {project.category?.name ? <span className="rounded-full bg-[color:var(--secondary-soft)] px-3 py-1 text-xs font-bold text-[color:var(--secondary)]">{project.category.name}</span> : null}
          {project.year ? <span className="rounded-full bg-[color:var(--accent-soft)] px-3 py-1 text-xs font-bold text-[color:var(--accent)]">{project.year}</span> : null}
        </div>
        <p className="mt-4 font-heading text-2xl font-extrabold text-[color:var(--text-primary)]">{project.title}</p>
        {project.shortDescription ? <p className="mt-3 text-sm leading-6 text-[color:var(--text-secondary)]">{project.shortDescription}</p> : null}
        <div className="mt-5 flex items-center justify-between gap-4">
          {metric ? <p className="text-sm font-bold text-[color:var(--primary)]">{metric.value}{metric.unit ?? ""} {metric.label}</p> : <span />}
          <span className="inline-flex items-center gap-1 text-sm font-bold text-[color:var(--primary)]">Case Study <FiArrowUpRight /></span>
        </div>
      </div>
    </Link>
  );
}

function ProofList({ title, href, items }: { title: string; href: string; items: SimpleContent[] }) {
  return (
    <Link href={href} className="premium-card block p-6 transition hover:-translate-y-1 hover:border-[color:var(--primary)]">
      <p className="text-sm font-bold uppercase tracking-[0.14em] text-[color:var(--secondary)]">{title}</p>
      <div className="mt-5 grid gap-4">
        {items.slice(0, 3).map((item) => (
          <p key={item.id} className="font-heading text-xl font-extrabold text-[color:var(--text-primary)]">{item.title ?? item.name}</p>
        ))}
      </div>
    </Link>
  );
}
