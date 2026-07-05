"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/utils/cn";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Activity, Apple, Sparkles, FileText } from "lucide-react";

export function TopNavigation() {
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Features</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <ListItem href="/features" title="Overview" icon={<Activity className="h-4 w-4" />}>
                Explore the complete platform features.
              </ListItem>
              <ListItem href="/ai-health" title="AI Health" icon={<Sparkles className="h-4 w-4" />}>
                Symptom checker and wellness guide.
              </ListItem>
              <ListItem href="/diet-planner" title="Diet Planner" icon={<Apple className="h-4 w-4" />}>
                Personalized nutrition & dosha mapping.
              </ListItem>
              <ListItem href="/reports" title="Health Reports" icon={<FileText className="h-4 w-4" />}>
                Secure medical records management.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuLink 
            render={<Link href="/doctors" className={navigationMenuTriggerStyle()} />}
          >
            Find Doctors
          </NavigationMenuLink>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuLink 
            render={<Link href="/about" className={navigationMenuTriggerStyle()} />}
          >
            About Us
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon?: React.ReactNode }
>(({ className, title, children, icon, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink 
        render={
          <Link
            ref={ref}
            href={href || "#"}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 hover:text-slate-900 focus:bg-slate-100 focus:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50 dark:focus:bg-slate-800 dark:focus:text-slate-50",
              className
            )}
            {...props}
          />
        }
      >
        <div className="flex items-center gap-2 mb-1">
          {icon && <span className="text-primary">{icon}</span>}
          <div className="text-sm font-medium leading-none">{title}</div>
        </div>
        <p className="line-clamp-2 text-sm leading-snug text-slate-500 dark:text-slate-400 mt-1">
          {children}
        </p>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
