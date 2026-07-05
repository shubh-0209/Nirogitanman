import { FileQuestion } from "lucide-react";
import { cn } from "@/utils/cn";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ title, description, icon, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center animate-in fade-in-50", className)}>
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        {icon || <FileQuestion className="h-10 w-10 text-muted-foreground" />}
      </div>
      <h2 className="mt-6 text-xl font-semibold">{title}</h2>
      <p className="mt-2 mb-6 text-center text-sm text-muted-foreground max-w-sm leading-relaxed">
        {description}
      </p>
      {action}
    </div>
  );
}
