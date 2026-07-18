"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { DashboardWidget } from "@/types/api";

export function DashboardChart({ widget }: { widget: DashboardWidget }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={widget.datasets ?? []}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#1d4ed8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
