"use client";

import * as React from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Role } from "@/features/auth/utils";
import { NotificationMenu } from "./layout/NotificationMenu";
import { UserMenu } from "./layout/UserMenu";
import { DashboardBreadcrumb } from "./layout/DashboardBreadcrumb";

interface DashboardHeaderProps {
  onMenuClick: () => void;
  userName: string;
  userEmail: string;
  userRole: Role;
  userId: string;
}

export function DashboardHeader({ onMenuClick, userName, userEmail, userRole, userId }: DashboardHeaderProps) {
  return (
    <header className="h-16 bg-white shadow-sm px-4 md:px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4 flex-1">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={onMenuClick}>
          <Menu className="h-5 w-5 text-muted-foreground" />
        </Button>
        <DashboardBreadcrumb className="hidden md:flex" />
      </div>

      <div className="flex items-center gap-4">
        <NotificationMenu userId={userId} />
        <UserMenu userName={userName} userEmail={userEmail} userRole={userRole} />
      </div>
    </header>
  );
}

