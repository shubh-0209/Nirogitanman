"use client";

import * as React from "react";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardHeader } from "./DashboardHeader";
import { Role } from "@/features/auth/utils";

interface DashboardShellProps {
  children: React.ReactNode;
  userRole: Role;
  userEmail: string;
  userName: string;
  sidebarLinks: {
    title: string;
    href: string;
    icon: React.ElementType;
    isPlaceholder?: boolean;
  }[];
}

export function DashboardShell({ children, userRole, userEmail, userName, sidebarLinks }: DashboardShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      <DashboardSidebar 
        links={sidebarLinks} 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        userRole={userRole}
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader 
          onMenuClick={() => setIsSidebarOpen(true)} 
          userEmail={userEmail}
          userName={userName}
          userRole={userRole}
        />
        <main className="flex-1 p-4 md:p-8 md:pt-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
