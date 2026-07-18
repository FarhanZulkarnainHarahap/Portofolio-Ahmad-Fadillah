"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import { clientRequest } from "@/lib/client-api";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type LoginValues = z.infer<typeof schema>;

export function LoginForm() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: LoginValues) {
    await clientRequest("/auth/login", { method: "POST", body: JSON.stringify(values) });
    toast.success("Login berhasil.");
    router.replace("/admin/dashboard");
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
        <input className="form-input" type="password" {...register("password")} />
        {errors.password ? <span className="text-xs text-red-600">{errors.password.message}</span> : null}
      </label>
      <button className="min-h-11 rounded-md bg-blue-700 px-5 text-sm font-semibold text-white disabled:opacity-60" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Signing in..." : "Login"}
      </button>
    </form>
  );
}
