import { cn } from "@/utils/cn";

export function PageWrapper({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <main className={cn("flex min-h-screen flex-col bg-background", className)} {...props}>
      {children}
    </main>
  );
}
