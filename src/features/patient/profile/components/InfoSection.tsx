import * as React from "react";
import { cn } from "@/lib/utils";

interface InfoSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  columns?: 1 | 2 | 3 | 4;
}

export function InfoSection({ title, columns = 2, className, children, ...props }: InfoSectionProps) {
  return (
    <div className={cn("space-y-4", className)} {...props}>
      {title && (
        <h4 className="text-sm font-semibold text-foreground border-b border-border pb-2">
          {title}
        </h4>
      )}
      <div 
        className={cn(
          "grid gap-4 sm:gap-6",
          columns === 1 && "grid-cols-1",
          columns === 2 && "grid-cols-1 sm:grid-cols-2",
          columns === 3 && "grid-cols-1 sm:grid-cols-3",
          columns === 4 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        )}
      >
        {children}
      </div>
    </div>
  );
}
