import { ReactNode } from "react";
import { Card } from "@/components/ui/card";

interface DashboardCardProps {
  title: string;
  value: string;
  children: ReactNode;
}

export function DashboardCard({ title, value, children }: DashboardCardProps) {
  return (
    <Card className="flex flex-col gap-2 p-4 min-h-[160px]">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground font-medium">{title}</span>
        <span className="text-lg font-bold text-foreground">{value}</span>
      </div>
      <div className="flex-1 flex items-end justify-center">{children}</div>
    </Card>
  );
}
