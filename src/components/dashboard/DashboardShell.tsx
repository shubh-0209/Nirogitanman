"use client";

import * as React from "react";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardContent } from "./layout/DashboardContent";
import { Role } from "@/features/auth/utils";
import { NAVIGATION } from "@/config/navigation";
import { ReminderScheduler } from "@/features/patient/reminders/components/ReminderScheduler";
import { AIProvider } from "@/components/ai/AIProvider";
import { AIAssistantWrapper } from "@/components/ai/AIAssistantWrapper";

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
    <AIProvider userName={userName?.split(' ')[0] || "there"}>
      <div className="min-h-screen bg-background flex flex-col md:flex-row">
        <ReminderScheduler userId={userId} />
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
        <AIAssistantWrapper />
      </div>
    </AIProvider>
  );
}

