import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardAction } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DashboardCardProps extends React.ComponentProps<typeof Card> {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  contentClassName?: string;
  headerClassName?: string;
}

export function DashboardCard({
  title,
  description,
  action,
  children,
  className,
  contentClassName,
  headerClassName,
  ...props
}: DashboardCardProps) {
  return (
    <Card className={cn("h-full flex flex-col", className)} {...props}>
      {(title || description || action) && (
        <CardHeader className={cn("pb-4", headerClassName)}>
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              {title && <CardTitle className="text-lg">{title}</CardTitle>}
              {description && <CardDescription>{description}</CardDescription>}
            </div>
            {action && <CardAction>{action}</CardAction>}
          </div>
        </CardHeader>
      )}
      <CardContent className={cn("flex-1", contentClassName)}>
        {children}
      </CardContent>
    </Card>
  );
}
