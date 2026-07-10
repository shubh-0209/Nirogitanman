import { Loader2 } from "lucide-react";

export default function DashboardLoading() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50/50">
      <div className="flex flex-col items-center gap-2 text-primary">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="text-sm font-medium">Loading...</p>
      </div>
    </div>
  );
}
