import { cn } from "@/utils/cn";

export function DashboardShell({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]", className)} {...props}>
      {children}
    </div>
  );
}
