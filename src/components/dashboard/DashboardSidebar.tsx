"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { X, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Role } from "@/features/auth/utils";

interface SidebarLink {
  title: string;
  href: string;
  icon: React.ElementType;
  isPlaceholder?: boolean;
}

interface DashboardSidebarProps {
  links: SidebarLink[];
  isOpen: boolean;
  onClose: () => void;
  userRole: Role;
}

export function DashboardSidebar({ links, isOpen, onClose, userRole }: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 md:hidden animate-in fade-in duration-200"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:w-64 flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100 flex-shrink-0">
          <Link href={`/${userRole.toLowerCase()}`} className="flex items-center gap-2" onClick={() => onClose()}>
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-lg text-slate-900">Nirogitanman</span>
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={onClose}>
            <X className="h-5 w-5 text-slate-500" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4">
          <nav className="space-y-1">
            {links.map((link) => {
              const isActive = pathname === link.href;
              // If it's a placeholder, it might actually route to /dashboard/coming-soon, 
              // but we still want the UI to reflect it properly.
              return (
                <Link
                  key={link.title}
                  href={link.href}
                  onClick={() => onClose()}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-primary/10 text-primary" 
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                    link.isPlaceholder && !isActive && "opacity-80"
                  )}
                >
                  <link.icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-slate-400")} />
                  {link.title}
                  {link.isPlaceholder && (
                    <span className="ml-auto text-[10px] uppercase tracking-wider font-semibold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                      Soon
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
