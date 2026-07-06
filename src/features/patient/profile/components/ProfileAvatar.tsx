import * as React from "react";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProfileAvatarProps {
  url?: string;
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function ProfileAvatar({ url, name, size = "lg", className }: ProfileAvatarProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const sizeClasses = {
    sm: "h-10 w-10 text-xs",
    md: "h-16 w-16 text-lg",
    lg: "h-24 w-24 text-2xl",
    xl: "h-32 w-32 text-4xl",
  };

  return (
    <div 
      className={cn(
        "relative flex shrink-0 items-center justify-center rounded-full overflow-hidden bg-primary/10 text-primary border-4 border-white shadow-sm",
        sizeClasses[size],
        className
      )}
    >
      {url ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img src={url} alt={name} className="h-full w-full object-cover" />
      ) : (
        <span className="font-semibold tracking-wider">{initials || <User className="h-1/2 w-1/2" />}</span>
      )}
    </div>
  );
}
