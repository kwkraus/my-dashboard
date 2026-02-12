"use client";
import { DashboardStatCard } from "@/components/DashboardCards";
import {
  DollarSign,
  Users,
  TrendingUp,
  Activity,
  UserCheck,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useEffect, useState } from "react";

const lineData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 700 },
  { name: "Jun", value: 900 },
]

const barData = [
  { name: "Mon", value: 20 },
  { name: "Tue", value: 35 },
  { name: "Wed", value: 25 },
  { name: "Thu", value: 40 },
  { name: "Fri", value: 30 },
  { name: "Sat", value: 15 },
  { name: "Sun", value: 10 },
]

const pieData = [
  { name: "Desktop", value: 45, colorVar: "--chart-1" },
  { name: "Mobile", value: 35, colorVar: "--chart-2" },
  { name: "Tablet", value: 20, colorVar: "--chart-3" },
]

// Hook to get CSS custom property values
function useChartColors() {
  const [colors, setColors] = useState({
    chart1: "#8884d8",
    chart2: "#82ca9d", 
    chart3: "#ffc658",
    chart4: "#ff7c7c",
    chart5: "#8dd1e1",
  });

  useEffect(() => {
    const updateColors = () => {
      const root = document.documentElement;
      const computedStyle = getComputedStyle(root);
      
      setColors({
        chart1: computedStyle.getPropertyValue('--chart-1').trim() || "#8884d8",
        chart2: computedStyle.getPropertyValue('--chart-2').trim() || "#82ca9d",
        chart3: computedStyle.getPropertyValue('--chart-3').trim() || "#ffc658", 
        chart4: computedStyle.getPropertyValue('--chart-4').trim() || "#ff7c7c",
        chart5: computedStyle.getPropertyValue('--chart-5').trim() || "#8dd1e1",
      });
    };

    updateColors();
    
    // Listen for theme changes
    const observer = new MutationObserver(updateColors);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });

    return () => observer.disconnect();
  }, []);

  return colors;
}

// Mock data for the dashboard
const stats = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    changeType: "positive" as const,
    icon: DollarSign,
    clickable: true,
    href: "/revenue",
  },
  {
    title: "Active Users",
    value: "2,350",
    change: "+180.1%", 
    changeType: "positive" as const,
    icon: Users,
  },
  {
    title: "User Conversion",
    value: "2.5%",
    change: "+0.3%",
    changeType: "positive" as const,
    icon: UserCheck,
  },
  {
    title: "Conversion Rate",
    value: "12.5%",
    change: "-4.3%",
    changeType: "negative" as const,
    icon: TrendingUp,
  },
  {
    title: "Active Sessions",
    value: "573",
    change: "+12.1%",
    changeType: "positive" as const,
    icon: Activity,
  },
]

const charts = [
  {
    title: "Sales Overview",
    description: "Monthly sales performance",
    component: LineChartComponent,
  },
  {
    title: "User Engagement",
    description: "Weekly active users",
    component: BarChartComponent,
  },
  {
    title: "Traffic Sources",
    description: "Distribution of traffic sources",
    component: PieChartComponent,
  },
]


function LineChartComponent() {
  const colors = useChartColors();
  
  return (
    <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
      <LineChart data={lineData}>
        <CartesianGrid 
          strokeDasharray="3 3" 
          stroke="hsl(var(--border))"
          opacity={0.5}
        />
        <XAxis 
          dataKey="name" 
          tick={{ 
            fontSize: 10, 
            fill: "hsl(var(--muted-foreground))" 
          }}
          axisLine={{ stroke: "hsl(var(--border))" }}
          tickLine={{ stroke: "hsl(var(--border))" }}
        />
        <YAxis 
          tick={{ 
            fontSize: 10, 
            fill: "hsl(var(--muted-foreground))" 
          }}
          axisLine={{ stroke: "hsl(var(--border))" }}
          tickLine={{ stroke: "hsl(var(--border))" }}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: "hsl(var(--popover))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
            fontSize: "12px",
            color: "hsl(var(--popover-foreground))",
          }}
        />
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke={colors.chart1}
          strokeWidth={3}
          dot={{ fill: colors.chart1, r: 4 }}
          activeDot={{ r: 6, fill: colors.chart1 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

function BarChartComponent() {
  const colors = useChartColors();
  
  return (
    <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
      <BarChart data={barData}>
        <CartesianGrid 
          strokeDasharray="3 3" 
          stroke="hsl(var(--border))"
          opacity={0.5}
        />
        <XAxis 
          dataKey="name" 
          tick={{ 
            fontSize: 10, 
            fill: "hsl(var(--muted-foreground))" 
          }}
          axisLine={{ stroke: "hsl(var(--border))" }}
          tickLine={{ stroke: "hsl(var(--border))" }}
        />
        <YAxis 
          tick={{ 
            fontSize: 10, 
            fill: "hsl(var(--muted-foreground))" 
          }}
          axisLine={{ stroke: "hsl(var(--border))" }}
          tickLine={{ stroke: "hsl(var(--border))" }}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: "hsl(var(--popover))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
            fontSize: "12px",
            color: "hsl(var(--popover-foreground))",
          }}
        />
        <Bar 
          dataKey="value" 
          fill={colors.chart2}
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

function PieChartComponent() {
  const colors = useChartColors();
  const pieColors = [colors.chart1, colors.chart2, colors.chart3];
  
  return (
    <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
      <PieChart>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
          className="sm:inner-radius-[60px] sm:outer-radius-[100px]"
          stroke="hsl(var(--background))"
          strokeWidth={2}
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={pieColors[index]} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{
            backgroundColor: "hsl(var(--popover))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
            fontSize: "12px",
            color: "hsl(var(--popover-foreground))",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}


export function DashboardCharts() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Dashboard</h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          Welcome back! Here&apos;s what&apos;s happening with your business today.
        </p>
      </div>
      
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <DashboardStatCard stat={stat} key={i}/>
        ))}
      </div>      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {charts.map((chart, i) => {
          const ChartComponent = chart.component;
          return (
            <div key={i} className="bg-card border border-border rounded-lg shadow-sm p-4">
              <h2 className="text-lg font-semibold mb-2 text-card-foreground">{chart.title}</h2>
              <p className="text-sm text-muted-foreground mb-4">{chart.description}</p>
              <ChartComponent />
            </div>
          );
        })}
      </div>
    </div>
  );
}
