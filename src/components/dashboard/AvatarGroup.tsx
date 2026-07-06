import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface AvatarUser {
  id: string | number;
  name: string;
  image?: string;
}

interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  users: AvatarUser[];
  max?: number;
  size?: "sm" | "md" | "lg";
}

export function AvatarGroup({
  users,
  max = 3,
  size = "md",
  className,
  ...props
}: AvatarGroupProps) {
  const visibleUsers = users.slice(0, max);
  const remainingUsers = users.length - max;

  const sizeClasses = {
    sm: "h-6 w-6 text-[10px]",
    md: "h-8 w-8 text-xs",
    lg: "h-10 w-10 text-sm",
  };

  return (
    <div className={cn("flex items-center -space-x-2", className)} {...props}>
      {visibleUsers.map((user, idx) => (
        <Avatar 
          key={user.id} 
          className={cn(
            "border-2 border-white hover:z-10 transition-transform", 
            sizeClasses[size],
            `z-[${max - idx}]`
          )}
        >
          {user.image && <AvatarImage src={user.image} alt={user.name} />}
          <AvatarFallback className="bg-slate-100 text-slate-600 font-medium">
            {user.name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      ))}
      {remainingUsers > 0 && (
        <Avatar className={cn("border-2 border-white z-0", sizeClasses[size])}>
          <AvatarFallback className="bg-slate-50 text-slate-500 font-medium">
            +{remainingUsers}
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
