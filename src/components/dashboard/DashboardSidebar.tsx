"use client";

import * as React from "react";
import Link from "next/link";
import { X, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

import { ResponsiveDrawer } from "./layout/ResponsiveDrawer";
import { SidebarNav } from "./layout/SidebarNav";

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
}

export function DashboardSidebar({ links, isOpen, onClose }: DashboardSidebarProps) {
  return (
    <ResponsiveDrawer isOpen={isOpen} onClose={onClose} className="w-72 md:w-64">
      <div className="h-16 flex items-center justify-between px-6 border-b border-border flex-shrink-0">
        <Link href="/dashboard" className="flex items-center gap-2" onClick={onClose}>
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
            <Activity className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg text-foreground">Nirogitanman</span>
        </Link>
        <Button variant="ghost" size="icon" className="md:hidden" onClick={onClose}>
          <X className="h-5 w-5 text-muted-foreground" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4">
        <SidebarNav links={links} onItemClick={onClose} />
      </div>
    </ResponsiveDrawer>
  );
}

