import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
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
