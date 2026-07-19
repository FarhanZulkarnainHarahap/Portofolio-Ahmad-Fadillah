import Image from "next/image";
import { FiBookOpen, FiMail, FiMapPin, FiPhone, FiShield } from "react-icons/fi";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/user/PageHeader";
import { Section } from "@/components/user/Section";
import { getPublicProfile } from "@/services/profile.server-service";
import { getPublicTools } from "@/services/tools.server-service";
import type { Profile } from "@/types/api";

export default async function AboutPage() {
  const [profile, expertise] = await Promise.all([
    getPublicProfile().catch(() => null),
    getPublicTools().catch(() => null),
  ]);
  const person = profile?.data ?? null;
  const tools = expertise?.data?.filter((item) => item.category?.name === "Tools") ?? [];
  const values = getProfileValues(person);
  const imageUrl = person ? getProfileImageUrl(person) : null;

  if (!person) {
    return (
      <>
        <PageHeader title="Tentang Saya" description="Profil, nilai, spesialisasi, dan arah karier di bidang Human Resources." eyebrow="Human Resources • People Growth" />
        <Section title="Profil belum dipublikasikan.">
          <EmptyState title="Belum ada profil publik." description="Konten profil akan tersedia setelah data utama dipublikasikan." />
        </Section>
      </>
    );
  }

  return (
    <>
      <PageHeader title="Tentang Saya" description="Profil, nilai, spesialisasi, dan arah karier saya di bidang Human Resources." eyebrow="Human Resources • People Growth" />
      <Section title={person.name} description={person.about ?? person.shortDescription ?? undefined}>
        <div className="grid gap-10 lg:grid-cols-[1fr_0.82fr] lg:items-start">
          <div>
            {person.headline ? <p className="font-serif text-2xl text-[color:var(--primary)]">{person.headline}</p> : null}
            {person.headline ? <div className="mt-5 h-px w-20 bg-[color:var(--primary)]" /> : null}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {person.professionalTitle ? <InfoCard icon={<FiBookOpen />} label="Profesi" value={person.professionalTitle} /> : null}
              {person.location ? <InfoCard icon={<FiMapPin />} label="Lokasi" value={person.location} /> : null}
              {person.publicEmail ? <InfoCard icon={<FiMail />} label="Email" value={person.publicEmail} /> : null}
              {person.whatsapp ? <InfoCard icon={<FiPhone />} label="WhatsApp" value={person.whatsapp} /> : null}
            </div>
          </div>
          {imageUrl ? <div className="relative">
            <div className="relative aspect-[5/6] overflow-hidden rounded-[8px] border-[12px] border-[color:var(--surface-soft)] bg-[color:var(--surface-soft)]">
              <Image src={imageUrl} alt={`Potret ${person.name}`} fill sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover object-center" />
            </div>
            <DotGrid className="absolute -right-10 bottom-12 hidden lg:grid" />
          </div> : null}
        </div>
      </Section>

      {values.length ? <Section title="Nilai yang Saya Pegang" tone="default">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <article key={value} className="rounded-[8px] border border-[color:var(--border)] bg-[color:var(--surface)] p-5 sm:p-6">
              <span className="grid size-12 place-items-center rounded-full bg-[color:var(--surface-soft)] text-xl text-[color:var(--primary)] sm:size-14 sm:text-2xl">
                <FiShield aria-hidden />
              </span>
              <p className="mt-4 font-serif text-xl font-semibold text-[color:var(--text-primary)]">{value}</p>
            </article>
          ))}
        </div>
      </Section> : null}

      {tools.length ? <Section title="Tools yang Digunakan" tone="muted">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {tools.slice(0, 6).map((tool) => (
            <div key={tool.id} className="flex min-h-12 items-center justify-center rounded-[8px] border border-[color:var(--border)] bg-[color:var(--surface)] px-3 text-center text-sm font-semibold leading-tight text-[color:var(--text-primary)] sm:min-h-14">
              {tool.name}
            </div>
          ))}
        </div>
      </Section> : null}
    </>
  );
}

function InfoCard({ icon, label, value, detail }: { icon: React.ReactNode; label: string; value: string; detail?: string }) {
  return (
    <article className="grid grid-cols-[52px_1fr] gap-4 rounded-[8px] border border-[color:var(--border)] bg-[color:var(--surface)] p-4 sm:grid-cols-[58px_1fr] sm:p-5">
      <span className="grid size-12 place-items-center rounded-full bg-[color:var(--surface-soft)] text-xl text-[color:var(--primary)] sm:size-14 sm:text-2xl">{icon}</span>
      <div>
        <p className="font-serif text-xl font-semibold text-[color:var(--text-primary)]">{label}</p>
        <p className="mt-1 font-semibold text-[color:var(--text-secondary)]">{value}</p>
        {detail ? <p className="text-sm text-[color:var(--text-secondary)]">{detail}</p> : null}
      </div>
    </article>
  );
}

function getProfileImageUrl(profile: Profile) {
  return profile.profileImageUrl ?? profile.profileImage?.secureUrl ?? profile.heroImageUrl ?? profile.heroImage?.secureUrl ?? null;
}

function getProfileValues(profile: Profile | null) {
  if (!profile || !Array.isArray(profile.professionalValues)) return [];
  return profile.professionalValues.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
}

function DotGrid({ className }: { className?: string }) {
  return (
    <div className={`grid grid-cols-7 gap-4 ${className}`} aria-hidden>
      {Array.from({ length: 49 }).map((_, index) => (
        <span key={index} className="size-1 rounded-full bg-[color:var(--primary)]/60" />
      ))}
    </div>
  );
}
