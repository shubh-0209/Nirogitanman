import * as React from "react";
import { cn } from "@/lib/utils";

interface DashboardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function DashboardContent({ children, className, ...props }: DashboardContentProps) {
  return (
    <main className={cn("flex-1 p-4 md:p-8 md:pt-6 overflow-y-auto", className)} {...props}>
      <div className="mx-auto w-full max-w-7xl">
        {children}
      </div>
    </main>
  );
}
