"use client";
import { DashboardCard } from "@/components/DashboardCard";
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis } from "recharts";

type ChartDataPoint = { x: string | number; y: number };

function MiniLineChart({ data, color }: { data: ChartDataPoint[]; color: string }) {
  return (
    <ResponsiveContainer width="100%" height={48}>
      <LineChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
        <Line type="monotone" dataKey="y" stroke={color} strokeWidth={2} dot={false} />
        <XAxis dataKey="x" hide />
        <YAxis hide />
      </LineChart>
    </ResponsiveContainer>
  );
}

function MiniBarChart({ data, color }: { data: ChartDataPoint[]; color: string }) {
  return (
    <ResponsiveContainer width="100%" height={48}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
        <Bar dataKey="y" fill={color} radius={[4, 4, 0, 0]} />
        <XAxis dataKey="x" hide />
        <YAxis hide />
      </BarChart>
    </ResponsiveContainer>
  );
}

const cards = [
  {
    title: "Fleet Health",
    value: "98%",
    chart: <MiniLineChart data={[{ x: 1, y: 90 }, { x: 2, y: 95 }, { x: 3, y: 98 }]} color="hsl(var(--chart-1))" />,
  },
  {
    title: "Monthly Cost",
    value: "$12,340",
    chart: <MiniBarChart data={[{ x: "Jan", y: 9000 }, { x: "Feb", y: 11000 }, { x: "Mar", y: 12340 }]} color="hsl(var(--chart-2))" />,
  },
  {
    title: "Vehicle Count",
    value: "42",
    chart: <MiniLineChart data={[{ x: 1, y: 38 }, { x: 2, y: 40 }, { x: 3, y: 42 }]} color="hsl(var(--chart-3))" />,
  },
];

export function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {cards.map((card, i) => (
        <DashboardCard key={i} title={card.title} value={card.value}>
          {card.chart}
        </DashboardCard>
      ))}
    </div>
  );
}
