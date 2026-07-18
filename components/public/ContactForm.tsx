"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import { clientRequest } from "@/lib/client-api";

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
    await clientRequest("/public/contact", { method: "POST", body: JSON.stringify(values) });
    toast.success("Pesan berhasil dikirim.");
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <input className="hidden" tabIndex={-1} autoComplete="off" {...register("website")} />
      <Field label="Name" error={errors.name?.message}><input className="form-input" {...register("name")} /></Field>
      <Field label="Email" error={errors.email?.message}><input className="form-input" type="email" {...register("email")} /></Field>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Phone" error={errors.phone?.message}><input className="form-input" {...register("phone")} /></Field>
        <Field label="Company" error={errors.company?.message}><input className="form-input" {...register("company")} /></Field>
      </div>
      <Field label="Subject" error={errors.subject?.message}><input className="form-input" {...register("subject")} /></Field>
      <Field label="Message" error={errors.message?.message}><textarea className="form-input min-h-36" {...register("message")} /></Field>
      <button disabled={isSubmitting} className="min-h-11 rounded-md bg-blue-700 px-5 text-sm font-semibold text-white disabled:opacity-60" type="submit">
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200"><span>{label}</span>{children}{error ? <span className="text-xs text-red-600">{error}</span> : null}</label>;
}
