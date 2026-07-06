"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  title: string;
  href?: string;
}

interface DashboardBreadcrumbProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: BreadcrumbItem[];
}

export function DashboardBreadcrumb({ items: propItems, className, ...props }: DashboardBreadcrumbProps) {
  const pathname = usePathname();
  
  // Auto-generate breadcrumbs if not provided
  const items = React.useMemo(() => {
    if (propItems) return propItems;
    
    const paths = pathname.split('/').filter(Boolean);
    const generatedItems: BreadcrumbItem[] = [];
    
    let currentPath = '';
    paths.forEach((path) => {
      currentPath += `/${path}`;
      // Format title: capitalize first letter, replace hyphens with spaces
      const title = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
      generatedItems.push({
        title,
        href: currentPath
      });
    });
    
    return generatedItems;
  }, [pathname, propItems]);

  if (!items || items.length === 0) return null;

  return (
    <nav className={cn("flex items-center text-sm text-muted-foreground", className)} {...props}>
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={item.title} className="flex items-center">
              {index === 0 && (
                <Home className="h-4 w-4 mr-2" />
              )}
              {item.href && !isLast ? (
                <Link 
                  href={item.href} 
                  className="hover:text-foreground transition-colors"
                >
                  {item.title}
                </Link>
              ) : (
                <span className={cn(isLast && "font-medium text-foreground")}>
                  {item.title}
                </span>
              )}
              {!isLast && (
                <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
