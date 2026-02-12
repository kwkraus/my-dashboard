"use client";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface DashboardCardProps {
  title: string;
  value: string;
  children: ReactNode;
}

interface DashboardStatProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: React.ComponentType<{ className?: string }>;
  clickable?: boolean;
  href?: string;
}

interface DashboardChartCardProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function DashboardCard({ title, value, children }: DashboardCardProps) {
  return (
    <Card className="flex flex-col gap-2 p-4 min-h-[160px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {value}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
};

export function DashboardStatCard({ stat }: { stat: DashboardStatProps }) {
  const router = useRouter();
  
  const handleClick = () => {
    if (stat.clickable && stat.href) {
      router.push(stat.href);
    }
  };

  return (
    <div 
      onClick={handleClick}
      className={stat.clickable ? "cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg" : ""}
    >
      <Card key={stat.title}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
          <stat.icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold sm:text-2xl">{stat.value}</div>
          <p className="text-xs text-muted-foreground">
            <span className={`inline-flex items-center ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
              {stat.changeType === 'positive' ? (
                <ArrowUpRight className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDownRight className="h-3 w-3 mr-1" />
              )}
              {stat.change}
            </span>
            {" "}from last month
          </p>
        </CardContent>
      </Card>
    </div>
  )
};

export function DashboardChartCard({ chart }: { chart: DashboardChartCardProps }) {
  return (
    <Card key={chart.title}>
      <CardHeader>
        <CardTitle>{chart.title}</CardTitle>
        <CardDescription>
          {chart.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {chart.children}
      </CardContent>
    </Card>
  )
};