import { ShieldCheck } from "lucide-react";
import { Container } from "@/components/layout/Container";

export function AnnouncementBar() {
  return (
    <div className="w-full bg-slate-50 border-b border-border/40 py-2">
      <Container className="flex items-center justify-center space-x-4 text-xs font-medium text-slate-600">
        <div className="flex items-center space-x-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-primary" />
          <span>Privacy First</span>
        </div>
        <span className="text-slate-300">•</span>
        <div className="flex items-center space-x-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-primary" />
          <span>Secure by Design</span>
        </div>
        <span className="text-slate-300">•</span>
        <div className="flex items-center space-x-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-primary" />
          <span>End-to-End Encryption</span>
        </div>
      </Container>
    </div>
  );
}
