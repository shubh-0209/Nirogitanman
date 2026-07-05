import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { cn } from "@/utils/cn";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description?: string;
  action?: React.ReactNode;
  illustration?: React.ReactNode;
  className?: string;
}

export function HeroSection({ title, subtitle, description, action, illustration, className }: HeroSectionProps) {
  return (
    <Section className={cn("relative overflow-hidden bg-slate-50 dark:bg-slate-950", className)}>
      <Container className="relative z-10 grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
        <div className="max-w-2xl space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-foreground">
              {title} <span className="text-primary block">{subtitle}</span>
            </h1>
            {description && (
              <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
                {description}
              </p>
            )}
          </div>
          {action && <div className="flex flex-col sm:flex-row gap-4">{action}</div>}
        </div>
        {illustration && (
          <div className="mx-auto max-w-full lg:max-w-none flex justify-center animate-in fade-in slide-in-from-right-8 duration-700">
            {illustration}
          </div>
        )}
      </Container>
    </Section>
  );
}
