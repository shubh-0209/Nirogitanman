import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface DataTableToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  searchPlaceholder?: string;
  action?: React.ReactNode;
  filters?: React.ReactNode;
}

export function DataTableToolbar({
  searchPlaceholder = "Search...",
  action,
  filters,
  className,
  ...props
}: DataTableToolbarProps) {
  return (
    <div className={cn("flex flex-col sm:flex-row items-center justify-between gap-4 py-4", className)} {...props}>
      <div className="flex flex-1 items-center space-x-2 w-full sm:max-w-sm">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder={searchPlaceholder}
            className="pl-8 bg-white h-9"
          />
        </div>
        {filters}
      </div>
      <div className="flex items-center space-x-2 shrink-0 w-full sm:w-auto justify-end">
        {action}
      </div>
    </div>
  );
}
