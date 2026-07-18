"use client";

import { useForm } from "react-hook-form";
import type { ReactNode } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
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
    <form onSubmit={handleSubmit(onSubmit)} className="premium-card grid gap-4 p-6">
      <input className="hidden" tabIndex={-1} autoComplete="off" {...register("website")} />
      <Field label="Nama" error={errors.name?.message}><input className="form-input" {...register("name")} /></Field>
      <Field label="Email" error={errors.email?.message}><input className="form-input" type="email" {...register("email")} /></Field>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Telepon" error={errors.phone?.message}><input className="form-input" {...register("phone")} /></Field>
        <Field label="Perusahaan" error={errors.company?.message}><input className="form-input" {...register("company")} /></Field>
      </div>
      <Field label="Subjek" error={errors.subject?.message}><input className="form-input" {...register("subject")} /></Field>
      <Field label="Pesan" error={errors.message?.message}><textarea className="form-input min-h-36" {...register("message")} /></Field>
      <button disabled={isSubmitting} className="min-h-11 rounded-full bg-[color:var(--primary)] px-5 text-sm font-bold text-[color:var(--text-on-primary)] transition hover:bg-[color:var(--primary-hover)] disabled:opacity-60" type="submit">
        {isSubmitting ? "Mengirim..." : "Kirim Pesan"}
      </button>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return <label className="grid gap-2 text-sm font-bold text-[color:var(--text-secondary)]"><span>{label}</span>{children}{error ? <span className="text-xs text-[color:var(--danger)]">{error}</span> : null}</label>;
}
