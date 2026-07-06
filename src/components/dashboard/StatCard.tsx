import * as React from "react";
import { DashboardCard } from "./DashboardCard";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
    label: string;
  };
  className?: string;
}

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  className
}: StatCardProps) {
  return (
    <DashboardCard className={className} contentClassName="flex flex-col justify-center p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="h-10 w-10 bg-muted text-primary rounded-full flex items-center justify-center">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-4">
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {description && !trend && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
        {trend && (
          <p className="text-sm mt-1 flex items-center gap-1">
            <span className={cn("font-medium", trend.isPositive ? "text-success" : "text-error")}>
              {trend.isPositive ? "+" : "-"}{Math.abs(trend.value)}%
            </span>
            <span className="text-muted-foreground">{trend.label}</span>
          </p>
        )}
      </div>
    </DashboardCard>
  );
}
