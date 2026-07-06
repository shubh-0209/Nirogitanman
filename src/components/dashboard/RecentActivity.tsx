import * as React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ActivityItem {
  id: string | number;
  user?: {
    name: string;
    avatar?: string;
  };
  title: string;
  description?: string;
  time: string;
  icon?: React.ElementType;
}

interface RecentActivityProps extends React.HTMLAttributes<HTMLDivElement> {
  items: ActivityItem[];
}

export function RecentActivity({ items, className, ...props }: RecentActivityProps) {
  return (
    <div className={cn("space-y-6", className)} {...props}>
      {items.map((item) => (
        <div key={item.id} className="flex gap-4">
          {item.user ? (
            <Avatar className="h-9 w-9 border border-border">
              {item.user.avatar && <AvatarImage src={item.user.avatar} alt={item.user.name} />}
              <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                {item.user.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          ) : item.icon ? (
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <item.icon className="h-4 w-4" />
            </div>
          ) : (
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted" />
          )}
          
          <div className="flex flex-col gap-1 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <p className="text-sm font-medium text-foreground leading-none">
                {item.title}
              </p>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {item.time}
              </span>
            </div>
            {item.description && (
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
