import Link from "next/link";
import { FiBriefcase, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { apiGet, apiList } from "@/lib/api";
import type { Experience, Expertise, Profile, Project, SimpleContent, Statistic } from "@/types/api";
import { EmptyState } from "@/components/ui/EmptyState";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { displayDateRange } from "@/lib/format";

export async function HomePage() {
  const [profile, stats, experiences, expertise, projects, achievements, certifications, testimonials] = await Promise.all([
    apiGet<Profile | null>("/public/profile").catch(() => null),
    apiGet<Statistic[]>("/public/statistics").catch(() => null),
    apiGet<Experience[]>("/public/experiences").catch(() => null),
    apiGet<Expertise[]>("/public/expertise").catch(() => null),
    apiList<Project>("/public/projects?featured=true&limit=3").catch(() => null),
    apiGet<SimpleContent[]>("/public/achievements").catch(() => null),
    apiGet<SimpleContent[]>("/public/certifications").catch(() => null),
    apiGet<SimpleContent[]>("/public/testimonials").catch(() => null),
  ]);
  const person = profile?.data;

  return (
    <>
      <section className="bg-white dark:bg-slate-950">
        <div className="mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <Reveal>
            {person ? (
              <div>
                <p className="inline-flex rounded-md border border-cyan-200 bg-cyan-50 px-3 py-1 text-sm font-semibold text-cyan-800 dark:border-cyan-500/30 dark:bg-cyan-500/10 dark:text-cyan-200">
                  {person.availabilityStatus ?? "Status belum diatur"}
                </p>
                <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight text-slate-950 dark:text-white sm:text-6xl">
                  {person.name}
                </h1>
                <p className="mt-4 text-xl font-semibold text-blue-700 dark:text-cyan-300">{person.professionalTitle}</p>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">{person.headline ?? person.shortDescription}</p>
                <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-300">
                  {person.location ? <span className="inline-flex items-center gap-2"><FiMapPin />{person.location}</span> : null}
                  {person.publicEmail ? <a className="inline-flex items-center gap-2" href={`mailto:${person.publicEmail}`}><FiMail />{person.publicEmail}</a> : null}
                  {person.whatsapp ? <a className="inline-flex items-center gap-2" href={`https://wa.me/${person.whatsapp}`}><FiPhone />WhatsApp</a> : null}
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <ButtonLink href="/experience">View Experience</ButtonLink>
                  <ButtonLink href="/documents" variant="secondary">Download CV</ButtonLink>
                  <ButtonLink href="/contact" variant="secondary">Contact Me</ButtonLink>
                </div>
              </div>
            ) : (
              <EmptyState title="Profil belum dikonfigurasi." description="Tambahkan profil utama melalui dashboard admin untuk mengisi hero section." />
            )}
          </Reveal>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
            <div className="grid gap-4 sm:grid-cols-2">
              {(stats?.data ?? []).length ? (
                stats!.data.map((stat) => (
                  <div key={stat.id} className="rounded-lg bg-white p-5 shadow-sm dark:bg-slate-950">
                    <p className="text-3xl font-bold text-slate-950 dark:text-white">{String(stat.value)}{stat.unit ?? ""}</p>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{stat.label}</p>
                  </div>
                ))
              ) : (
                <div className="sm:col-span-2">
                  <EmptyState title="Statistik profesional belum tersedia." />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Section eyebrow="About" title="Profil HR yang berorientasi data">
        {person?.shortDescription || person?.about ? <p className="max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">{person.shortDescription ?? person.about}</p> : <EmptyState title="Ringkasan about belum ditambahkan." />}
      </Section>

      <Section eyebrow="Expertise" title="Keahlian HR">
        <div className="grid gap-4 md:grid-cols-3">
          {(expertise?.data ?? []).length ? expertise!.data.slice(0, 6).map((item) => (
            <article key={item.id} className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <p className="font-semibold text-slate-950 dark:text-white">{item.name}</p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
            </article>
          )) : <div className="md:col-span-3"><EmptyState title="Belum ada expertise yang aktif." /></div>}
        </div>
      </Section>

      <Section eyebrow="Experience" title="Pengalaman terbaru">
        <div className="grid gap-4">
          {(experiences?.data ?? []).length ? experiences!.data.slice(0, 3).map((item) => (
            <article key={item.id} className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-lg font-semibold">{item.position}</p>
              <p className="text-sm text-blue-700 dark:text-cyan-300">{item.companyName} · {displayDateRange(item.startDate, item.endDate, item.isCurrent)}</p>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
            </article>
          )) : <EmptyState title="Belum ada pengalaman kerja yang ditambahkan." />}
        </div>
      </Section>

      <Section eyebrow="Projects" title="Featured HR projects">
        <div className="grid gap-4 md:grid-cols-3">
          {(projects?.data ?? []).length ? projects!.data.map((project) => (
            <Link key={project.id} href={`/projects/${project.slug}`} className="rounded-lg border border-slate-200 bg-white p-5 hover:border-blue-500 dark:border-slate-800 dark:bg-slate-900">
              <FiBriefcase className="text-blue-700 dark:text-cyan-300" />
              <p className="mt-4 font-semibold">{project.title}</p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{project.shortDescription}</p>
            </Link>
          )) : <div className="md:col-span-3"><EmptyState title="Belum ada proyek featured yang dipublikasikan." /></div>}
        </div>
      </Section>

      <Section eyebrow="Proof" title="Pencapaian, sertifikasi, dan testimoni">
        <div className="grid gap-4 lg:grid-cols-3">
          <PreviewList title="Achievements" items={achievements?.data ?? []} empty="Belum ada pencapaian yang dipublikasikan." />
          <PreviewList title="Certifications" items={certifications?.data ?? []} empty="Belum ada sertifikasi tersedia." />
          <PreviewList title="Testimonials" items={testimonials?.data ?? []} empty="Belum ada testimoni yang disetujui." />
        </div>
      </Section>

      <section className="bg-blue-700 px-4 py-14 text-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-2xl font-bold">Siap berdiskusi tentang kebutuhan HR?</p>
            <p className="mt-2 text-blue-100">Gunakan form kontak agar pesan tersimpan aman di dashboard admin.</p>
          </div>
          <ButtonLink href="/contact" variant="secondary">Contact Me</ButtonLink>
        </div>
      </section>
    </>
  );
}

function PreviewList({ title, items, empty }: { title: string; items: SimpleContent[]; empty: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <p className="font-semibold text-slate-950 dark:text-white">{title}</p>
      <div className="mt-4 grid gap-3">
        {items.length ? items.slice(0, 3).map((item) => <p key={item.id} className="text-sm text-slate-600 dark:text-slate-300">{item.title ?? item.name}</p>) : <EmptyState title={empty} />}
      </div>
    </div>
  );
}
