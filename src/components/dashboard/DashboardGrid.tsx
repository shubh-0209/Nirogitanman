import * as React from "react";
import { cn } from "@/lib/utils";

interface DashboardGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 1 | 2 | 3 | 4;
}

export function DashboardGrid({ columns = 3, className, children, ...props }: DashboardGridProps) {
  return (
    <div 
      className={cn(
        "grid gap-6",
        columns === 1 && "grid-cols-1",
        columns === 2 && "grid-cols-1 md:grid-cols-2",
        columns === 3 && "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
        columns === 4 && "grid-cols-1 md:grid-cols-2 xl:grid-cols-4",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
}
