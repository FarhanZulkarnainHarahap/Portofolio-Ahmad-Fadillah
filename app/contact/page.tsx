import { apiGet } from "@/lib/api";
import type { Profile } from "@/types/api";
import { PageHeader } from "@/components/public/PageHeader";
import { Section } from "@/components/public/Section";
import { ContactForm } from "@/components/public/ContactForm";

export default async function ContactPage() {
  const profile = await apiGet<Profile | null>("/public/profile").catch(() => null);
  const person = profile?.data;

  return (
    <>
      <PageHeader title="Contact" description="Kirim pesan melalui form yang divalidasi dan tersimpan ke database." />
      <Section title="Informasi kontak">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <dl className="grid gap-4 text-sm">
              <div><dt className="text-slate-500">Email</dt><dd>{person?.publicEmail ?? "Belum diatur"}</dd></div>
              <div><dt className="text-slate-500">WhatsApp</dt><dd>{person?.whatsapp ?? "Belum diatur"}</dd></div>
              <div><dt className="text-slate-500">LinkedIn</dt><dd>{person?.linkedin ?? "Belum diatur"}</dd></div>
              <div><dt className="text-slate-500">Lokasi</dt><dd>{person?.location ?? "Belum diatur"}</dd></div>
            </dl>
          </div>
          <ContactForm />
        </div>
      </Section>
    </>
  );
}
