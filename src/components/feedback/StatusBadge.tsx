import { Badge } from "@/components/ui/badge";
import { cn } from "@/utils/cn";

export type StatusType = "success" | "error" | "warning" | "info" | "neutral";

interface StatusBadgeProps {
  status: StatusType;
  label: string;
  className?: string;
}

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  const variants = {
    success: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    error: "bg-destructive text-destructive-foreground hover:bg-destructive/80",
    warning: "bg-yellow-500 text-white hover:bg-yellow-600",
    info: "bg-blue-500 text-white hover:bg-blue-600",
    neutral: "bg-muted text-muted-foreground hover:bg-muted/80",
  };

  return (
    <Badge className={cn(variants[status], className)}>
      {label}
    </Badge>
  );
}
