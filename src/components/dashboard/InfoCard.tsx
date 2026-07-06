import * as React from "react";
import { cn } from "@/lib/utils";

interface InfoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}

export function InfoCard({
  title,
  description,
  children,
  action,
  className,
  ...props
}: InfoCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-xl border border-border bg-card overflow-hidden shadow-sm",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between border-b border-border bg-muted/50 px-6 py-5">
        <div>
          <h3 className="font-semibold text-card-foreground">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        {action && <div>{action}</div>}
      </div>
      <div className="flex flex-col flex-1 px-6 py-5">
        {children}</div>
    </div>
  );
}
