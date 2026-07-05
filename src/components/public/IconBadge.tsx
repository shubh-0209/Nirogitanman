import * as React from "react";
import { cn } from "@/lib/utils";

interface IconBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode;
  variant?: "primary" | "secondary" | "neutral";
  size?: "sm" | "md" | "lg";
}

export function IconBadge({
  icon,
  variant = "primary",
  size = "md",
  className,
  ...props
}: IconBadgeProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };

  const variantClasses = {
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/10 text-secondary",
    neutral: "bg-slate-100 text-slate-600",
  };

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {icon}
    </div>
  );
}
