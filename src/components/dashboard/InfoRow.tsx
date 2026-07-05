import * as React from "react";
import { cn } from "@/lib/utils";

interface InfoRowProps {
  label: string;
  value: React.ReactNode;
  className?: string;
}

export function InfoRow({ label, value, className }: InfoRowProps) {
  return (
    <div className={cn("py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 last:border-0", className)}>
      <dt className="text-sm font-medium text-slate-500">{label}</dt>
      <dd className="text-sm text-slate-900 mt-1 sm:mt-0 font-medium">{value || <span className="text-slate-400 italic">Not provided</span>}</dd>
    </div>
  );
}
