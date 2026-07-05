import * as React from "react";
import { cn } from "@/lib/utils";

interface MockupFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function MockupFrame({ className, children, ...props }: MockupFrameProps) {
  return (
    <div
      className={cn(
        "relative rounded-xl border bg-white shadow-xl overflow-hidden flex flex-col",
        className
      )}
      {...props}
    >
      <div className="flex items-center space-x-2 border-b bg-slate-50/50 px-4 py-3">
        <div className="flex space-x-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-slate-200" />
          <div className="h-2.5 w-2.5 rounded-full bg-slate-200" />
          <div className="h-2.5 w-2.5 rounded-full bg-slate-200" />
        </div>
      </div>
      <div className="flex-1 overflow-hidden bg-slate-50/20">{children}</div>
    </div>
  );
}
