import * as React from "react";
import { cn } from "@/lib/utils";

interface WidgetContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  title?: string;
  action?: React.ReactNode;
}

export function WidgetContainer({ children, className, title, action, ...props }: WidgetContainerProps) {
  if (title) {
    return (
      <div
        className={cn(
          "rounded-xl border bg-white shadow-sm overflow-hidden",
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h2 className="text-base font-semibold text-gray-900">{title}</h2>
          {action && <div>{action}</div>}
        </div>
        <div className="p-5">{children}</div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
