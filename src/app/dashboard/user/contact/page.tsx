import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiExternalLink, FiMail, FiMapPin, FiPhone, FiUsers } from "react-icons/fi";
import type { ReactNode } from "react";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/user/PageHeader";
import { Section } from "@/components/user/Section";
import { ContactForm } from "@/components/forms/ContactForm";
import { getPublicProfile } from "@/services/profile.server-service";
import { getPublicSettings } from "@/services/settings.service";
import type { Profile } from "@/types/api";

export default async function ContactPage() {
  const [profile, settings] = await Promise.all([
    getPublicProfile().catch(() => null),
    getPublicSettings().catch(() => null),
  ]);
  const person = profile?.data ?? null;
  const contactItems = getContactItems(person, settings?.data.socials ?? []);
  const imageUrl = person ? getProfileImageUrl(person) : null;

  return (
    <>
      <PageHeader title="Kontak" description="Kirim pesan profesional untuk peluang kerja, kolaborasi, atau diskusi Human Resources." eyebrow="Human Resources • People Growth" />
      <Section title="Mari bicara tentang people, growth, dan culture.">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.08fr]">
          <div className="grid gap-5">
            <div className="rounded-[8px] border border-[color:var(--border)] bg-[color:var(--surface)] p-6">
              {contactItems.length ? (
                <div className="grid gap-5">
                  {contactItems.map((item) => (
                    <ContactItem key={`${item.label}-${item.value}`} icon={item.icon} label={item.label} value={item.value} href={item.href} helper={item.helper} />
                  ))}
                </div>
              ) : (
                <EmptyState title="Kontak publik belum tersedia." description="Kontak akan tersedia setelah informasi publik dipublikasikan." />
              )}
            </div>

            {person ? <article className={`grid gap-5 rounded-[8px] border border-[color:var(--border)] bg-[color:var(--surface)] p-5 ${imageUrl ? "sm:grid-cols-[190px_1fr]" : ""}`}>
              {imageUrl ? <div className="relative aspect-[4/5] overflow-hidden rounded-[8px] bg-[color:var(--surface-soft)]">
                <Image src={imageUrl} alt={`Potret ${person.name}`} fill sizes="190px" className="object-cover object-center" />
              </div> : null}
              <div className="flex flex-col justify-center">
                <h2 className="font-serif text-3xl font-semibold text-[color:var(--text-primary)]">{person.name}</h2>
                {person.headline ? <p className="mt-1 font-serif text-lg text-[color:var(--primary)]">{person.headline}</p> : null}
                {person.shortDescription ? <p className="mt-4 text-sm leading-6 text-[color:var(--text-secondary)]">{person.shortDescription}</p> : null}
                <Link href="/about" className="mt-5 inline-flex w-fit items-center gap-3 rounded-[6px] border border-[color:var(--primary)] px-4 py-2 text-sm font-semibold text-[color:var(--primary)] hover:bg-[color:var(--primary-soft)]">
                  Lihat Portofolio <FiArrowRight />
                </Link>
              </div>
            </article> : null}
          </div>
          <ContactForm />
        </div>
      </Section>
    </>
  );
}

function ContactItem({ icon, label, value, helper, href }: { icon: ReactNode; label: string; value: string; helper?: string; href?: string }) {
  const content = (
    <span className="grid grid-cols-[52px_minmax(0,1fr)_20px] items-center gap-4 border-b border-[color:var(--border)] pb-5 last:border-b-0 last:pb-0 sm:grid-cols-[64px_minmax(0,1fr)_20px]">
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

function getProfileImageUrl(profile: Profile) {
  return profile.profileImageUrl ?? profile.profileImage?.secureUrl ?? profile.heroImageUrl ?? profile.heroImage?.secureUrl ?? null;
}

function getContactItems(profile: Profile | null, socials: { label: string; url: string }[]) {
  const items: { label: string; value: string; href?: string; icon: ReactNode; helper?: string }[] = socials.map((item) => ({
    label: item.label,
    value: item.url,
    href: item.url,
    icon: <FiUsers />,
  }));

  if (profile?.whatsapp) {
    items.push({
      label: "WhatsApp",
      value: profile.whatsapp,
      href: `https://wa.me/${profile.whatsapp.replace(/\D/g, "")}`,
      icon: <FiPhone />,
    });
  }

  if (profile?.publicEmail) {
    items.push({
      label: "Email",
      value: profile.publicEmail,
      href: `mailto:${profile.publicEmail}`,
      icon: <FiMail />,
    });
  }

  if (profile?.location) {
    items.push({
      label: "Lokasi",
      value: profile.location,
      href: "",
      icon: <FiMapPin />,
      helper: undefined,
    });
  }

  return items;
}
