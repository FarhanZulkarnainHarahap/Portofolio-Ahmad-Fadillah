import { FiCheckCircle, FiMapPin } from "react-icons/fi";
import type { ReactNode } from "react";
import { PageHeader } from "@/components/user/PageHeader";
import { Section } from "@/components/user/Section";
import { getPublicProfile } from "@/services/profile.server-service";

export default async function AboutPage() {
  const profile = await getPublicProfile().catch(() => null);
  const person = profile?.data;

  return (
    <>
      <PageHeader title="Tentang Saya" description="Profil profesional, nilai kerja, spesialisasi, dan arah karier dalam Human Resources." />
      {person ? (
        <Section eyebrow="Profil" title="Pendekatan HR yang human-centered dan terukur." tone="strong">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
            <article className="premium-card p-7">
              {person.about || person.shortDescription ? <p className="text-lg leading-8 text-[color:var(--text-secondary)]">{person.about ?? person.shortDescription}</p> : null}
              {person.workPhilosophy ? <Block title="Filosofi Kerja" text={person.workPhilosophy} /> : null}
              {person.careerGoals ? <Block title="Fokus Karier" text={person.careerGoals} /> : null}
            </article>
            <aside className="premium-card p-7">
              <p className="font-heading text-2xl font-extrabold">Informasi Profesional</p>
              <dl className="mt-6 grid gap-4 text-sm">
                {person.location ? <Info label="Lokasi" value={person.location} icon={<FiMapPin />} /> : null}
                {person.availabilityStatus ? <Info label="Status" value={person.availabilityStatus} icon={<FiCheckCircle />} /> : null}
                {person.linkedin ? <Info label="LinkedIn" value={person.linkedin} /> : null}
                {person.publicEmail ? <Info label="Email" value={person.publicEmail} /> : null}
              </dl>
            </aside>
          </div>
        </Section>
      ) : null}
    </>
  );
}

function Block({ title, text }: { title: string; text: string }) {
  return (
    <div className="mt-8 border-t border-[color:var(--border)] pt-6">
      <p className="font-heading text-2xl font-extrabold text-[color:var(--text-primary)]">{title}</p>
      <p className="mt-3 leading-8 text-[color:var(--text-secondary)]">{text}</p>
    </div>
  );
}

function Info({ label, value, icon }: { label: string; value: string; icon?: ReactNode }) {
  return (
    <div className="flex gap-3">
      {icon ? <span className="mt-1 text-[color:var(--primary)]">{icon}</span> : null}
      <div>
        <dt className="font-bold uppercase tracking-[0.12em] text-[color:var(--text-muted)]">{label}</dt>
        <dd className="mt-1 text-[color:var(--text-primary)]">{value}</dd>
      </div>
    </div>
  );
}
