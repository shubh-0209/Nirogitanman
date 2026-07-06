import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function SearchBar({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("relative w-full max-w-sm hidden md:flex items-center text-muted-foreground", className)} {...props}>
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input 
        type="search" 
        placeholder="Search patients, appointments..." 
        className="pl-9 bg-background border-border h-9"
        readOnly
      />
    </div>
  );
}
