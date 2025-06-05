"use client";
import { DashboardCard } from "@/components/DashboardCard";
import { MiniLineChart, MiniBarChart } from "@/lib/charts";

const cards = [
  {
    title: "Fleet Health",
    value: "98%",
    chart: <MiniLineChart data={[{ x: 1, y: 90 }, { x: 2, y: 95 }, { x: 3, y: 98 }]} />,
  },
  {
    title: "Monthly Cost",
    value: "$12,340",
    chart: <MiniBarChart data={[{ x: "Jan", y: 9000 }, { x: "Feb", y: 11000 }, { x: "Mar", y: 12340 }]} />,
  },
  {
    title: "Vehicle Count",
    value: "42",
    chart: <MiniLineChart data={[{ x: 1, y: 38 }, { x: 2, y: 40 }, { x: 3, y: 42 }]} />,
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
