"use client";

import * as React from "react";
import { Menu, Bell, Search, LogOut, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Role } from "@/features/auth/utils";
import { logout } from "@/features/auth/actions";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DashboardHeaderProps {
  onMenuClick: () => void;
  userName: string;
  userEmail: string;
  userRole: Role;
}

export function DashboardHeader({ onMenuClick, userName, userEmail, userRole }: DashboardHeaderProps) {
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const rolePrefix = `/${userRole.toLowerCase()}`;

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 md:px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4 flex-1">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={onMenuClick}>
          <Menu className="h-5 w-5 text-slate-600" />
        </Button>
        
        {/* Visual Search Placeholder */}
        <div className="hidden md:flex relative max-w-md w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
          <Input 
            type="search" 
            placeholder="Search..." 
            className="pl-9 bg-slate-50 border-slate-200 h-9"
            readOnly
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Notification Placeholder */}
        <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-slate-900 hidden sm:flex">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-2 h-2 w-2 rounded-full bg-rose-500 border-2 border-white" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger className="relative h-9 w-9 rounded-full focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2">
            <Avatar className="h-9 w-9 border border-slate-200">
              <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                {initials}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none text-slate-900">{userName}</p>
                <p className="text-xs leading-none text-slate-500">{userEmail}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href={`${rolePrefix}/profile`}>
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>My Profile</span>
              </DropdownMenuItem>
            </Link>
            <Link href={`${rolePrefix}/settings`}>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <form action={logout}>
              <button type="submit" className="w-full text-left">
                <DropdownMenuItem className="cursor-pointer text-rose-600 focus:text-rose-600 focus:bg-rose-50">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </button>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
