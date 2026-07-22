"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, type ReactNode, useMemo, useState } from "react";
import { toast } from "sonner";
import { createAdminResource, updateAdminResource, uploadAdminMedia } from "@/services/admin-client.service";
import type { AdminResourceRow } from "@/services/admin-resource.service";

type FieldType = "text" | "textarea" | "number" | "date" | "checkbox" | "select" | "list" | "json" | "file";

type FieldConfig = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: { label: string; value: string }[];
  placeholder?: string;
};

const FORM_CONFIGS: Record<string, { title: string; description: string; fields: FieldConfig[] }> = {
  profile: {
    title: "Profil Utama",
    description: "Isi identitas utama, narasi profil, kontak, dan media publik.",
    fields: [
      { name: "name", label: "Nama", type: "text", required: true },
      { name: "professionalTitle", label: "Gelar/Judul Profesional", type: "text" },
      { name: "headline", label: "Headline", type: "text" },
      { name: "shortDescription", label: "Deskripsi Singkat", type: "textarea" },
      { name: "about", label: "Tentang Saya", type: "textarea" },
      { name: "workPhilosophy", label: "Filosofi Kerja", type: "textarea" },
      { name: "professionalValues", label: "Nilai Profesional", type: "list", placeholder: "Satu nilai per baris" },
      { name: "careerGoals", label: "Tujuan Karier", type: "textarea" },
      { name: "specializations", label: "Spesialisasi", type: "list", placeholder: "Satu spesialisasi per baris" },
      { name: "languages", label: "Bahasa", type: "list", placeholder: "Satu bahasa per baris" },
      { name: "location", label: "Lokasi", type: "text" },
      { name: "publicEmail", label: "Email Publik", type: "text" },
      { name: "whatsapp", label: "WhatsApp", type: "text" },
      { name: "linkedin", label: "LinkedIn", type: "text" },
      { name: "availabilityStatus", label: "Status Ketersediaan", type: "text" },
      { name: "profileImageId", label: "ID Media Foto Profil", type: "text" },
      { name: "heroImageId", label: "ID Media Hero", type: "text" },
      { name: "cvMediaId", label: "ID Media CV", type: "text" },
      { name: "metaTitle", label: "Meta Title", type: "text" },
      { name: "metaDescription", label: "Meta Description", type: "textarea" },
      { name: "isActive", label: "Aktif", type: "checkbox" },
    ],
  },
  education: {
    title: "Education",
    description: "Isi pendidikan yang akan mendukung halaman profil publik.",
    fields: [
      { name: "institution", label: "Institusi", type: "text", required: true },
      { name: "degree", label: "Jenjang/Gelar", type: "text" },
      { name: "field", label: "Bidang", type: "text" },
      { name: "location", label: "Lokasi", type: "text" },
      { name: "startDate", label: "Tanggal Mulai", type: "date" },
      { name: "endDate", label: "Tanggal Selesai", type: "date" },
      { name: "description", label: "Deskripsi", type: "textarea" },
      { name: "sortOrder", label: "Urutan", type: "number" },
      { name: "isActive", label: "Aktif", type: "checkbox" },
    ],
  },
  experiences: {
    title: "Pengalaman",
    description: "Isi pengalaman kerja yang akan tampil di halaman publik.",
    fields: [
      { name: "companyName", label: "Nama Perusahaan", type: "text", required: true },
      { name: "position", label: "Posisi", type: "text", required: true },
      { name: "location", label: "Lokasi", type: "text" },
      { name: "employmentType", label: "Tipe Kerja", type: "select", options: enumOptions(["FULL_TIME", "PART_TIME", "CONTRACT", "FREELANCE", "INTERNSHIP"]) },
      { name: "workMode", label: "Mode Kerja", type: "select", options: enumOptions(["ONSITE", "HYBRID", "REMOTE"]) },
      { name: "startDate", label: "Tanggal Mulai", type: "date" },
      { name: "endDate", label: "Tanggal Selesai", type: "date" },
      { name: "isCurrent", label: "Masih bekerja di sini", type: "checkbox" },
      { name: "description", label: "Deskripsi", type: "textarea" },
      { name: "responsibilities", label: "Tanggung Jawab", type: "list", placeholder: "Satu tanggung jawab per baris" },
      { name: "achievements", label: "Hasil/Pencapaian di Role Ini", type: "list", placeholder: "Satu hasil per baris" },
      { name: "tools", label: "Tools", type: "list", placeholder: "Satu tool per baris" },
      { name: "teamSize", label: "Ukuran Tim", type: "number" },
      { name: "employeeScope", label: "Scope Karyawan", type: "number" },
      { name: "sortOrder", label: "Urutan", type: "number" },
      { name: "isPublished", label: "Publikasikan", type: "checkbox" },
    ],
  },
  achievements: {
    title: "Pencapaian",
    description: "Isi pencapaian dan dampak profesional yang ingin dipublikasikan.",
    fields: [
      { name: "title", label: "Judul", type: "text", required: true },
      { name: "description", label: "Deskripsi", type: "textarea" },
      { name: "value", label: "Nilai/Angka", type: "text" },
      { name: "unit", label: "Satuan", type: "text" },
      { name: "year", label: "Tahun", type: "number" },
      { name: "category", label: "Kategori", type: "text" },
      { name: "icon", label: "Nama Ikon", type: "text" },
      { name: "sortOrder", label: "Urutan", type: "number" },
      { name: "isPublished", label: "Publikasikan", type: "checkbox" },
      { name: "isFeatured", label: "Unggulan", type: "checkbox" },
    ],
  },
  certifications: {
    title: "Sertifikat",
    description: "Isi sertifikasi, credential, dan status publikasinya.",
    fields: [
      { name: "name", label: "Nama Sertifikat", type: "text", required: true },
      { name: "issuer", label: "Penerbit", type: "text" },
      { name: "issuedAt", label: "Tanggal Terbit", type: "date" },
      { name: "expiresAt", label: "Tanggal Kedaluwarsa", type: "date" },
      { name: "neverExpires", label: "Tidak kedaluwarsa", type: "checkbox" },
      { name: "credentialId", label: "Credential ID", type: "text" },
      { name: "certificateFile", label: "File Sertifikat", type: "file" },
      { name: "description", label: "Deskripsi", type: "textarea" },
      { name: "relatedSkills", label: "Skill Terkait", type: "list", placeholder: "Satu skill per baris" },
      { name: "sortOrder", label: "Urutan", type: "number" },
      { name: "isPublished", label: "Publikasikan", type: "checkbox" },
      { name: "isFeatured", label: "Unggulan", type: "checkbox" },
    ],
  },
  "blog-posts": {
    title: "Artikel Blog",
    description: "Tulis artikel yang akan muncul di halaman blog publik.",
    fields: [
      { name: "title", label: "Judul", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", placeholder: "Boleh dikosongkan, akan dibuat dari judul" },
      { name: "excerpt", label: "Ringkasan", type: "textarea" },
      { name: "content", label: "Konten", type: "textarea" },
      { name: "author", label: "Penulis", type: "text" },
      { name: "status", label: "Status", type: "select", options: enumOptions(["DRAFT", "PUBLISHED", "SCHEDULED", "ARCHIVED"]) },
      { name: "publishedAt", label: "Tanggal Publikasi", type: "date" },
      { name: "readingTime", label: "Menit Baca", type: "number" },
      { name: "isFeatured", label: "Unggulan", type: "checkbox" },
      { name: "seoTitle", label: "SEO Title", type: "text" },
      { name: "seoDescription", label: "SEO Description", type: "textarea" },
    ],
  },
  "site-settings": {
    title: "Pengaturan Situs",
    description: "Isi key dan value JSON untuk pengaturan publik situs.",
    fields: [
      { name: "key", label: "Key", type: "text", required: true },
      { name: "value", label: "Value JSON", type: "json", required: true, placeholder: "{\"brand\":\"Portofolio HR\"}" },
      { name: "isPublic", label: "Publik", type: "checkbox" },
    ],
  },
};

type FormValue = string | boolean;

export function AdminContentForm({ mode, resource, backHref, initialData }: { mode: "create" | "edit"; resource: string; backHref: string; initialData?: AdminResourceRow }) {
  const router = useRouter();
  const config = FORM_CONFIGS[resource];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [values, setValues] = useState<Record<string, FormValue>>(() => buildInitialValues(config.fields, initialData));
  const [files, setFiles] = useState<Record<string, File | null>>({});

  const gridFields = useMemo(() => config.fields.filter((field) => !["textarea", "list"].includes(field.type)), [config.fields]);
  const wideFields = useMemo(() => config.fields.filter((field) => ["textarea", "list", "json"].includes(field.type)), [config.fields]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = buildPayload(config.fields, values);
      if (resource === "certifications" && files.certificateFile) {
        const formData = new FormData();
        formData.append("file", files.certificateFile);
        formData.append("folder", "certifications");
        const media = await uploadAdminMedia(formData);
        payload.certificateId = media.id;
        payload.credentialUrl = media.secureUrl;
      }
      if (mode === "create") {
        await createAdminResource(resource, payload);
        toast.success("Data berhasil ditambahkan.");
      } else {
        await updateAdminResource(resource, String(initialData?.id), payload);
        toast.success("Data berhasil diperbarui.");
      }
      router.push(backHref);
      router.refresh();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="mt-6 grid gap-5" onSubmit={onSubmit}>
      <section className="premium-card grid gap-5 p-6">
        <div>
          <p className="font-heading text-2xl font-extrabold">{config.title}</p>
          <p className="mt-1 text-sm text-[color:var(--text-secondary)]">{config.description}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {gridFields.map((field) => (
            <Field
              key={field.name}
              existingFileUrl={resource === "certifications" && field.name === "certificateFile" ? getStringValue(initialData?.credentialUrl) : undefined}
              field={field}
              file={files[field.name] ?? null}
              value={values[field.name]}
              onChange={(value) => setValues((current) => ({ ...current, [field.name]: value }))}
              onFileChange={(file) => setFiles((current) => ({ ...current, [field.name]: file }))}
            />
          ))}
        </div>

        {wideFields.map((field) => (
          <Field
            key={field.name}
            existingFileUrl={resource === "certifications" && field.name === "certificateFile" ? getStringValue(initialData?.credentialUrl) : undefined}
            field={field}
            file={files[field.name] ?? null}
            value={values[field.name]}
            onChange={(value) => setValues((current) => ({ ...current, [field.name]: value }))}
            onFileChange={(file) => setFiles((current) => ({ ...current, [field.name]: file }))}
          />
        ))}
      </section>

      <div className="sticky bottom-4 z-10 flex flex-wrap items-center justify-end gap-3 rounded-[var(--radius-lg)] border border-[color:var(--border)] bg-[color:var(--surface)] p-4 shadow-[var(--shadow-md)]">
        <button className="min-h-11 rounded-full bg-[color:var(--primary)] px-5 text-sm font-bold text-[color:var(--text-on-primary)] disabled:opacity-60" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Menyimpan..." : "Simpan"}
        </button>
        <button className="min-h-11 rounded-full border border-[color:var(--border-strong)] px-5 text-sm font-bold" type="button" onClick={() => router.push(backHref)}>
          Batal
        </button>
      </div>
    </form>
  );
}

function Field({
  existingFileUrl,
  field,
  file,
  value,
  onChange,
  onFileChange,
}: {
  existingFileUrl?: string;
  field: FieldConfig;
  file?: File | null;
  value: FormValue | undefined;
  onChange: (value: FormValue) => void;
  onFileChange?: (file: File | null) => void;
}) {
  const label = (
    <span>
      {field.label}
      {field.required ? <span className="text-[color:var(--primary)]"> *</span> : null}
    </span>
  );

  if (field.type === "checkbox") {
    return (
      <label className="flex min-h-11 items-center gap-3 rounded-[var(--radius-sm)] border border-[color:var(--border)] px-4 text-sm font-bold text-[color:var(--text-secondary)]">
        <input checked={Boolean(value)} type="checkbox" onChange={(event) => onChange(event.target.checked)} />
        {label}
      </label>
    );
  }

  if (field.type === "select") {
    return (
      <Label label={label}>
        <select className="form-input" required={field.required} value={String(value ?? "")} onChange={(event) => onChange(event.target.value)}>
          <option value="">Pilih...</option>
          {field.options?.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
      </Label>
    );
  }

  if (field.type === "file") {
    return (
      <Label label={label}>
        <input
          accept="image/jpeg,image/png,image/webp,application/pdf"
          className="form-input cursor-pointer file:mr-4 file:rounded-full file:border-0 file:bg-[color:var(--primary)] file:px-4 file:py-2 file:text-sm file:font-bold file:text-[color:var(--text-on-primary)]"
          required={field.required && !existingFileUrl}
          type="file"
          onChange={(event) => onFileChange?.(event.target.files?.[0] ?? null)}
        />
        <span className="text-xs font-medium leading-5 text-[color:var(--text-muted)]">
          {file
            ? `File dipilih: ${file.name}`
            : existingFileUrl
              ? "Biarkan kosong jika tidak ingin mengganti file sertifikat."
              : "Upload gambar sertifikat atau PDF. File akan tersimpan ke Cloudinary."}
        </span>
        {existingFileUrl ? (
          <a className="w-fit text-xs font-bold text-[color:var(--primary)] hover:underline" href={existingFileUrl} target="_blank" rel="noreferrer">
            Lihat file saat ini
          </a>
        ) : null}
      </Label>
    );
  }

  if (field.type === "textarea" || field.type === "list" || field.type === "json") {
    return (
      <Label label={label}>
        <textarea className="form-input min-h-36" placeholder={field.placeholder} required={field.required} value={String(value ?? "")} onChange={(event) => onChange(event.target.value)} />
      </Label>
    );
  }

  return (
    <Label label={label}>
      <input className="form-input" placeholder={field.placeholder} required={field.required} type={field.type} value={String(value ?? "")} onChange={(event) => onChange(event.target.value)} />
    </Label>
  );
}

function Label({ label, children }: { label: ReactNode; children: ReactNode }) {
  return <label className="grid gap-2 text-sm font-bold text-[color:var(--text-secondary)]"><span>{label}</span>{children}</label>;
}

function buildInitialValues(fields: FieldConfig[], data?: AdminResourceRow) {
  const values: Record<string, FormValue> = {};
  for (const field of fields) {
    const rawValue = data?.[field.name];
    if (field.type === "checkbox") {
      values[field.name] = Boolean(rawValue);
    } else if (field.type === "date") {
      values[field.name] = typeof rawValue === "string" ? rawValue.slice(0, 10) : "";
    } else if (field.type === "list") {
      values[field.name] = listToTextarea(rawValue, field.name);
    } else if (field.type === "json") {
      values[field.name] = rawValue == null ? "" : JSON.stringify(rawValue, null, 2);
    } else if (field.type === "file") {
      values[field.name] = "";
    } else {
      values[field.name] = rawValue == null ? "" : String(rawValue);
    }
  }
  return values;
}

function buildPayload(fields: FieldConfig[], values: Record<string, FormValue>) {
  const payload: Record<string, unknown> = {};
  for (const field of fields) {
    const value = values[field.name];
    if (field.type === "checkbox") {
      payload[field.name] = Boolean(value);
      continue;
    }

    if (field.type === "file") continue;

    if (typeof value !== "string" || !value.trim()) continue;

    if (field.type === "number") {
      payload[field.name] = Number(value);
    } else if (field.type === "date") {
      payload[field.name] = `${value}T00:00:00.000Z`;
    } else if (field.type === "list") {
      payload[field.name] = textareaToList(value, field.name);
    } else if (field.type === "json") {
      payload[field.name] = parseJsonValue(value);
    } else {
      payload[field.name] = value.trim();
    }
  }
  return payload;
}

function textareaToList(value: string, fieldName: string) {
  const lines = value.split("\n").map((line) => line.trim()).filter(Boolean);
  if (fieldName === "responsibilities" || fieldName === "achievements") {
    return lines.map((content, sortOrder) => ({ content, sortOrder }));
  }
  if (fieldName === "tools" || fieldName === "relatedSkills" || fieldName === "professionalValues" || fieldName === "specializations" || fieldName === "languages") return lines;
  return lines;
}

function parseJsonValue(value: string) {
  try {
    return JSON.parse(value);
  } catch {
    return value.trim();
  }
}

function listToTextarea(value: unknown, fieldName: string) {
  if (!Array.isArray(value)) return "";
  if (fieldName === "responsibilities" || fieldName === "achievements") {
    return value.map((item) => (isRecord(item) ? item.content : item)).filter(Boolean).join("\n");
  }
  return value.join("\n");
}

function enumOptions(values: string[]) {
  return values.map((value) => ({ value, label: value.replaceAll("_", " ") }));
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getStringValue(value: unknown) {
  return typeof value === "string" && value.trim() ? value : undefined;
}
