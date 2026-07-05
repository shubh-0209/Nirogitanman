import { cn } from "@/utils/cn";

export function Section({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn("py-12 md:py-16 lg:py-24", className)} {...props}>
      {children}
    </section>
  );
}
