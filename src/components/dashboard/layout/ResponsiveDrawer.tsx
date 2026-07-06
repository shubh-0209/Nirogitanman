"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ResponsiveDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export function ResponsiveDrawer({ isOpen, onClose, children, className }: ResponsiveDrawerProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden animate-in fade-in duration-200"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 bg-sidebar border-r border-sidebar-border transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full",
          className
        )}
      >
        {children}
      </aside>
    </>
  );
}
