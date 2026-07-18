"use client";

import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { DashboardWidget } from "@/types/api";

const chartColors = [
  "#C84B31",
  "#2D2A26",
  "#A86F5C",
  "#D9967F",
  "#7B746D",
  "#B77729",
];

export function DashboardChart({ widget }: { widget: DashboardWidget }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={widget.datasets ?? []}>
        <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
        <XAxis dataKey="label" tick={{ fill: "var(--text-muted)" }} axisLine={{ stroke: "var(--border-strong)" }} tickLine={{ stroke: "var(--border)" }} />
        <YAxis tick={{ fill: "var(--text-muted)" }} axisLine={{ stroke: "var(--border-strong)" }} tickLine={{ stroke: "var(--border)" }} />
        <Tooltip />
        <Bar dataKey="value" radius={[10, 10, 0, 0]}>
          {(widget.datasets ?? []).map((item, index) => (
            <Cell key={item.id} fill={chartColors[index % chartColors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
