import { LoginForm } from "@/components/admin/LoginForm";

export default function LoginPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center px-4">
      <div className="w-full rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-2xl font-bold text-slate-950 dark:text-white">Admin Login</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Masuk untuk mengelola konten portofolio.</p>
        <LoginForm />
      </div>
    </div>
  );
}
