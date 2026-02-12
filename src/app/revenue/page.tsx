"use client";
import { DashboardStatCard } from "@/components/DashboardCards";
import {
  DollarSign,
  TrendingUp,
  PieChart as PieChartIcon,
  BarChart3,
  CreditCard,
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
  Legend,
  ComposedChart,
  Area,
} from "recharts";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Mock data - Month over Month (Last 12 months)
const monthlyRevenueData = [
  { month: "Feb '25", revenue: 42500, profit: 12750, expenses: 29750, growth: 8.5 },
  { month: "Mar '25", revenue: 48200, profit: 15400, expenses: 32800, growth: 13.4 },
  { month: "Apr '25", revenue: 51800, profit: 17120, expenses: 34680, growth: 7.5 },
  { month: "May '25", revenue: 49500, profit: 14850, expenses: 34650, growth: -4.4 },
  { month: "Jun '25", revenue: 53600, profit: 18760, expenses: 34840, growth: 8.3 },
  { month: "Jul '25", revenue: 58900, profit: 21205, expenses: 37695, growth: 9.9 },
  { month: "Aug '25", revenue: 62300, profit: 24920, expenses: 37380, growth: 5.8 },
  { month: "Sep '25", revenue: 59800, profit: 20930, expenses: 38870, growth: -4.0 },
  { month: "Oct '25", revenue: 65400, profit: 26160, expenses: 39240, growth: 9.4 },
  { month: "Nov '25", revenue: 68700, profit: 28980, expenses: 39720, growth: 5.0 },
  { month: "Dec '25", revenue: 75200, profit: 33840, expenses: 41360, growth: 9.5 },
  { month: "Jan '26", revenue: 71800, profit: 30046, expenses: 41754, growth: -4.5 },
];

// Quarterly data
const quarterlyData = [
  { quarter: "Q1 '25", revenue: 142500, profit: 45270, expenses: 97230, target: 150000 },
  { quarter: "Q2 '25", revenue: 154900, profit: 50730, expenses: 104170, target: 160000 },
  { quarter: "Q3 '25", revenue: 181000, profit: 67015, expenses: 113985, target: 175000 },
  { quarter: "Q4 '25", revenue: 215700, profit: 93026, expenses: 122674, target: 200000 },
];

// Semi-annual data
const semiAnnualData = [
  { period: "H1 '24", revenue: 245000, profit: 73500, expenses: 171500 },
  { period: "H2 '24", revenue: 278000, profit: 89120, expenses: 188880 },
  { period: "H1 '25", revenue: 297400, profit: 96000, expenses: 201400 },
  { period: "H2 '25", revenue: 396700, profit: 160041, expenses: 236659 },
];

// Revenue breakdown by category
const revenueByCategoryData = [
  { name: "Subscriptions", value: 285000, percentage: 42 },
  { name: "Services", value: 215000, percentage: 32 },
  { name: "Products", value: 125000, percentage: 18 },
  { name: "Licensing", value: 55000, percentage: 8 },
];

// Revenue by region
const revenueByRegionData = [
  { region: "North America", revenue: 312000, growth: 12.5 },
  { region: "Europe", revenue: 245000, growth: 15.8 },
  { region: "Asia Pacific", revenue: 98000, growth: 22.3 },
  { region: "Latin America", revenue: 25000, growth: 8.7 },
];

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

// Custom tooltip for better formatting
const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{name: string; value: number; color: string}>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-3 shadow-lg">
        <p className="font-semibold text-sm mb-1">{label}</p>
        {payload.map((entry, index: number) => (
          <p key={index} className="text-xs" style={{ color: entry.color }}>
            {entry.name}: ${entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const stats = [
  {
    title: "Total Revenue (YTD)",
    value: "$694,100",
    change: "+18.2%",
    changeType: "positive" as const,
    icon: DollarSign,
  },
  {
    title: "Monthly Recurring Revenue",
    value: "$71,800",
    change: "-4.5%",
    changeType: "negative" as const,
    icon: TrendingUp,
  },
  {
    title: "Gross Profit Margin",
    value: "35.8%",
    change: "+2.4%",
    changeType: "positive" as const,
    icon: PieChartIcon,
  },
  {
    title: "Average Transaction",
    value: "$1,245",
    change: "+8.7%",
    changeType: "positive" as const,
    icon: CreditCard,
  },
  {
    title: "Net Profit",
    value: "$256,041",
    change: "+22.1%",
    changeType: "positive" as const,
    icon: TrendingUp,
  },
  {
    title: "Operating Expenses",
    value: "$438,059",
    change: "+5.3%",
    changeType: "negative" as const,
    icon: BarChart3,
  },
];

export default function RevenuePage() {
  const colors = useChartColors();
  const [timeView, setTimeView] = useState<'monthly' | 'quarterly' | 'semiannual'>('monthly');

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Revenue Analytics
          </h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive revenue insights and financial performance metrics
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant={timeView === 'monthly' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setTimeView('monthly')}
          >
            Monthly
          </Button>
          <Button 
            variant={timeView === 'quarterly' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setTimeView('quarterly')}
          >
            Quarterly
          </Button>
          <Button 
            variant={timeView === 'semiannual' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setTimeView('semiannual')}
          >
            Semi-Annual
          </Button>
        </div>
      </div>
      
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <DashboardStatCard stat={stat} key={i}/>
        ))}
      </div>

      {/* Main Revenue Trend Chart */}
      <Card className="border-2 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">Revenue & Profit Trend</CardTitle>
          <CardDescription>
            {timeView === 'monthly' && 'Month-over-month performance (Last 12 months)'}
            {timeView === 'quarterly' && 'Quarterly performance comparison'}
            {timeView === 'semiannual' && 'Semi-annual revenue overview'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {timeView === 'monthly' && (
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={monthlyRevenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colors.chart1} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={colors.chart1} stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colors.chart2} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={colors.chart2} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={{ stroke: "hsl(var(--border))" }}
                />
                <YAxis 
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={{ stroke: "hsl(var(--border))" }}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  fill="url(#colorRevenue)" 
                  stroke={colors.chart1}
                  strokeWidth={2}
                  name="Revenue"
                />
                <Area 
                  type="monotone" 
                  dataKey="profit" 
                  fill="url(#colorProfit)" 
                  stroke={colors.chart2}
                  strokeWidth={2}
                  name="Profit"
                />
                <Line 
                  type="monotone" 
                  dataKey="expenses" 
                  stroke={colors.chart4}
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: colors.chart4, r: 3 }}
                  name="Expenses"
                />
              </ComposedChart>
            </ResponsiveContainer>
          )}

          {timeView === 'quarterly' && (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={quarterlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis 
                  dataKey="quarter" 
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={{ stroke: "hsl(var(--border))" }}
                />
                <YAxis 
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={{ stroke: "hsl(var(--border))" }}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="revenue" fill={colors.chart1} radius={[8, 8, 0, 0]} name="Revenue" />
                <Bar dataKey="profit" fill={colors.chart2} radius={[8, 8, 0, 0]} name="Profit" />
                <Bar dataKey="target" fill={colors.chart3} radius={[8, 8, 0, 0]} name="Target" fillOpacity={0.3} />
              </BarChart>
            </ResponsiveContainer>
          )}

          {timeView === 'semiannual' && (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={semiAnnualData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis 
                  type="number"
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <YAxis 
                  dataKey="period" 
                  type="category"
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="revenue" fill={colors.chart1} radius={[0, 8, 8, 0]} name="Revenue" />
                <Bar dataKey="profit" fill={colors.chart2} radius={[0, 8, 8, 0]} name="Profit" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* Secondary Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue by Category */}
        <Card className="shadow-md hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle>Revenue by Category</CardTitle>
            <CardDescription>Distribution of revenue streams</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={revenueByCategoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name} ${percentage}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  stroke="hsl(var(--background))"
                  strokeWidth={2}
                >
                  {revenueByCategoryData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={[colors.chart1, colors.chart2, colors.chart3, colors.chart4][index]} 
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue by Region */}
        <Card className="shadow-md hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle>Revenue by Region</CardTitle>
            <CardDescription>Geographic revenue distribution with growth rates</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueByRegionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis 
                  dataKey="region" 
                  tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                  angle={-20}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="revenue" 
                  fill={colors.chart5}
                  radius={[8, 8, 0, 0]}
                  name="Revenue"
                >
                  {revenueByRegionData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`}
                      fill={[colors.chart1, colors.chart2, colors.chart3, colors.chart4][index]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Growth Metrics */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Monthly Growth Rate</CardTitle>
          <CardDescription>Month-over-month growth percentage</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyRevenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis 
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip 
                formatter={(value: number) => `${value}%`}
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Line 
                type="monotone" 
                dataKey="growth" 
                stroke={colors.chart2}
                strokeWidth={3}
                dot={{ fill: colors.chart2, r: 4 }}
                activeDot={{ r: 6 }}
                name="Growth Rate"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
