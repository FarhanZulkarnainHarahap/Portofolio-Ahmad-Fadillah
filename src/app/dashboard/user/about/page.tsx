import Image from "next/image";
import { FiBarChart2, FiBookOpen, FiMail, FiMapPin, FiPhone, FiShield, FiTarget, FiUsers } from "react-icons/fi";
import { PageHeader } from "@/components/user/PageHeader";
import { Section } from "@/components/user/Section";
import { getPublicProfile } from "@/services/profile.server-service";
import { getPublicTools } from "@/services/tools.server-service";
import type { Expertise, Profile } from "@/types/api";

const fallbackProfile = {
  name: "Ahamad Fadillah Harahap",
  headline: "Lulusan S1 Agribisnis UMSU",
  about:
    "Saya adalah profesional Human Resources yang berfokus pada pengelolaan talenta, pengembangan budaya kerja, dan mendorong pertumbuhan karyawan serta organisasi secara berkelanjutan. Dengan kombinasi analitis, empati, dan pemahaman bisnis, saya berkomitmen untuk menciptakan pengalaman kerja yang positif dan berkinerja tinggi.",
  location: "Medan, Sumatera Utara, Indonesia",
  publicEmail: "afadillah117@gmail.com",
  whatsapp: "6287768885573",
  availabilityStatus: "Human Resources • People Growth",
} satisfies Partial<Profile>;

const fallbackTools: Expertise[] = [
  { id: "excel", name: "Microsoft Excel", category: { name: "Tools" } },
  { id: "hris", name: "HRIS", category: { name: "Tools" } },
  { id: "canva", name: "Canva", category: { name: "Tools" } },
  { id: "notion", name: "Notion", category: { name: "Tools" } },
  { id: "workspace", name: "Google Workspace", category: { name: "Tools" } },
  { id: "linkedin", name: "LinkedIn Recruiter", category: { name: "Tools" } },
];

const values = [
  { title: "Integritas", text: "Menjunjung tinggi kejujuran, transparansi, dan akuntabilitas dalam setiap keputusan.", icon: FiShield },
  { title: "Kolaborasi", text: "Bekerja bersama lintas fungsi untuk membangun lingkungan kerja positif.", icon: FiUsers },
  { title: "Pengembangan", text: "Terus belajar, beradaptasi, dan memberi nilai lebih bagi organisasi.", icon: FiBarChart2 },
  { title: "Dampak", text: "Berfokus pada hasil yang berkelanjutan dan memberi dampak nyata.", icon: FiTarget },
];

export default async function AboutPage() {
  const [profile, expertise] = await Promise.all([
    getPublicProfile().catch(() => null),
    getPublicTools().catch(() => null),
  ]);
  const person = { ...fallbackProfile, ...(profile?.data ?? {}) } as Profile;
  const tools = expertise?.data?.filter((item) => item.category?.name === "Tools") ?? fallbackTools;

  return (
    <>
      <PageHeader title="Tentang Saya" description="Profil, nilai, spesialisasi, dan arah karier saya di bidang Human Resources." eyebrow="Human Resources • People Growth" />
      <Section title={person.name} description={person.about ?? person.shortDescription ?? undefined}>
        <div className="grid gap-10 lg:grid-cols-[1fr_0.82fr] lg:items-start">
          <div>
            <p className="font-serif text-2xl text-[color:var(--primary)]">{person.headline}</p>
            <div className="mt-5 h-px w-20 bg-[color:var(--primary)]" />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <InfoCard icon={<FiBookOpen />} label="Pendidikan" value="S1 Agribisnis" detail="Universitas Muhammadiyah Sumatera Utara" />
              <InfoCard icon={<FiMapPin />} label="Lokasi" value={person.location ?? "Medan, Indonesia"} detail="Indonesia" />
              <InfoCard icon={<FiMail />} label="Email" value={person.publicEmail ?? "afadillah117@gmail.com"} />
              <InfoCard icon={<FiPhone />} label="WhatsApp" value="+62 877-6888-5573" />
            </div>
          </div>
          <div className="relative">
            <div className="relative aspect-[5/6] overflow-hidden rounded-[8px] border-[12px] border-[color:var(--surface-soft)] bg-[color:var(--surface-soft)]">
              <Image src="/me-about.jpeg" alt={`Potret ${person.name}`} fill sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover object-[center_16%]" />
            </div>
            <DotGrid className="absolute -right-10 bottom-12 hidden lg:grid" />
          </div>
        </div>
      </Section>

      <Section title="Nilai yang Saya Pegang" tone="default">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ title, text, icon: Icon }) => (
            <article key={title} className="rounded-[8px] border border-[color:var(--border)] bg-[color:var(--surface)] p-6">
              <span className="grid size-14 place-items-center rounded-full bg-[color:var(--surface-soft)] text-2xl text-[color:var(--primary)]">
                <Icon aria-hidden />
              </span>
              <p className="mt-4 font-serif text-xl font-semibold text-[color:var(--text-primary)]">{title}</p>
              <p className="mt-2 text-sm leading-6 text-[color:var(--text-secondary)]">{text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Tools yang Digunakan" tone="muted">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {tools.slice(0, 6).map((tool) => (
            <div key={tool.id} className="flex min-h-16 items-center justify-center rounded-[8px] border border-[color:var(--border)] bg-[color:var(--surface)] px-4 text-center font-semibold text-[color:var(--text-primary)]">
              {tool.name}
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

function InfoCard({ icon, label, value, detail }: { icon: React.ReactNode; label: string; value: string; detail?: string }) {
  return (
    <article className="grid grid-cols-[64px_1fr] gap-4 rounded-[8px] border border-[color:var(--border)] bg-[color:var(--surface)] p-5">
      <span className="grid size-14 place-items-center rounded-full bg-[color:var(--surface-soft)] text-2xl text-[color:var(--primary)]">{icon}</span>
      <div>
        <p className="font-serif text-xl font-semibold text-[color:var(--text-primary)]">{label}</p>
        <p className="mt-1 font-semibold text-[color:var(--text-secondary)]">{value}</p>
        {detail ? <p className="text-sm text-[color:var(--text-secondary)]">{detail}</p> : null}
      </div>
    </article>
  );
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
