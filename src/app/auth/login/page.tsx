import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/auth/LoginForm";

export default async function LoginPage() {
  const cookieStore = await cookies();
  if (cookieStore.get("accessToken")?.value) {
    redirect("/dashboard/admin/home");
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center px-4">
      <div className="w-full rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-[var(--shadow-sm)]">
        <h1 className="text-2xl font-bold text-[color:var(--text-primary)]">Admin Login</h1>
        <p className="mt-2 text-sm text-[color:var(--text-secondary)]">Masuk untuk mengelola konten portofolio.</p>
        <LoginForm />
      </div>
    </div>
  );
}
