import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface SidebarItemProps {
  title: string;
  href: string;
  icon: React.ElementType;
  isActive?: boolean;
  isPlaceholder?: boolean;
  onClick?: () => void;
}

export function SidebarItem({ 
  title, 
  href, 
  icon: Icon, 
  isActive, 
  isPlaceholder,
  onClick 
}: SidebarItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
        isActive 
          ? "bg-primary/10 text-primary font-semibold" 
          : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground font-medium",
        isPlaceholder && !isActive && "opacity-80"
      )}
    >
      <Icon className={cn("h-5 w-5", "text-current")} />
      {title}
      {isPlaceholder && (
        <span className="ml-auto text-[10px] uppercase tracking-wider font-semibold text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
          Soon
        </span>
      )}
    </Link>
  );
}
