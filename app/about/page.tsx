import { apiGet } from "@/lib/api";
import type { Profile, SimpleContent } from "@/types/api";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/public/PageHeader";
import { Section } from "@/components/public/Section";

export default async function AboutPage() {
  const [profile, education] = await Promise.all([
    apiGet<Profile | null>("/public/profile").catch(() => null),
    apiGet<SimpleContent[]>("/public/settings").catch(() => null),
  ]);
  const person = profile?.data;

  return (
    <>
      <PageHeader title="About" description="Profil profesional, nilai kerja, spesialisasi, dan arah karier." />
      <Section title="Profil lengkap">
        {person ? (
          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
            <div className="prose max-w-none dark:prose-invert">
              <p>{person.about ?? person.shortDescription}</p>
              <h3>Filosofi kerja</h3>
              <p>{person.workPhilosophy ?? "Filosofi kerja belum ditambahkan."}</p>
              <h3>Tujuan karier</h3>
              <p>{person.careerGoals ?? "Tujuan karier belum ditambahkan."}</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <p className="font-semibold">Informasi profesional</p>
              <dl className="mt-4 grid gap-3 text-sm">
                <div><dt className="text-slate-500">Lokasi</dt><dd>{person.location ?? "Belum diatur"}</dd></div>
                <div><dt className="text-slate-500">Status</dt><dd>{person.availabilityStatus ?? "Belum diatur"}</dd></div>
                <div><dt className="text-slate-500">LinkedIn</dt><dd>{person.linkedin ?? "Belum diatur"}</dd></div>
              </dl>
            </div>
          </div>
        ) : <EmptyState title="Profil belum dikonfigurasi." />}
      </Section>
      <Section title="Timeline pendidikan">
        <EmptyState title={education ? "Pendidikan dikelola melalui dashboard admin." : "Riwayat pendidikan belum ditambahkan."} />
      </Section>
    </>
  );
}
