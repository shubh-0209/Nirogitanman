import { cn } from "@/utils/cn";

export function SidebarShell({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("hidden border-r bg-sidebar md:block", className)} {...props}>
      <div className="flex h-full max-h-screen flex-col gap-2">
        {children}
      </div>
    </div>
  );
}
