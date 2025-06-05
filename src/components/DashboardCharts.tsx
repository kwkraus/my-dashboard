"use client";
import { DashboardStatCard } from "@/components/DashboardCards";
import {
  DollarSign,
  Users,
  TrendingUp,
  Activity,
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
} from "recharts"

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
  { name: "Desktop", value: 45, color: "hsl(var(--chart-1))" },
  { name: "Mobile", value: 35, color: "hsl(var(--chart-2))" },
  { name: "Tablet", value: 20, color: "hsl(var(--chart-3))" },
]

// Mock data for the dashboard
const stats = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    changeType: "positive" as const,
    icon: DollarSign,
  },
  {
    title: "Active Users",
    value: "2,350",
    change: "+180.1%", 
    changeType: "positive" as const,
    icon: Users,
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
  return (
    <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
      <LineChart data={lineData}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis 
          dataKey="name" 
          className="text-muted-foreground"
          fontSize={10}
          tick={{ fontSize: 10 }}
        />
        <YAxis 
          className="text-muted-foreground"
          fontSize={10}
          tick={{ fontSize: 10 }}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: "hsl(var(--popover))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
            fontSize: "12px",
          }}
        />
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke="hsl(var(--primary))" 
          strokeWidth={2}
          dot={{ fill: "hsl(var(--primary))", r: 3 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

function BarChartComponent() {
  return (
    <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
      <BarChart data={barData}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis 
          dataKey="name" 
          className="text-muted-foreground"
          fontSize={10}
          tick={{ fontSize: 10 }}
        />
        <YAxis 
          className="text-muted-foreground"
          fontSize={10}
          tick={{ fontSize: 10 }}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: "hsl(var(--popover))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
            fontSize: "12px",
          }}
        />
        <Bar 
          dataKey="value" 
          fill="hsl(var(--chart-2))"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

function PieChartComponent() {
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
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{
            backgroundColor: "hsl(var(--popover))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
            fontSize: "12px",
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
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Dashboard</h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          Welcome back! Here's what's happening with your business today.
        </p>
      </div>
      
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <DashboardStatCard stat={stat} key={i}/>
        ))}
      </div>
              {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {charts.map((chart, i) => {
          const ChartComponent = chart.component;
          return (
            <div key={i} className="bg-background rounded-lg shadow-sm p-4">
              <h2 className="text-lg font-semibold mb-2">{chart.title}</h2>
              <p className="text-sm text-muted-foreground mb-4">{chart.description}</p>
              <ChartComponent />
            </div>
          );
        })}
      </div>
    </div>
  );
}
