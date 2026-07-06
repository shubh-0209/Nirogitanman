import * as React from "react";
import { cn } from "@/lib/utils";
import { DashboardCard } from "@/components/dashboard/DashboardCard";

interface ProfileCardProps extends React.ComponentProps<typeof DashboardCard> {
  children: React.ReactNode;
}

export function ProfileCard({ children, className, contentClassName, ...props }: ProfileCardProps) {
  return (
    <DashboardCard 
      className={cn("h-full", className)} 
      contentClassName={cn("p-6 sm:p-8 space-y-6", contentClassName)}
      {...props}
    >
      {children}
    </DashboardCard>
  );
}
