import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis } from "recharts";

type ChartDataPoint = { x: string | number; y: number };

export function MiniLineChart({ data }: { data: ChartDataPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={48}>
      <LineChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
        <Line type="monotone" dataKey="y" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={false} />
        <XAxis dataKey="x" hide />
        <YAxis hide />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function MiniBarChart({ data }: { data: ChartDataPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={48}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
        <Bar dataKey="y" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
        <XAxis dataKey="x" hide />
        <YAxis hide />
      </BarChart>
    </ResponsiveContainer>
  );
}
