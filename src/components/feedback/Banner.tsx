import { AlertCircle, CheckCircle2, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/utils/cn";

interface BannerProps {
  type: "success" | "error" | "info";
  title: string;
  message?: string;
  className?: string;
}

export function Banner({ type, title, message, className }: BannerProps) {
  const icons = {
    success: <CheckCircle2 className="h-4 w-4 text-secondary" />,
    error: <AlertCircle className="h-4 w-4 text-destructive" />,
    info: <Info className="h-4 w-4 text-blue-500" />,
  };

  const borderColors = {
    success: "border-secondary/50",
    error: "border-destructive/50",
    info: "border-blue-500/50",
  };

  return (
    <Alert className={cn("bg-background", borderColors[type], className)}>
      {icons[type]}
      <AlertTitle>{title}</AlertTitle>
      {message && <AlertDescription>{message}</AlertDescription>}
    </Alert>
  );
}
