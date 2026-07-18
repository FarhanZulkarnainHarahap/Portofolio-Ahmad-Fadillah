import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiExternalLink, FiInstagram, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import type { ReactNode } from "react";
import { PageHeader } from "@/components/user/PageHeader";
import { Section } from "@/components/user/Section";
import { ContactForm } from "@/components/forms/ContactForm";
import { getPublicProfile } from "@/services/profile.server-service";
import type { Profile } from "@/types/api";

const fallbackProfile = {
  name: "Ahamad Fadillah Harahap",
  headline: "Lulusan S1 Agribisnis UMSU",
  shortDescription: "Profesional Human Resources yang berfokus pada pengelolaan talenta, pengembangan budaya kerja, dan pertumbuhan karyawan secara berkelanjutan.",
  location: "Medan, Sumatera Utara, Indonesia",
  publicEmail: "afadillah117@gmail.com",
  whatsapp: "6287768885573",
} satisfies Partial<Profile>;

export default async function ContactPage() {
  const profile = await getPublicProfile().catch(() => null);
  const person = { ...fallbackProfile, ...(profile?.data ?? {}) } as Profile;

  return (
    <>
      <PageHeader title="Kontak" description="Kirim pesan profesional untuk peluang kerja, kolaborasi, atau diskusi Human Resources." eyebrow="Human Resources • People Growth" />
      <Section title="Mari bicara tentang people, growth, dan culture.">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.08fr]">
          <div className="grid gap-5">
            <div className="rounded-[8px] border border-[color:var(--border)] bg-[color:var(--surface)] p-6">
              <div className="grid gap-5">
                <ContactItem icon={<FiInstagram />} label="Instagram" value="@ahmad_harahaap" href="https://instagram.com/ahmad_harahaap" helper="instagram.com/ahmad_harahaap" />
                <ContactItem icon={<FiPhone />} label="WhatsApp" value="+62 877-6888-5573" href={`https://wa.me/${person.whatsapp ?? "6287768885573"}`} helper="Chat langsung via WhatsApp" />
                <ContactItem icon={<FiMail />} label="Email" value={person.publicEmail ?? "afadillah117@gmail.com"} href={`mailto:${person.publicEmail ?? "afadillah117@gmail.com"}`} helper="Kirim email" />
                <ContactItem icon={<FiMapPin />} label="Lokasi" value={person.location ?? "Medan, Indonesia"} helper="Waktu: WIB (UTC+7)" />
              </div>
            </div>

            <article className="grid gap-5 rounded-[8px] border border-[color:var(--border)] bg-[color:var(--surface)] p-5 sm:grid-cols-[190px_1fr]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[8px] bg-[color:var(--surface-soft)]">
                <Image src="/me-about.jpeg" alt={`Potret ${person.name}`} fill sizes="190px" className="object-cover object-[center_16%]" />
              </div>
              <div className="flex flex-col justify-center">
                <h2 className="font-serif text-3xl font-semibold text-[color:var(--text-primary)]">{person.name}</h2>
                <p className="mt-1 font-serif text-lg text-[color:var(--primary)]">{person.headline}</p>
                <p className="mt-4 text-sm leading-6 text-[color:var(--text-secondary)]">{person.shortDescription}</p>
                <Link href="/about" className="mt-5 inline-flex w-fit items-center gap-3 rounded-[6px] border border-[color:var(--primary)] px-4 py-2 text-sm font-semibold text-[color:var(--primary)] hover:bg-[color:var(--primary-soft)]">
                  Lihat Portofolio <FiArrowRight />
                </Link>
              </div>
            </article>
          </div>
          <ContactForm />
        </div>
      </Section>
    </>
  );
}

function ContactItem({ icon, label, value, helper, href }: { icon: ReactNode; label: string; value: string; helper?: string; href?: string }) {
  const content = (
    <span className="grid grid-cols-[64px_1fr_20px] items-center gap-4 border-b border-[color:var(--border)] pb-5 last:border-b-0 last:pb-0">
      <span className="grid size-14 place-items-center rounded-full bg-[color:var(--surface-soft)] text-3xl text-[color:var(--primary)]">{icon}</span>
      <span>
        <span className="block font-serif text-xl font-semibold text-[color:var(--text-primary)]">{label}</span>
        <span className="mt-1 block font-semibold text-[color:var(--text-primary)]">{value}</span>
        {helper ? <span className="mt-1 block text-sm text-[color:var(--primary)]">{helper}</span> : null}
      </span>
      {href ? <FiExternalLink className="text-[color:var(--primary)]" /> : <span />}
    </span>
  );

  return href ? <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>{content}</a> : content;
}
