"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import { login } from "@/services/auth.service";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type LoginValues = z.infer<typeof schema>;

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: LoginValues) {
    await login(values);
    toast.success("Login berhasil.");
    router.replace("/dashboard/admin/home");
    router.refresh();
  }

  return (
    <form className="mt-6 grid gap-4" onSubmit={handleSubmit(onSubmit)}>
      <label className="grid gap-2 text-sm font-medium">
        Email
        <input className="form-input" type="email" {...register("email")} />
        {errors.email ? <span className="text-xs text-red-600">{errors.email.message}</span> : null}
      </label>
      <label className="grid gap-2 text-sm font-medium">
        Password
        <span className="flex gap-2">
          <input className="form-input" type={showPassword ? "text" : "password"} {...register("password")} />
          <button className="rounded-[var(--radius-sm)] border border-[color:var(--border)] px-3 text-xs font-bold" type="button" onClick={() => setShowPassword((value) => !value)}>
            {showPassword ? "Sembunyi" : "Lihat"}
          </button>
        </span>
        {errors.password ? <span className="text-xs text-red-600">{errors.password.message}</span> : null}
      </label>
      <button className="min-h-11 rounded-full bg-[color:var(--primary)] px-5 text-sm font-bold text-white disabled:opacity-60" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Masuk..." : "Masuk"}
      </button>
    </form>
  );
}
