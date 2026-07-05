import * as React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  time: string;
  icon: LucideIcon;
  iconClassName?: string;
  isLast?: boolean;
}

interface ActivityTimelineProps {
  events: TimelineEvent[];
  className?: string;
}

export function ActivityTimeline({ events, className }: ActivityTimelineProps) {
  if (!events?.length) {
    return <div className="text-sm text-slate-500 py-4 text-center">No recent activity</div>;
  }

  return (
    <div className={cn("space-y-4", className)}>
      {events.map((event, index) => (
        <div key={event.id} className="relative flex gap-4">
          <div className="flex flex-col items-center">
            <div className={cn("h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 z-10", event.iconClassName || "bg-slate-100 text-slate-600")}>
              <event.icon className="h-4 w-4" />
            </div>
            {!event.isLast && index !== events.length - 1 && (
              <div className="w-px h-full bg-slate-200 absolute top-8 bottom-[-16px]" />
            )}
          </div>
          <div className="flex-1 pb-4">
            <p className="text-sm font-medium text-slate-900">{event.title}</p>
            <p className="text-sm text-slate-500">{event.description}</p>
            <p className="text-xs text-slate-400 mt-1">{event.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
