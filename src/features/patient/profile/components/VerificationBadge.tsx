import * as React from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle } from "lucide-react";

export function VerificationBadge({ isVerified, label }: { isVerified: boolean; label?: string }) {
  return (
    <div className={cn(
      "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium",
      isVerified ? "bg-success/10 text-success" : "bg-warning/10 text-warning-foreground"
    )}>
      {isVerified ? <CheckCircle2 className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
      {label || (isVerified ? "Verified" : "Unverified")}
    </div>
  );
}
