import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiExternalLink, FiInstagram, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import type { ReactNode } from "react";
import { PageHeader } from "@/components/user/PageHeader";
import { Section } from "@/components/user/Section";
import { ContactForm } from "@/components/forms/ContactForm";
import { staticContactLinks, staticProfile } from "@/lib/static-profile";

export default async function ContactPage() {
  return (
    <>
      <PageHeader title="Kontak" description="Kirim pesan profesional untuk peluang kerja, kolaborasi, atau diskusi Human Resources." eyebrow="Human Resources • People Growth" />
      <Section title="Mari bicara tentang people, growth, dan culture.">
        <div className="grid min-w-0 gap-8 lg:grid-cols-[0.82fr_1.08fr]">
          <div className="grid min-w-0 gap-5">
            <div className="min-w-0 rounded-[8px] border border-[color:var(--border)] bg-[color:var(--surface)] p-5 sm:p-6">
              <div className="grid gap-5">
                {staticContactLinks.map((item) => (
                  <ContactItem key={`${item.label}-${item.value}`} icon={contactIcon(item.type)} label={item.label} value={item.value} href={item.href} />
                ))}
                <ContactItem icon={<FiMapPin />} label="Lokasi" value={staticProfile.location} />
              </div>
            </div>

            <article className="grid min-w-0 gap-5 rounded-[8px] border border-[color:var(--border)] bg-[color:var(--surface)] p-5 sm:grid-cols-[190px_minmax(0,1fr)]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[8px] bg-[color:var(--surface-soft)]">
                <Image src={staticProfile.imageUrl} alt={`Potret ${staticProfile.name}`} fill sizes="190px" className="object-cover object-center" />
              </div>
              <div className="min-w-0 flex flex-col justify-center">
                <h2 className="overflow-wrap-anywhere font-serif text-3xl font-semibold text-[color:var(--text-primary)]">{staticProfile.name}</h2>
                <p className="mt-1 font-serif text-lg text-[color:var(--primary)]">{staticProfile.headline}</p>
                <p className="mt-4 text-sm leading-6 text-[color:var(--text-secondary)]">{staticProfile.shortDescription}</p>
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
    <span className="grid min-w-0 grid-cols-[44px_minmax(0,1fr)_18px] items-center gap-3 border-b border-[color:var(--border)] pb-5 last:border-b-0 last:pb-0 sm:grid-cols-[64px_minmax(0,1fr)_20px] sm:gap-4">
      <span className="grid size-12 place-items-center rounded-full bg-[color:var(--surface-soft)] text-2xl text-[color:var(--primary)] sm:size-14 sm:text-3xl">{icon}</span>
      <span className="min-w-0">
        <span className="block font-serif text-xl font-semibold text-[color:var(--text-primary)]">{label}</span>
        <span className="mt-1 block overflow-wrap-anywhere font-semibold text-[color:var(--text-primary)]">{value}</span>
        {helper ? <span className="mt-1 block text-sm text-[color:var(--primary)]">{helper}</span> : null}
      </span>
      {href ? <FiExternalLink className="text-[color:var(--primary)]" /> : <span />}
    </span>
  );

  return href ? <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>{content}</a> : content;
}

function contactIcon(type: string) {
  if (type === "whatsapp") return <FiPhone />;
  if (type === "email") return <FiMail />;
  return <FiInstagram />;
}
