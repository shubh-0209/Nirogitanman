"use client";

import * as React from "react";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardContent } from "./layout/DashboardContent";
import { Role } from "@/features/auth/utils";
import { NAVIGATION } from "@/config/navigation";

interface DashboardShellProps {
  children: React.ReactNode;
  userRole: Role;
  userEmail: string;
  userName: string;
  userId: string;
}

export function DashboardShell({ children, userRole, userEmail, userName, userId }: DashboardShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      <DashboardSidebar 
        links={NAVIGATION.PATIENT_SIDEBAR} 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader 
          onMenuClick={() => setIsSidebarOpen(true)} 
          userEmail={userEmail}
          userName={userName}
          userRole={userRole}
          userId={userId}
        />
        <DashboardContent>
          {children}
        </DashboardContent>
      </div>
    </div>
  );
}

