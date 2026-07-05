import * as React from "react";
import { cn } from "@/lib/utils";

interface TestimonialGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function TestimonialGrid({ className, children, ...props }: TestimonialGridProps) {
  return (
    <div
      className={cn(
        "grid gap-8 sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
