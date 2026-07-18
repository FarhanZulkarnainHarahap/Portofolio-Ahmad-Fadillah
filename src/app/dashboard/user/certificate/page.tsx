import Link from "next/link";
import { FiArrowRight, FiAward, FiCalendar } from "react-icons/fi";
import { PageHeader } from "@/components/user/PageHeader";
import { Section } from "@/components/user/Section";
import { getPublicCertificates } from "@/services/certificate.service";
import type { SimpleContent } from "@/types/api";

const fallbackCertificates: SimpleContent[] = [
  { id: "hrmp", name: "HR Management Professional (HRMP)", issuer: "Human Resources Certification Institute (HRCI)", year: 2023, description: "Sertifikasi unggulan untuk memperkuat kompetensi manajemen HR." },
  { id: "tot", name: "Training of Trainer (TOT)", issuer: "BNSP - LSP MSDM", year: 2022, description: "Kompetensi fasilitasi pelatihan dan desain pembelajaran." },
  { id: "recruitment", name: "Recruitment & Selection", issuer: "HR Academy", year: 2021, description: "Penguatan proses rekrutmen, seleksi, dan interview berbasis kompetensi." },
  { id: "analytics", name: "People Analytics", issuer: "Coursera", year: 2023, description: "Dasar people analytics untuk keputusan HR berbasis data." },
  { id: "cert", name: "HR Certification", issuer: "Badan Kepegawaian Negara (BKN)", year: 2020, description: "Sertifikasi dasar tata kelola administrasi dan kepatuhan HR." },
];

export default async function CertificationsPage() {
  const response = await getPublicCertificates().catch(() => null);
  const items = response?.data?.length ? response.data : fallbackCertificates;
  const featured = items[0];

  return (
    <>
      <PageHeader title="Sertifikasi" description="Sertifikasi profesional dan bukti pembelajaran berkelanjutan." eyebrow="Human Resources • Professional Growth" />
      <Section title="Kompetensi yang dibangun lewat pembelajaran formal dan sertifikasi profesional.">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-3">
            {["Semua Sertifikat", "HR Management", "People Development", "Recruitment", "Analytics", "Compliance"].map((item, index) => (
              <span key={item} className={`rounded-[6px] border px-4 py-2 text-sm font-semibold ${index === 0 ? "border-[color:var(--primary)] bg-[color:var(--primary)] text-[color:var(--text-on-primary)]" : "border-[color:var(--border)] bg-[color:var(--surface)] text-[color:var(--text-secondary)]"}`}>{item}</span>
            ))}
          </div>
          <span className="rounded-[6px] border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-2 text-sm font-semibold text-[color:var(--text-secondary)]">Terbaru</span>
        </div>

        {featured ? (
          <Link href={`/certificate/${featured.slug ?? featured.id}`} className="group grid overflow-hidden rounded-[8px] border border-[color:var(--border)] bg-[color:var(--surface-soft)] p-8 lg:grid-cols-[0.58fr_0.42fr] lg:items-center">
            <div className="grid grid-cols-[96px_1fr] gap-6">
              <span className="grid size-24 place-items-center rounded-full bg-[color:var(--surface)] text-5xl text-[color:var(--primary)]"><FiAward /></span>
              <div>
                <p className="font-semibold text-[color:var(--primary)]">Sertifikasi Unggulan</p>
                <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight text-[color:var(--text-primary)]">{featured.name ?? featured.title}</h2>
                <p className="mt-2 text-lg text-[color:var(--text-secondary)]">{featured.issuer}</p>
                <p className="mt-8 inline-flex items-center gap-3 font-semibold text-[color:var(--primary)]">Lihat Detail <FiArrowRight /></p>
              </div>
            </div>
            <CertificateMock title={featured.name ?? featured.title ?? "Certificate"} issuer={featured.issuer ?? "Certification Institute"} accent />
          </Link>
        ) : null}

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.slice(1).map((item, index) => (
            <Link key={item.id} href={`/certificate/${item.slug ?? item.id}`} className="rounded-[8px] border border-[color:var(--border)] bg-[color:var(--surface)] p-5 transition hover:-translate-y-1 hover:border-[color:var(--primary)]">
              <CertificateMock title={item.name ?? item.title ?? "Certificate"} issuer={item.issuer ?? "HR Institute"} compact accent={index % 2 === 0} />
              <h3 className="mt-5 font-serif text-2xl font-semibold leading-tight text-[color:var(--text-primary)]">{item.name ?? item.title}</h3>
              <p className="mt-1 text-[color:var(--text-secondary)]">{item.issuer}</p>
              {item.year ? <p className="mt-3 inline-flex items-center gap-2 text-sm text-[color:var(--text-muted)]"><FiCalendar />{item.year}</p> : null}
              <p className="mt-5 inline-flex items-center gap-3 text-sm font-semibold text-[color:var(--primary)]">Lihat Detail <FiArrowRight /></p>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}

function CertificateMock({ title, issuer, compact = false, accent = false }: { title: string; issuer: string; compact?: boolean; accent?: boolean }) {
  return (
    <div className={`relative overflow-hidden rounded-[4px] border border-[color:var(--border-strong)] bg-[color:var(--surface)] shadow-[var(--shadow-sm)] ${compact ? "aspect-[16/9]" : "min-h-48"}`}>
      <div className={`absolute inset-y-0 left-0 w-8 ${accent ? "bg-[color:var(--primary)]" : "bg-[color:var(--secondary)]"}`} />
      <div className="flex h-full flex-col items-center justify-center p-6 pl-12 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--text-muted)]">Certificate</p>
        <p className="mt-2 font-serif text-2xl font-semibold leading-tight text-[color:var(--text-primary)]">{title}</p>
        <p className="mt-2 text-sm text-[color:var(--text-secondary)]">{issuer}</p>
      </div>
    </div>
  );
}
