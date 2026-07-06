"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { SidebarItem } from "./SidebarItem";

interface SidebarLink {
  title: string;
  href: string;
  icon: React.ElementType;
  isPlaceholder?: boolean;
}

interface SidebarNavProps {
  links: SidebarLink[];
  onItemClick?: () => void;
}

export function SidebarNav({ links, onItemClick }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {links.map((link) => (
        <SidebarItem
          key={link.title}
          title={link.title}
          href={link.href}
          icon={link.icon}
          isActive={pathname === link.href}
          isPlaceholder={link.isPlaceholder}
          onClick={onItemClick}
        />
      ))}
    </nav>
  );
}
