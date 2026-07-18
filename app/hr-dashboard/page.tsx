import { apiGet } from "@/lib/api";
import type { DashboardWidget } from "@/types/api";
import { PageHeader } from "@/components/public/PageHeader";
import { Section } from "@/components/public/Section";
import { DashboardChart } from "@/components/public/DashboardChart";

export default async function HrDashboardPage() {
  const response = await apiGet<DashboardWidget[]>("/public/dashboard-widgets").catch(() => null);
  const widgets = response?.data ?? [];

  return (
    <>
      <PageHeader title="HR Dashboard" description="Showcase data HR berbasis widget yang dikelola admin, tanpa data pribadi nyata." />
      {widgets.length ? (
        <Section eyebrow="Data" title="Widget HR untuk membaca performa secara cepat." tone="strong">
          <div className="grid gap-5 lg:grid-cols-2">
            {widgets.map((widget) => (
              <article key={widget.id} className="premium-card p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-heading text-2xl font-extrabold">{widget.title}</p>
                    {widget.period ? <p className="mt-1 text-sm font-semibold text-[color:var(--text-muted)]">{widget.period}</p> : null}
                  </div>
                  <span className="rounded-full bg-[color:var(--primary-soft)] px-3 py-1 text-xs font-bold text-[color:var(--primary)]">{widget.widgetType}</span>
                </div>
                {widget.widgetType === "KPI" ? (
                  <p className="mt-7 font-heading text-5xl font-extrabold text-[color:var(--primary)]">{widget.value}{widget.unit}</p>
                ) : (
                  <div className="mt-7 h-64">
                    <DashboardChart widget={widget} />
                  </div>
                )}
              </article>
            ))}
          </div>
        </Section>
      ) : null}
    </>
  );
}
