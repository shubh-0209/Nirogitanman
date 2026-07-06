import * as React from "react";
import { cn } from "@/lib/utils";

interface SidebarSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  children: React.ReactNode;
}

export function SidebarSection({ title, children, className, ...props }: SidebarSectionProps) {
  return (
    <div className={cn("py-2", className)} {...props}>
      {title && (
        <h4 className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {title}
        </h4>
      )}
      <div className="space-y-1">
        {children}
      </div>
    </div>
  );
}
