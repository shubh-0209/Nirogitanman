import * as React from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NotificationMenu() {
  return (
    <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground hidden sm:flex">
      <Bell className="h-5 w-5" />
      <span className="absolute top-1.5 right-2 h-2 w-2 rounded-full bg-error border-2 border-background" />
    </Button>
  );
}
