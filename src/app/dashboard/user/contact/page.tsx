import { FiLinkedin, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import type { ReactNode } from "react";
import { PageHeader } from "@/components/user/PageHeader";
import { Section } from "@/components/user/Section";
import { ContactForm } from "@/components/forms/ContactForm";
import { getPublicProfile } from "@/services/profile.server-service";

export default async function ContactPage() {
  const profile = await getPublicProfile().catch(() => null);
  const person = profile?.data;

  return (
    <>
      <PageHeader title="Kontak" description="Kirim pesan profesional melalui form yang divalidasi dan tersimpan ke dashboard admin." />
      <Section eyebrow="Diskusi" title="Mari bicara tentang people, growth, dan culture." tone="strong">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="premium-card p-7">
            <p className="font-heading text-2xl font-extrabold">Kanal profesional</p>
            <div className="mt-6 grid gap-4">
              {person?.publicEmail ? <ContactItem icon={<FiMail />} label="Email" value={person.publicEmail} href={`mailto:${person.publicEmail}`} /> : null}
              {person?.whatsapp ? <ContactItem icon={<FiPhone />} label="WhatsApp" value="Mulai percakapan" href={`https://wa.me/${person.whatsapp}`} /> : null}
              {person?.linkedin ? <ContactItem icon={<FiLinkedin />} label="LinkedIn" value={person.linkedin} href={person.linkedin} /> : null}
              {person?.location ? <ContactItem icon={<FiMapPin />} label="Lokasi" value={person.location} /> : null}
            </div>
          </div>
          <ContactForm />
        </div>
      </Section>
    </>
  );
}

function ContactItem({ icon, label, value, href }: { icon: ReactNode; label: string; value: string; href?: string }) {
  const content = (
    <span className="flex items-start gap-3 rounded-[var(--radius-md)] border border-[color:var(--border)] p-4 transition hover:border-[color:var(--primary)]">
      <span className="mt-1 text-[color:var(--primary)]">{icon}</span>
      <span>
        <span className="block text-xs font-bold uppercase tracking-[0.14em] text-[color:var(--text-muted)]">{label}</span>
        <span className="mt-1 block font-semibold text-[color:var(--text-primary)]">{value}</span>
      </span>
    </span>
  );
  return href ? <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>{content}</a> : content;
}
