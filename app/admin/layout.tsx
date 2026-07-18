import Link from "next/link";

const links = [
  ["/admin/dashboard", "Dashboard"],
  ["/admin/projects", "Projects"],
  ["/admin/profile", "Profile"],
  ["/admin/messages", "Messages"],
  ["/admin/media", "Media"],
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950">
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <aside className="hidden w-60 shrink-0 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 lg:block">
          <p className="text-sm font-bold text-slate-950 dark:text-white">Admin</p>
          <nav className="mt-4 grid gap-1">
            {links.map(([href, label]) => <Link key={href} className="rounded-md px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800" href={href}>{label}</Link>)}
          </nav>
        </aside>
        <section className="min-w-0 flex-1">{children}</section>
      </div>
    </div>
  );
}
