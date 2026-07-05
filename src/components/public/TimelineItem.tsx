import * as React from "react";
import { cn } from "@/lib/utils";

interface TimelineItemProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  icon?: React.ReactNode;
  isLast?: boolean;
}

export function TimelineItem({
  title,
  description,
  icon,
  isLast = false,
  className,
  ...props
}: TimelineItemProps) {
  return (
    <div className={cn("relative flex gap-6 pb-12", className)} {...props}>
      {!isLast && (
        <div className="absolute left-6 top-14 bottom-0 w-px bg-border/60 -translate-x-1/2" />
      )}
      <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white border border-border shadow-sm text-primary">
        {icon || <div className="h-3 w-3 rounded-full bg-primary" />}
      </div>
      <div className="flex flex-col pt-2.5">
        <h4 className="text-xl font-semibold text-foreground">{title}</h4>
        <p className="mt-2 text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
