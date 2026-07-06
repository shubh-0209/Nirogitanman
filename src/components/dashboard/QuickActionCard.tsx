import * as React from "react";
import { LucideIcon, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  className?: string;
}

export function QuickActionCard({ title, description, icon: Icon, href, className }: QuickActionCardProps) {
  return (
    <Link 
      href={href}
      className={cn(
        "group flex items-start gap-4 p-5 sm:p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all duration-300",
        className
      )}
    >
      <div className="h-10 w-10 bg-muted text-muted-foreground rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{title}</h4>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors self-center opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0" />
    </Link>
  );
}
