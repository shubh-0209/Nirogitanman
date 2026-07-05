import * as React from "react";
import { cn } from "@/lib/utils";

interface StatHighlightProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  label: string;
  description?: string;
}

export function StatHighlight({
  value,
  label,
  description,
  className,
  ...props
}: StatHighlightProps) {
  return (
    <div className={cn("flex flex-col space-y-2", className)} {...props}>
      <span className="text-4xl font-extrabold tracking-tight text-primary md:text-5xl lg:text-6xl">
        {value}
      </span>
      <span className="text-lg font-semibold text-foreground">{label}</span>
      {description && (
        <span className="text-sm text-muted-foreground">{description}</span>
      )}
    </div>
  );
}
