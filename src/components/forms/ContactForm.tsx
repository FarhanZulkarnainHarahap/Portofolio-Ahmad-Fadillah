"use client";

import { useForm } from "react-hook-form";
import type { ReactNode } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import { FiMail, FiSend, FiShield } from "react-icons/fi";
import { sendContactMessage } from "@/services/message.service";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(3),
  message: z.string().min(10),
  website: z.string().max(0).optional(),
});

type ContactValues = z.infer<typeof schema>;

export function ContactForm() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactValues>({
    resolver: zodResolver(schema),
    defaultValues: { website: "" },
  });

  async function onSubmit(values: ContactValues) {
    await sendContactMessage(values);
    toast.success("Pesan berhasil dikirim.");
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 rounded-[8px] border border-[color:var(--border)] bg-[color:var(--surface)] p-7 lg:p-10">
      <input className="hidden" tabIndex={-1} autoComplete="off" {...register("website")} />
      <div className="mb-8 flex items-center gap-4">
        <span className="grid size-14 place-items-center rounded-full bg-[color:var(--surface-soft)] text-3xl text-[color:var(--primary)]"><FiMail /></span>
        <div>
          <h2 className="font-serif text-3xl font-semibold text-[color:var(--text-primary)]">Kirim Pesan</h2>
          <p className="mt-1 text-sm text-[color:var(--text-secondary)]">Isi formulir di bawah ini dan saya akan merespons sesegera mungkin.</p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Nama" error={errors.name?.message}><input className="form-input" placeholder="Masukkan nama lengkap" {...register("name")} /></Field>
        <Field label="Email" error={errors.email?.message}><input className="form-input" placeholder="Masukkan email aktif" type="email" {...register("email")} /></Field>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Telepon" error={errors.phone?.message}><input className="form-input" placeholder="Masukkan nomor telepon" {...register("phone")} /></Field>
        <Field label="Perusahaan" error={errors.company?.message}><input className="form-input" placeholder="Masukkan nama perusahaan" {...register("company")} /></Field>
      </div>
      <Field label="Subjek" error={errors.subject?.message}><input className="form-input" placeholder="Pilih atau tulis subjek pesan" {...register("subject")} /></Field>
      <Field label="Pesan Anda" error={errors.message?.message}><textarea className="form-input min-h-40 resize-none" placeholder="Tulis pesan Anda di sini..." {...register("message")} /></Field>
      <button disabled={isSubmitting} className="mt-2 inline-flex min-h-12 items-center justify-center gap-3 rounded-[6px] bg-[color:var(--primary)] px-5 text-sm font-bold text-[color:var(--text-on-primary)] transition hover:bg-[color:var(--primary-hover)] disabled:opacity-60" type="submit">
        <FiSend aria-hidden />
        {isSubmitting ? "Mengirim..." : "Kirim Pesan"}
      </button>
      <p className="mt-5 flex items-center justify-center gap-2 text-sm text-[color:var(--text-muted)]"><FiShield /> Data Anda aman dan tidak akan dibagikan ke pihak ketiga.</p>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return <label className="grid gap-2 text-sm font-semibold text-[color:var(--text-primary)]"><span>{label}</span>{children}{error ? <span className="text-xs text-[color:var(--danger)]">{error}</span> : null}</label>;
}
