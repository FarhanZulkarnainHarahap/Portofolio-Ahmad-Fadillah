import { apiGet } from "@/lib/api";
import type { DashboardWidget } from "@/types/api";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/public/PageHeader";
import { Section } from "@/components/public/Section";
import { DashboardChart } from "@/components/public/DashboardChart";

export default async function HrDashboardPage() {
  const response = await apiGet<DashboardWidget[]>("/public/dashboard-widgets").catch(() => null);
  const widgets = response?.data ?? [];

  return (
    <>
      <PageHeader title="HR Dashboard Demo" description="Dashboard showcase berbasis dataset yang dikelola admin, tanpa data pribadi nyata." />
      <Section title="Dashboard widgets">
        {widgets.length ? (
          <div className="grid gap-4 lg:grid-cols-2">
            {widgets.map((widget) => (
              <article key={widget.id} className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                <p className="font-semibold">{widget.title}</p>
                {widget.widgetType === "KPI" ? (
                  <p className="mt-4 text-4xl font-bold text-blue-700 dark:text-cyan-300">{widget.value}{widget.unit}</p>
                ) : (
                  <div className="mt-5 h-64">
                    <DashboardChart widget={widget} />
                  </div>
                )}
              </article>
            ))}
          </div>
        ) : <EmptyState title="Dashboard belum memiliki dataset." />}
      </Section>
    </>
  );
}
